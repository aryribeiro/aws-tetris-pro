import servicos from '@/data/servicos.json'

export interface AwsService {
  comando: string
  descricao: string
  iconPath: string
  category: AwsCategory
}

export type AwsCategory =
  | 'Analytics'
  | 'App-Integration'
  | 'Artificial-Intelligence'
  | 'Blockchain'
  | 'Business-Applications'
  | 'Cloud-Financial-Management'
  | 'Compute'
  | 'Containers'
  | 'Customer-Enablement'
  | 'Database'
  | 'Developer-Tools'
  | 'End-User-Computing'
  | 'Front-End-Web-Mobile'
  | 'Games'
  | 'General-Icons'
  | 'Internet-of-Things'
  | 'Management-Governance'
  | 'Media-Services'
  | 'Migration-Modernization'
  | 'Networking-Content-Delivery'
  | 'Quantum-Technologies'
  | 'Satellite'
  | 'Security-Identity-Compliance'
  | 'Storage'

export const CATEGORY_COLORS: Record<AwsCategory, string> = {
  'Analytics': '#8C4FFF',
  'App-Integration': '#E7157B',
  'Artificial-Intelligence': '#01A88D',
  'Blockchain': '#D86613',
  'Business-Applications': '#C7131F',
  'Cloud-Financial-Management': '#277116',
  'Compute': '#ED7100',
  'Containers': '#ED7100',
  'Customer-Enablement': '#5A30B5',
  'Database': '#527FFF',
  'Developer-Tools': '#437ABA',
  'End-User-Computing': '#01A88D',
  'Front-End-Web-Mobile': '#C7131F',
  'Games': '#8C4FFF',
  'General-Icons': '#232F3E',
  'Internet-of-Things': '#1B660F',
  'Management-Governance': '#E7157B',
  'Media-Services': '#D86613',
  'Migration-Modernization': '#1B660F',
  'Networking-Content-Delivery': '#8C4FFF',
  'Quantum-Technologies': '#ED7100',
  'Satellite': '#1A3C6E',
  'Security-Identity-Compliance': '#DD344C',
  'Storage': '#277116',
}

