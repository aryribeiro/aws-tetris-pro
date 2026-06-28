import { turso } from '@/lib/turso'
import { NextResponse } from 'next/server'

const MAX_RANKING = 20
const MAX_NAME_LENGTH = 30

export async function GET() {
  try {
    await turso.execute(`
      CREATE TABLE IF NOT EXISTS ranking (
        posicao   INTEGER PRIMARY KEY,
        nome      TEXT NOT NULL,
        pontuacao INTEGER NOT NULL
      )
    `)

    const result = await turso.execute(
      'SELECT posicao, nome, pontuacao FROM ranking ORDER BY posicao ASC'
    )

    const ranking = result.rows.map((row) => ({
      posicao: row.posicao as number,
      nome: row.nome as string,
      pontuacao: row.pontuacao as number,
    }))

    return NextResponse.json({ ranking })
  } catch (error) {
    console.error('GET /api/ranking error:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar ranking' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nome, pontuacao } = body as { nome: string; pontuacao: number }

    if (!nome || typeof nome !== 'string' || nome.trim().length === 0) {
      return NextResponse.json(
        { error: 'Nome inválido' },
        { status: 400 }
      )
    }

    if (typeof pontuacao !== 'number' || pontuacao < 0 || !Number.isInteger(pontuacao)) {
      return NextResponse.json(
        { error: 'Pontuação inválida' },
        { status: 400 }
      )
    }

    const sanitizedNome = nome.trim().slice(0, MAX_NAME_LENGTH)

    await turso.execute(`
      CREATE TABLE IF NOT EXISTS ranking (
        posicao   INTEGER PRIMARY KEY,
        nome      TEXT NOT NULL,
        pontuacao INTEGER NOT NULL
      )
    `)

    const current = await turso.execute(
      'SELECT nome, pontuacao FROM ranking ORDER BY pontuacao DESC'
    )

    const entries = current.rows.map((row) => ({
      nome: row.nome as string,
      pontuacao: row.pontuacao as number,
    }))

    if (entries.length >= MAX_RANKING) {
      const lowestScore = entries[entries.length - 1].pontuacao
      if (pontuacao <= lowestScore) {
        return NextResponse.json(
          { qualificou: false, mensagem: 'Pontuação não entrou no Top 20' },
          { status: 200 }
        )
      }
    }

    entries.push({ nome: sanitizedNome, pontuacao })
    entries.sort((a, b) => b.pontuacao - a.pontuacao)
    const finalEntries = entries.slice(0, MAX_RANKING)

    const posicaoFinal = finalEntries.findIndex(
      (e) => e.nome === sanitizedNome && e.pontuacao === pontuacao
    ) + 1

    const tx = await turso.transaction('write')
    try {
      await tx.execute('DELETE FROM ranking')
      for (let i = 0; i < finalEntries.length; i++) {
        await tx.execute({
          sql: 'INSERT INTO ranking (posicao, nome, pontuacao) VALUES (?, ?, ?)',
          args: [i + 1, finalEntries[i].nome, finalEntries[i].pontuacao],
        })
      }
      await tx.commit()
    } catch (txError) {
      await tx.rollback()
      throw txError
    }

    return NextResponse.json({
      qualificou: true,
      posicao: posicaoFinal,
    })
  } catch (error) {
    console.error('POST /api/ranking error:', error)
    return NextResponse.json(
      { error: 'Erro ao salvar pontuação' },
      { status: 500 }
    )
  }
}