const MANUAL_OVERRIDES: Record<string, { icon: string; category: AwsCategory }> = {
  'S3 Glacier': { icon: 'Arch_Amazon-Simple-Storage-Service-Glacier_48.png', category: 'Storage' },
  'Aurora and RDS': { icon: 'Arch_Amazon-RDS_48.png', category: 'Database' },
  'Aurora DSQL': { icon: 'Arch_Amazon-Aurora_48.png', category: 'Database' },
  'Oracle Database@AWS': { icon: 'Arch_Oracle-Database-at-AWS_48.png', category: 'Database' },
  'AWS Snow Family': { icon: 'Arch_AWS-Snowball-Edge_48.png', category: 'Storage' },
  'Terminal de Transferência de Dados da AWS': { icon: 'Arch_AWS-Data-Transfer-Terminal_48.png', category: 'Migration-Modernization' },
  'Amazon Route 53 Global Resolver': { icon: 'Arch_Amazon-Route-53_48.png', category: 'Networking-Content-Delivery' },
  'RTB Fabric': { icon: 'Arch_Amazon-Virtual-Private-Cloud_48.png', category: 'Networking-Content-Delivery' },
  'AWS FIS': { icon: 'Arch_AWS-Fault-Injection-Service_48.png', category: 'Developer-Tools' },
  'AWS DevOps Agent': { icon: 'Arch_Amazon-DevOps-Guru_48.png', category: 'Artificial-Intelligence' },
  'Amazon Q Developer': { icon: 'Arch_Amazon-Q_48.png', category: 'Artificial-Intelligence' },
  'Kiro': { icon: 'Arch_Amazon-Q_48.png', category: 'Developer-Tools' },
  'Activate for Startups': { icon: 'Arch_AWS-Activate_48.png', category: 'Customer-Enablement' },
  'AWS re:Post Private': { icon: 'Arch_AWS-rePost-Private_48.png', category: 'Customer-Enablement' },
  'Amazon Q Developer in chat applications': { icon: 'Arch_Amazon-Q_48.png', category: 'Artificial-Intelligence' },
  'Resource Groups & Tag Editor': { icon: 'Arch_AWS-Resource-Explorer_48.png', category: 'Management-Governance' },
  'Incident Manager': { icon: 'Arch_AWS-Systems-Manager_48.png', category: 'Management-Governance' },
  'AWS para SAP': { icon: 'Arch_AWS-Backint-Agent_48.png', category: 'Management-Governance' },
  'AWS Sustainability': { icon: 'Arch_AWS-Well-Architected-Tool_48.png', category: 'Management-Governance' },
  'AWS Partner Central': { icon: 'Arch_AWS-Marketplace_Light_48.png', category: 'General-Icons' },
  'Service Quotas': { icon: 'Arch_AWS-Service-Catalog_48.png', category: 'Management-Governance' },
  'Elemental Inference': { icon: 'Arch_AWS-Elemental-Appliances-&-Software_48.png', category: 'Media-Services' },
  'Amazon Q Business': { icon: 'Arch_Amazon-Q_48.png', category: 'Artificial-Intelligence' },
  'Amazon Nova Act': { icon: 'Arch_Amazon-Nova_48.png', category: 'Artificial-Intelligence' },
  'Amazon Bedrock AgentCore': { icon: 'Arch_Amazon-Bedrock_48.png', category: 'Artificial-Intelligence' },
  'Amazon Bio Discovery': { icon: 'Arch_Amazon-Bedrock_48.png', category: 'Artificial-Intelligence' },
  'MSK': { icon: 'Arch_Amazon-Managed-Streaming-for-Apache-Kafka_48.png', category: 'Analytics' },
  'Managed Apache Flink': { icon: 'Arch_Amazon-Managed-Service-for-Apache-Flink_48.png', category: 'Analytics' },
  'AWS Security Agent': { icon: 'Arch_AWS-Security-Hub_48.png', category: 'Security-Identity-Compliance' },
  'Security Hub CSPM': { icon: 'Arch_AWS-Security-Hub_48.png', category: 'Security-Identity-Compliance' },
  'WAF & Shield': { icon: 'Arch_AWS-WAF_48.png', category: 'Security-Identity-Compliance' },
  'Gerenciamento de cobrança e custos': { icon: 'Arch_AWS-Cost-Explorer_48.png', category: 'Cloud-Financial-Management' },
  'SWF': { icon: 'Arch_AWS-Step-Functions_48.png', category: 'App-Integration' },
  'Apache Airflow gerenciado': { icon: 'Arch_Amazon-Managed-Workflows-for-Apache-Airflow_48.png', category: 'App-Integration' },
  'Amazon Connect Health': { icon: 'Arch_Amazon-Connect_48.png', category: 'Business-Applications' },
  'WorkSpaces Applications': { icon: 'Arch_Amazon-WorkSpaces-Family_48.png', category: 'End-User-Computing' },
  'WorkSpaces Thin Client': { icon: 'Arch_Amazon-WorkSpaces-Family_48.png', category: 'End-User-Computing' },
  'WorkSpaces Secure Browser': { icon: 'Arch_Amazon-WorkSpaces-Family_48.png', category: 'End-User-Computing' },
  'AWS Global View': { icon: 'Arch_AWS-Management-Console_48.png', category: 'Management-Governance' },
  'Recycle Bin': { icon: 'Arch_Amazon-Simple-Storage-Service_48.png', category: 'Storage' },
}

interface IconEntry {
  file: string
  category: AwsCategory
}

const ICON_FILES: IconEntry[] = [
  { file: 'Arch_Amazon-Athena_48.png', category: 'Analytics' },
  { file: 'Arch_Amazon-CloudSearch_48.png', category: 'Analytics' },
  { file: 'Arch_Amazon-Data-Firehose_48.png', category: 'Analytics' },
  { file: 'Arch_Amazon-DataZone_48.png', category: 'Analytics' },
  { file: 'Arch_Amazon-EMR_48.png', category: 'Analytics' },
  { file: 'Arch_Amazon-FinSpace_48.png', category: 'Analytics' },
  { file: 'Arch_Amazon-Kinesis-Data-Streams_48.png', category: 'Analytics' },
  { file: 'Arch_Amazon-Kinesis-Video-Streams_48.png', category: 'Analytics' },
  { file: 'Arch_Amazon-Kinesis_48.png', category: 'Analytics' },
  { file: 'Arch_Amazon-Managed-Service-for-Apache-Flink_48.png', category: 'Analytics' },
  { file: 'Arch_Amazon-Managed-Streaming-for-Apache-Kafka_48.png', category: 'Analytics' },
  { file: 'Arch_Amazon-OpenSearch-Service_48.png', category: 'Analytics' },
  { file: 'Arch_Amazon-QuickSight_48.png', category: 'Analytics' },
  { file: 'Arch_Amazon-Redshift_48.png', category: 'Analytics' },
  { file: 'Arch_Amazon-SageMaker_48.png', category: 'Analytics' },
  { file: 'Arch_AWS-Clean-Rooms_48.png', category: 'Analytics' },
  { file: 'Arch_AWS-Data-Exchange_48.png', category: 'Analytics' },
  { file: 'Arch_AWS-Entity-Resolution_48.png', category: 'Analytics' },
  { file: 'Arch_AWS-Glue-DataBrew_48.png', category: 'Analytics' },
  { file: 'Arch_AWS-Glue_48.png', category: 'Analytics' },
  { file: 'Arch_AWS-Lake-Formation_48.png', category: 'Analytics' },
  { file: 'Arch_Amazon-AppFlow_48.png', category: 'App-Integration' },
  { file: 'Arch_Amazon-EventBridge_48.png', category: 'App-Integration' },
  { file: 'Arch_Amazon-Managed-Workflows-for-Apache-Airflow_48.png', category: 'App-Integration' },
  { file: 'Arch_Amazon-MQ_48.png', category: 'App-Integration' },
  { file: 'Arch_Amazon-Simple-Notification-Service_48.png', category: 'App-Integration' },
  { file: 'Arch_Amazon-Simple-Queue-Service_48.png', category: 'App-Integration' },
  { file: 'Arch_AWS-AppSync_48.png', category: 'App-Integration' },
  { file: 'Arch_AWS-B2B-Data-Interchange_48.png', category: 'App-Integration' },
  { file: 'Arch_AWS-Express-Workflows_48.png', category: 'App-Integration' },
  { file: 'Arch_AWS-Step-Functions_48.png', category: 'App-Integration' },
  { file: 'Arch_Amazon-Augmented-AI-A2I_48.png', category: 'Artificial-Intelligence' },
  { file: 'Arch_Amazon-Bedrock_48.png', category: 'Artificial-Intelligence' },
  { file: 'Arch_Amazon-CodeGuru_48.png', category: 'Artificial-Intelligence' },
  { file: 'Arch_Amazon-Comprehend-Medical_48.png', category: 'Artificial-Intelligence' },
  { file: 'Arch_Amazon-Comprehend_48.png', category: 'Artificial-Intelligence' },
  { file: 'Arch_Amazon-DevOps-Guru_48.png', category: 'Artificial-Intelligence' },
  { file: 'Arch_Amazon-Forecast_48.png', category: 'Artificial-Intelligence' },
  { file: 'Arch_Amazon-Fraud-Detector_48.png', category: 'Artificial-Intelligence' },
  { file: 'Arch_Amazon-Kendra_48.png', category: 'Artificial-Intelligence' },
  { file: 'Arch_Amazon-Lex_48.png', category: 'Artificial-Intelligence' },
  { file: 'Arch_Amazon-Lookout-for-Equipment_48.png', category: 'Artificial-Intelligence' },
  { file: 'Arch_Amazon-Monitron_48.png', category: 'Artificial-Intelligence' },
  { file: 'Arch_Amazon-Nova_48.png', category: 'Artificial-Intelligence' },
  { file: 'Arch_Amazon-Personalize_48.png', category: 'Artificial-Intelligence' },
  { file: 'Arch_Amazon-Polly_48.png', category: 'Artificial-Intelligence' },
  { file: 'Arch_Amazon-Q_48.png', category: 'Artificial-Intelligence' },
  { file: 'Arch_Amazon-Rekognition_48.png', category: 'Artificial-Intelligence' },
  { file: 'Arch_Amazon-SageMaker-AI_48.png', category: 'Artificial-Intelligence' },
  { file: 'Arch_Amazon-Textract_48.png', category: 'Artificial-Intelligence' },
  { file: 'Arch_Amazon-Transcribe_48.png', category: 'Artificial-Intelligence' },
  { file: 'Arch_Amazon-Translate_48.png', category: 'Artificial-Intelligence' },
  { file: 'Arch_AWS-App-Studio_48.png', category: 'Artificial-Intelligence' },
  { file: 'Arch_AWS-HealthImaging_48.png', category: 'Artificial-Intelligence' },
  { file: 'Arch_AWS-HealthLake_48.png', category: 'Artificial-Intelligence' },
  { file: 'Arch_AWS-HealthOmics_48.png', category: 'Artificial-Intelligence' },
  { file: 'Arch_AWS-Panorama_48.png', category: 'Artificial-Intelligence' },
  { file: 'Arch_Amazon-Managed-Blockchain_48.png', category: 'Blockchain' },
  { file: 'Arch_Amazon-Chime-SDK_48.png', category: 'Business-Applications' },
  { file: 'Arch_Amazon-Chime_48.png', category: 'Business-Applications' },
  { file: 'Arch_Amazon-Connect_48.png', category: 'Business-Applications' },
  { file: 'Arch_Amazon-Pinpoint_48.png', category: 'Business-Applications' },
  { file: 'Arch_Amazon-Simple-Email-Service_48.png', category: 'Business-Applications' },
  { file: 'Arch_Amazon-WorkDocs_48.png', category: 'Business-Applications' },
  { file: 'Arch_Amazon-WorkMail_48.png', category: 'Business-Applications' },
  { file: 'Arch_AWS-AppFabric_48.png', category: 'Business-Applications' },
  { file: 'Arch_AWS-End-User-Messaging_48.png', category: 'Business-Applications' },
  { file: 'Arch_AWS-Supply-Chain_48.png', category: 'Business-Applications' },
  { file: 'Arch_AWS-Wickr_48.png', category: 'Business-Applications' },
  { file: 'Arch_AWS-Billing-Conductor_48.png', category: 'Cloud-Financial-Management' },
  { file: 'Arch_AWS-Budgets_48.png', category: 'Cloud-Financial-Management' },
  { file: 'Arch_AWS-Cost-and-Usage-Report_48.png', category: 'Cloud-Financial-Management' },
  { file: 'Arch_AWS-Cost-Explorer_48.png', category: 'Cloud-Financial-Management' },
  { file: 'Arch_Amazon-EC2-Image-Builder_48.png', category: 'Compute' },
  { file: 'Arch_Amazon-EC2_48.png', category: 'Compute' },
  { file: 'Arch_Amazon-Elastic-VMware-Service_48.png', category: 'Compute' },
  { file: 'Arch_Amazon-Lightsail_48.png', category: 'Compute' },
  { file: 'Arch_AWS-App-Runner_48.png', category: 'Compute' },
  { file: 'Arch_AWS-Batch_48.png', category: 'Compute' },
  { file: 'Arch_AWS-Elastic-Beanstalk_48.png', category: 'Compute' },
  { file: 'Arch_AWS-Lambda_48.png', category: 'Compute' },
  { file: 'Arch_AWS-Outposts-family_48.png', category: 'Compute' },
  { file: 'Arch_AWS-Parallel-Computing-Service_48.png', category: 'Compute' },
  { file: 'Arch_AWS-Serverless-Application-Repository_48.png', category: 'Compute' },
  { file: 'Arch_Amazon-Elastic-Container-Registry_48.png', category: 'Containers' },
  { file: 'Arch_Amazon-Elastic-Container-Service_48.png', category: 'Containers' },
  { file: 'Arch_Amazon-Elastic-Kubernetes-Service_48.png', category: 'Containers' },
  { file: 'Arch_Red-Hat-OpenShift-Service-on-AWS_48.png', category: 'Containers' },
  { file: 'Arch_AWS-Activate_48.png', category: 'Customer-Enablement' },
  { file: 'Arch_AWS-IQ_48.png', category: 'Customer-Enablement' },
  { file: 'Arch_AWS-Managed-Services_48.png', category: 'Customer-Enablement' },
  { file: 'Arch_AWS-rePost-Private_48.png', category: 'Customer-Enablement' },
  { file: 'Arch_AWS-rePost_48.png', category: 'Customer-Enablement' },
  { file: 'Arch_AWS-Support_48.png', category: 'Customer-Enablement' },
  { file: 'Arch_Amazon-Aurora_48.png', category: 'Database' },
  { file: 'Arch_Amazon-DocumentDB_48.png', category: 'Database' },
  { file: 'Arch_Amazon-DynamoDB_48.png', category: 'Database' },
  { file: 'Arch_Amazon-ElastiCache_48.png', category: 'Database' },
  { file: 'Arch_Amazon-Keyspaces_48.png', category: 'Database' },
  { file: 'Arch_Amazon-MemoryDB_48.png', category: 'Database' },
  { file: 'Arch_Amazon-Neptune_48.png', category: 'Database' },
  { file: 'Arch_Amazon-RDS_48.png', category: 'Database' },
  { file: 'Arch_Amazon-Timestream_48.png', category: 'Database' },
  { file: 'Arch_AWS-Database-Migration-Service_48.png', category: 'Database' },
  { file: 'Arch_Oracle-Database-at-AWS_48.png', category: 'Database' },
  { file: 'Arch_Amazon-CodeCatalyst_48.png', category: 'Developer-Tools' },
  { file: 'Arch_AWS-Cloud9_48.png', category: 'Developer-Tools' },
  { file: 'Arch_AWS-CloudShell_48.png', category: 'Developer-Tools' },
  { file: 'Arch_AWS-CodeArtifact_48.png', category: 'Developer-Tools' },
  { file: 'Arch_AWS-CodeBuild_48.png', category: 'Developer-Tools' },
  { file: 'Arch_AWS-CodeCommit_48.png', category: 'Developer-Tools' },
  { file: 'Arch_AWS-CodeDeploy_48.png', category: 'Developer-Tools' },
  { file: 'Arch_AWS-CodePipeline_48.png', category: 'Developer-Tools' },
  { file: 'Arch_AWS-Fault-Injection-Service_48.png', category: 'Developer-Tools' },
  { file: 'Arch_AWS-Infrastructure-Composer_48.png', category: 'Developer-Tools' },
  { file: 'Arch_AWS-X-Ray_48.png', category: 'Developer-Tools' },
  { file: 'Arch_Amazon-WorkSpaces-Family_48.png', category: 'End-User-Computing' },
  { file: 'Arch_Amazon-Location-Service_48.png', category: 'Front-End-Web-Mobile' },
  { file: 'Arch_AWS-Amplify_48.png', category: 'Front-End-Web-Mobile' },
  { file: 'Arch_AWS-Device-Farm_48.png', category: 'Front-End-Web-Mobile' },
  { file: 'Arch_Amazon-GameLift-Servers_48.png', category: 'Games' },
  { file: 'Arch_Amazon-GameLift-Streams_48.png', category: 'Games' },
  { file: 'Arch_AWS-Marketplace_Light_48.png', category: 'General-Icons' },
  { file: 'Arch_AWS-IoT-Core_48.png', category: 'Internet-of-Things' },
  { file: 'Arch_AWS-IoT-Device-Defender_48.png', category: 'Internet-of-Things' },
  { file: 'Arch_AWS-IoT-Device-Management_48.png', category: 'Internet-of-Things' },
  { file: 'Arch_AWS-IoT-Events_48.png', category: 'Internet-of-Things' },
  { file: 'Arch_AWS-IoT-FleetWise_48.png', category: 'Internet-of-Things' },
  { file: 'Arch_AWS-IoT-Greengrass_48.png', category: 'Internet-of-Things' },
  { file: 'Arch_AWS-IoT-SiteWise_48.png', category: 'Internet-of-Things' },
  { file: 'Arch_AWS-IoT-TwinMaker_48.png', category: 'Internet-of-Things' },
  { file: 'Arch_Amazon-CloudWatch_48.png', category: 'Management-Governance' },
  { file: 'Arch_Amazon-Managed-Grafana_48.png', category: 'Management-Governance' },
  { file: 'Arch_Amazon-Managed-Service-for-Prometheus_48.png', category: 'Management-Governance' },
  { file: 'Arch_AWS-AppConfig_48.png', category: 'Management-Governance' },
  { file: 'Arch_AWS-Auto-Scaling_48.png', category: 'Management-Governance' },
  { file: 'Arch_AWS-Backint-Agent_48.png', category: 'Management-Governance' },
  { file: 'Arch_AWS-CloudFormation_48.png', category: 'Management-Governance' },
  { file: 'Arch_AWS-CloudTrail_48.png', category: 'Management-Governance' },
  { file: 'Arch_AWS-Compute-Optimizer_48.png', category: 'Management-Governance' },
  { file: 'Arch_AWS-Config_48.png', category: 'Management-Governance' },
  { file: 'Arch_AWS-Control-Tower_48.png', category: 'Management-Governance' },
  { file: 'Arch_AWS-Health-Dashboard_48.png', category: 'Management-Governance' },
  { file: 'Arch_AWS-Launch-Wizard_48.png', category: 'Management-Governance' },
  { file: 'Arch_AWS-License-Manager_48.png', category: 'Management-Governance' },
  { file: 'Arch_AWS-Management-Console_48.png', category: 'Management-Governance' },
  { file: 'Arch_AWS-Organizations_48.png', category: 'Management-Governance' },
  { file: 'Arch_AWS-Proton_48.png', category: 'Management-Governance' },
  { file: 'Arch_AWS-Resilience-Hub_48.png', category: 'Management-Governance' },
  { file: 'Arch_AWS-Resource-Explorer_48.png', category: 'Management-Governance' },
  { file: 'Arch_AWS-Service-Catalog_48.png', category: 'Management-Governance' },
  { file: 'Arch_AWS-Systems-Manager_48.png', category: 'Management-Governance' },
  { file: 'Arch_AWS-Telco-Network-Builder_48.png', category: 'Management-Governance' },
  { file: 'Arch_AWS-Trusted-Advisor_48.png', category: 'Management-Governance' },
  { file: 'Arch_AWS-User-Notifications_48.png', category: 'Management-Governance' },
  { file: 'Arch_AWS-Well-Architected-Tool_48.png', category: 'Management-Governance' },
  { file: 'Arch_Amazon-Interactive-Video-Service_48.png', category: 'Media-Services' },
  { file: 'Arch_Amazon-Kinesis-Video-Streams_48.png', category: 'Media-Services' },
  { file: 'Arch_AWS-Deadline-Cloud_48.png', category: 'Media-Services' },
  { file: 'Arch_AWS-Elemental-Appliances-&-Software_48.png', category: 'Media-Services' },
  { file: 'Arch_AWS-Elemental-MediaConnect_48.png', category: 'Media-Services' },
  { file: 'Arch_AWS-Elemental-MediaConvert_48.png', category: 'Media-Services' },
  { file: 'Arch_AWS-Elemental-MediaLive_48.png', category: 'Media-Services' },
  { file: 'Arch_AWS-Elemental-MediaPackage_48.png', category: 'Media-Services' },
  { file: 'Arch_AWS-Elemental-MediaStore_48.png', category: 'Media-Services' },
  { file: 'Arch_AWS-Elemental-MediaTailor_48.png', category: 'Media-Services' },
  { file: 'Arch_AWS-Application-Discovery-Service_48.png', category: 'Migration-Modernization' },
  { file: 'Arch_AWS-Application-Migration-Service_48.png', category: 'Migration-Modernization' },
  { file: 'Arch_AWS-Data-Transfer-Terminal_48.png', category: 'Migration-Modernization' },
  { file: 'Arch_AWS-DataSync_48.png', category: 'Migration-Modernization' },
  { file: 'Arch_AWS-Mainframe-Modernization_48.png', category: 'Migration-Modernization' },
  { file: 'Arch_AWS-Migration-Hub_48.png', category: 'Migration-Modernization' },
  { file: 'Arch_AWS-Transfer-Family_48.png', category: 'Migration-Modernization' },
  { file: 'Arch_AWS-Transform_48.png', category: 'Migration-Modernization' },
  { file: 'Arch_Amazon-API-Gateway_48.png', category: 'Networking-Content-Delivery' },
  { file: 'Arch_Amazon-Application-Recovery-Controller_48.png', category: 'Networking-Content-Delivery' },
  { file: 'Arch_Amazon-CloudFront_48.png', category: 'Networking-Content-Delivery' },
  { file: 'Arch_Amazon-Route-53_48.png', category: 'Networking-Content-Delivery' },
  { file: 'Arch_Amazon-Virtual-Private-Cloud_48.png', category: 'Networking-Content-Delivery' },
  { file: 'Arch_AWS-App-Mesh_48.png', category: 'Networking-Content-Delivery' },
  { file: 'Arch_AWS-Cloud-Map_48.png', category: 'Networking-Content-Delivery' },
  { file: 'Arch_AWS-Direct-Connect_48.png', category: 'Networking-Content-Delivery' },
  { file: 'Arch_AWS-Global-Accelerator_48.png', category: 'Networking-Content-Delivery' },
  { file: 'Arch_Amazon-Braket_48.png', category: 'Quantum-Technologies' },
  { file: 'Arch_AWS-Ground-Station_48.png', category: 'Satellite' },
  { file: 'Arch_Amazon-Cognito_48.png', category: 'Security-Identity-Compliance' },
  { file: 'Arch_Amazon-Detective_48.png', category: 'Security-Identity-Compliance' },
  { file: 'Arch_Amazon-GuardDuty_48.png', category: 'Security-Identity-Compliance' },
  { file: 'Arch_Amazon-Inspector_48.png', category: 'Security-Identity-Compliance' },
  { file: 'Arch_Amazon-Macie_48.png', category: 'Security-Identity-Compliance' },
  { file: 'Arch_Amazon-Security-Lake_48.png', category: 'Security-Identity-Compliance' },
  { file: 'Arch_Amazon-Verified-Permissions_48.png', category: 'Security-Identity-Compliance' },
  { file: 'Arch_AWS-Artifact_48.png', category: 'Security-Identity-Compliance' },
  { file: 'Arch_AWS-Audit-Manager_48.png', category: 'Security-Identity-Compliance' },
  { file: 'Arch_AWS-Certificate-Manager_48.png', category: 'Security-Identity-Compliance' },
  { file: 'Arch_AWS-CloudHSM_48.png', category: 'Security-Identity-Compliance' },
  { file: 'Arch_AWS-Directory-Service_48.png', category: 'Security-Identity-Compliance' },
  { file: 'Arch_AWS-Firewall-Manager_48.png', category: 'Security-Identity-Compliance' },
  { file: 'Arch_AWS-IAM-Identity-Center_48.png', category: 'Security-Identity-Compliance' },
  { file: 'Arch_AWS-Identity-and-Access-Management_48.png', category: 'Security-Identity-Compliance' },
  { file: 'Arch_AWS-Key-Management-Service_48.png', category: 'Security-Identity-Compliance' },
  { file: 'Arch_AWS-Payment-Cryptography_48.png', category: 'Security-Identity-Compliance' },
  { file: 'Arch_AWS-Private-Certificate-Authority_48.png', category: 'Security-Identity-Compliance' },
  { file: 'Arch_AWS-Resource-Access-Manager_48.png', category: 'Security-Identity-Compliance' },
  { file: 'Arch_AWS-Secrets-Manager_48.png', category: 'Security-Identity-Compliance' },
  { file: 'Arch_AWS-Security-Hub_48.png', category: 'Security-Identity-Compliance' },
  { file: 'Arch_AWS-Security-Incident-Response_48.png', category: 'Security-Identity-Compliance' },
  { file: 'Arch_AWS-Signer_48.png', category: 'Security-Identity-Compliance' },
  { file: 'Arch_AWS-WAF_48.png', category: 'Security-Identity-Compliance' },
  { file: 'Arch_Amazon-EFS_48.png', category: 'Storage' },
  { file: 'Arch_Amazon-FSx_48.png', category: 'Storage' },
  { file: 'Arch_Amazon-Simple-Storage-Service-Glacier_48.png', category: 'Storage' },
  { file: 'Arch_Amazon-Simple-Storage-Service_48.png', category: 'Storage' },
  { file: 'Arch_AWS-Backup_48.png', category: 'Storage' },
  { file: 'Arch_AWS-Elastic-Disaster-Recovery_48.png', category: 'Storage' },
  { file: 'Arch_AWS-Snowball-Edge_48.png', category: 'Storage' },
  { file: 'Arch_AWS-Storage-Gateway_48.png', category: 'Storage' },
]

function buildIconPath(category: AwsCategory, filename: string): string {
  return `/icons/Architecture-Service-Icons_07312025/Arch_${category}/48/${filename}`
}

function buildIconIndex(): Map<string, IconEntry> {
  const index = new Map<string, IconEntry>()
  for (const entry of ICON_FILES) {
    const slug = entry.file
      .replace('Arch_', '')
      .replace('_48.png', '')
      .toLowerCase()
    index.set(slug, entry)
  }
  return index
}

function serviceNameToSlug(name: string): string {
  return name.replace(/\s+/g, '-').toLowerCase()
}

function stripPrefix(name: string): string {
  return name.replace(/^(Amazon|AWS)\s+/i, '').replace(/\s+/g, '-').toLowerCase()
}

function findIconForService(
  name: string,
  index: Map<string, IconEntry>
): IconEntry | null {
  const strategies = [
    serviceNameToSlug(name),
    'aws-' + stripPrefix(name),
    'amazon-' + stripPrefix(name),
    stripPrefix(name),
  ]

  for (const slug of strategies) {
    const match = index.get(slug)
    if (match) return match
  }

  const baseSlug = stripPrefix(name)
  for (const [iconSlug, data] of index) {
    if (iconSlug.includes(baseSlug) || baseSlug.includes(iconSlug)) {
      return data
    }
  }

  return null
}

const FALLBACK_ICON = '/icons/Architecture-Service-Icons_07312025/Arch_General-Icons/48/Arch_AWS-Marketplace_Light_48.png'

let cachedManifest: AwsService[] | null = null

export function getAwsManifest(): AwsService[] {
  if (cachedManifest) return cachedManifest

  const index = buildIconIndex()
  const manifest: AwsService[] = []

  for (const svc of servicos) {
    const override = MANUAL_OVERRIDES[svc.comando]
    if (override) {
      manifest.push({
        comando: svc.comando,
        descricao: svc.descricao,
        iconPath: buildIconPath(override.category, override.icon),
        category: override.category,
      })
      continue
    }

    const match = findIconForService(svc.comando, index)
    if (match) {
      manifest.push({
        comando: svc.comando,
        descricao: svc.descricao,
        iconPath: buildIconPath(match.category, match.file),
        category: match.category,
      })
    } else {
      manifest.push({
        comando: svc.comando,
        descricao: svc.descricao,
        iconPath: FALLBACK_ICON,
        category: 'General-Icons',
      })
    }
  }

  cachedManifest = manifest
  return manifest
}
