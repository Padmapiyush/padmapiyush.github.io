export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  highlights: string[];
  skills: string[];
  link?: string;
  github?: string;
  architectureBadge?: string;
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  location: string;
  isCurrent?: boolean;
  responsibilities: string[];
  skills: string[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Education {
  degree: string;
  year: string;
  institution: string;
  location: string;
  link?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  focus: string;
}

export const PORTFOLIO_DATA = {
  about: {
    name: "Padmapiyush Pathak",
    preferredName: "Padmapiyush",
    initials: "PP",
    role: "Data Engineering Analyst",
    currentCompany: "IDEMIA Public Security",
    location: "Noida, India",
    intro:
      "Data Engineering Analyst building robust lakehouse pipelines, cloud automation, and analytics-ready datasets.",
    elevator:
      "Specializing in Bronze-Silver-Gold Lakehouse architectures, real-time stream ingestion, and cost-optimized compute across Azure Data Factory, Databricks (PySpark), and Delta Lake.",
    bio: [
      "I am a Data Engineering Analyst focused on turning complex, high-velocity raw data into production-ready analytical products. Currently at IDEMIA Public Security, I architect, provision, and optimize ETL/ELT pipelines, secure cloud infrastructure, and analytics-ready data marts for mission-critical operations.",
      "My core technical strengths center on pipeline orchestration, robust data modeling, automated data quality enforcement, and performance tuning across modern cloud data platforms. I thrive at the intersection of systems engineering and business intelligence—bridging raw telemetry with actionable insights.",
      "I'm passionate about scalable cloud infrastructure, declarative infrastructure (Terraform), CI/CD automation, and solving demanding analytical challenges with SQL, Python, PySpark, and Azure services."
    ],
  },
  contact: {
    email: "thepadmapiyush@gmail.com",
    mobile: "+91 9532683568",
    github: "https://github.com/padmapiyush",
    linkedin: "https://www.linkedin.com/in/padmapiyush/",
    linkedinPosts: "https://www.linkedin.com/in/padmapiyush/recent-activity/posts/",
    resume: "https://drive.google.com/file/d/14bikRoLOfn6R8Vr2n1auxisV51F_8HB6/view?usp=sharing",
  },
  experiences: [
    {
      company: "IDEMIA Public Security",
      position: "Data Engineering Analyst",
      duration: "August 2025 - Present",
      location: "Noida, India",
      isCurrent: true,
      responsibilities: [
        "Architect and maintain high-throughput production ETL/ELT pipelines leveraging Azure Data Factory and Azure Databricks (PySpark).",
        "Provision and harden secure enterprise Azure infrastructure, including ADLS Gen2 Storage, Key Vault secrets management, Managed Identities, and virtual network security.",
        "Dramatically improve pipeline runtime and compute efficiency through optimized PySpark transformations, partition pruning, and SQL query tuning.",
        "Automate multi-environment deployments and data infrastructure provisioning using Terraform and GitHub Actions CI/CD workflows.",
        "Implement rigorous data quality checks, schema evolution validations, and error-handling mechanisms across distributed data pipelines."
      ],
      skills: [
        "Azure Data Factory",
        "Azure Databricks",
        "PySpark",
        "SQL",
        "Delta Lake",
        "Terraform",
        "GitHub Actions",
        "Azure Key Vault",
        "ADLS Gen2",
        "CI/CD"
      ],
    },
    {
      company: "IDEMIA",
      position: "Data Analyst",
      duration: "June 2025 - August 2025",
      location: "Noida, India",
      isCurrent: false,
      responsibilities: [
        "Delivered interactive, multi-dimensional executive dashboards in Power BI and Tableau for real-time operational decision-making.",
        "Conducted in-depth analytical evaluations using SQL and Python to automate recurring manual reporting, slashing turnaround times.",
        "Collaborated cross-functionally with operations and product stakeholders to formulate measurable KPIs and data health metrics.",
        "Engineered reliable automated SQL data extracts and scheduled data refresh pipelines to ensure data fidelity."
      ],
      skills: [
        "Power BI",
        "Tableau",
        "SQL",
        "Python",
        "Advanced Excel",
        "KPI Architecture",
        "Reporting Automation",
        "Data Storytelling"
      ],
    },
    {
      company: "IDEMIA",
      position: "Analyst Trainee / Data Analyst Apprentice",
      duration: "January 2024 - May 2025",
      location: "Noida, India",
      isCurrent: false,
      responsibilities: [
        "Supported enterprise data analytics initiatives, data hygiene routines, and exploratory data analysis across large-scale transactional datasets.",
        "Streamlined data preparation workflows and automated repetitive spreadsheet reporting using Python scripts and SQL queries.",
        "Drafted functional reports and presentations synthesizing analytical findings for engineering and operational leadership."
      ],
      skills: [
        "Data Preparation",
        "SQL",
        "Python",
        "Excel",
        "Data Cleansing",
        "Exploratory Data Analysis",
        "Process Automation"
      ],
    },
  ] as Experience[],
  projects: [
    {
      id: "azure-lakehouse",
      name: "Azure Medallion Lakehouse Pipeline",
      tagline: "End-to-End Bronze-Silver-Gold Lakehouse on Azure with Automated Orchestration",
      description:
        "Designed and implemented an enterprise-grade Bronze-Silver-Gold lakehouse architecture on Microsoft Azure using ADF, Databricks (PySpark), and Delta tables.",
      problem:
        "Legacy transactional data was siloed across multiple disparate storage targets, with schema drift causing downstream dashboard failures and unoptimized compute clusters driving high cloud costs.",
      solution:
        "Engineered a resilient Medallion lakehouse pattern: raw landing in Bronze, cleansed and conformally modeled in Silver, and aggregated into business-ready dimensional models in Gold with Delta ACID reliability.",
      highlights: [
        "Constructed end-to-end data pipelines in Azure Data Factory with automated dynamic triggers, parameterized datasets, and error notifications.",
        "Authored modular PySpark transformation jobs on Databricks with automated schema enforcement, data quality validation, and partition optimizations.",
        "Secured cloud resources with Azure Key Vault secrets integration and automated infrastructure provisioning using Terraform."
      ],
      skills: [
        "Azure Data Factory",
        "Azure Databricks",
        "PySpark",
        "Delta Lake",
        "SQL",
        "ADLS Gen2",
        "Terraform",
        "Data Quality"
      ],
      github: "https://github.com/Padmapiyush/azure-medallion-lakehouse-pipeline",
      link: "https://github.com/Padmapiyush/azure-medallion-lakehouse-pipeline",
      architectureBadge: "Medallion Lakehouse Architecture",
    },
    {
      id: "orders-streaming",
      name: "Real-Time Orders Streaming Platform",
      tagline: "Distributed Event Ingestion & Sliding-Window Analytics Platform",
      description:
        "Engineered a real-time event streaming pipeline that ingests live order events, computes sliding-window aggregations, and surfaces operational metrics.",
      problem:
        "E-commerce operations lacked near-real-time visibility into order surges, payment failure anomalies, and inventory bottlenecks due to batch latency.",
      solution:
        "Streamed simulated event payloads via Apache Kafka into Spark Structured Streaming for real-time windowed aggregations, orchestrated transformations with Airflow and dbt, all orchestrated in Docker.",
      highlights: [
        "Architected scalable Kafka topic partitions and consumer groups to absorb irregular traffic surges without message drop.",
        "Implemented Spark Structured Streaming watermarking and stateful stream-to-batch joins for anomaly detection.",
        "Containerized the end-to-end environment with Docker Compose and scheduled lineage validations with Apache Airflow and dbt."
      ],
      skills: [
        "Apache Kafka",
        "Spark Structured Streaming",
        "Docker",
        "Apache Airflow",
        "dbt",
        "Python",
        "SQL"
      ],
      github: "https://github.com/Padmapiyush/realtime-orders-streaming-platform",
      link: "https://github.com/Padmapiyush/realtime-orders-streaming-platform",
      architectureBadge: "Real-Time Streaming Engine",
    },
    {
      id: "customer-churn",
      name: "Customer Churn & Retention Analytics",
      tagline: "Predictive Customer Intelligence & Interactive Decision Portal",
      description:
        "Built an end-to-end analytics solution segmenting customer behaviors, predicting churn risk, and tracking retention KPIs via Power BI dashboards and SQL models.",
      problem:
        "Account retention teams reacted only after customer cancellations occurred, without proactive indicators or insight into usage patterns driving churn.",
      solution:
        "Formulated statistical feature matrices in SQL and Python/Pandas, designed A/B testing evaluation frameworks, and deployed dynamic executive Power BI dashboards with DAX metrics.",
      highlights: [
        "Engineered comprehensive behavioral feature sets capturing frequency, monetary value, customer support touchpoints, and activity degradation.",
        "Developed interactive drill-through Power BI reports featuring dynamic scenario forecasting, cohort retention curves, and risk segmentation.",
        "Synthesized actionable retention playbooks and presented findings to strategic account managers."
      ],
      skills: [
        "SQL",
        "Python",
        "Pandas",
        "Power BI",
        "DAX",
        "A/B Testing",
        "Statistical Modeling",
        "Cohort Analysis"
      ],
      github: "https://github.com/Padmapiyush/customer-churn-retention-analytics",
      link: "https://github.com/Padmapiyush/customer-churn-retention-analytics",
      architectureBadge: "Customer Analytics & BI",
    },
    {
      id: "supply-chain",
      name: "Supply Chain Performance Intelligence",
      tagline: "Vendor Performance, Procurement Variance & Anomaly Detection",
      description:
        "Created an end-to-end operational intelligence suite analyzing vendor SLAs, purchase order lifecycles, and inventory volatility for strategic supply chain decisions.",
      problem:
        "Fragmented supplier communications and unmonitored delivery delays caused cascading warehouse bottlenecks and unplanned procurement expediting costs.",
      solution:
        "Built a centralized SQL Server reporting data mart, automated data ingestion pipelines with Python, and developed Power BI operational dashboards for SLA tracking.",
      highlights: [
        "Designed star-schema data models optimizing queries across millions of historical shipment, supplier, and warehouse event records.",
        "Implemented automated anomaly detection routines identifying persistent delivery delays and pricing deviations.",
        "Empowered procurement teams with automated supplier scorecarding and fulfillment trend forecasting."
      ],
      skills: [
        "SQL Server",
        "Python",
        "Power BI",
        "DAX",
        "Data Modeling",
        "Supply Chain KPIs",
        "Excel",
        "Statistical Analysis"
      ],
      github: "https://github.com/Padmapiyush/supply-chain-performance-intelligence",
      link: "https://github.com/Padmapiyush/supply-chain-performance-intelligence",
      architectureBadge: "Supply Chain Intelligence",
    },
  ] as Project[],
  skills: [
    {
      category: "Programming & Query Languages",
      items: ["SQL", "Python", "PySpark", "T-SQL", "Bash", "TypeScript", "JavaScript"],
    },
    {
      category: "Data Engineering & Lakehouse",
      items: [
        "ETL/ELT Pipelines",
        "Medallion Architecture (Bronze/Silver/Gold)",
        "Delta Lake",
        "Data Modeling (Star/Snowflake)",
        "Data Quality & Validation",
        "Schema Evolution",
        "Batch & Stream Processing"
      ],
    },
    {
      category: "Cloud & Big Data Platforms",
      items: [
        "Azure Data Factory (ADF)",
        "Azure Databricks",
        "Azure Data Lake Storage (ADLS Gen2)",
        "Azure Key Vault",
        "Apache Kafka",
        "Apache Spark",
        "Managed Identities",
        "Virtual Networks"
      ],
    },
    {
      category: "Orchestration & DevOps",
      items: [
        "Apache Airflow",
        "dbt (data build tool)",
        "Terraform (IaC)",
        "GitHub Actions CI/CD",
        "Docker",
        "Git / Version Control"
      ],
    },
    {
      category: "Analytics & Business Intelligence",
      items: [
        "Power BI",
        "DAX Measures",
        "Tableau",
        "Advanced Excel",
        "KPI Architecture",
        "A/B Testing",
        "Cohort & Retention Analytics",
        "Executive Dashboarding"
      ],
    },
    {
      category: "Databases & Storage",
      items: [
        "SQL Server",
        "PostgreSQL",
        "Delta Tables",
        "Azure Synapse Analytics",
        "Relational & Dimensional Modeling"
      ],
    },
    {
      category: "Data Science & Analytical Libraries",
      items: [
        "Pandas",
        "NumPy",
        "Matplotlib",
        "Seaborn",
        "Scikit-learn",
        "Statistics & Hypothesis Testing"
      ],
    },
  ] as SkillCategory[],
  education: [
    {
      degree: "MCA (Master of Computer Applications)",
      year: "2022 - 2024",
      institution: "Galgotias College of Engineering & Technology",
      location: "Greater Noida, India",
      link: "https://galgotiacollege.edu/welcome-to-gcet",
    },
    {
      degree: "BCA (Bachelor of Computer Applications)",
      year: "2019 - 2022",
      institution: "Integral University",
      location: "Lucknow, India",
      link: "https://www.iul.ac.in/",
    },
  ] as Education[],
  certifications: [
    {
      name: "Google Data Analytics Professional Certificate",
      issuer: "Google / Coursera",
      focus: "Data preparation, SQL modeling, statistical data analysis, and visualization storytelling.",
    },
    {
      name: "The Python Certification Course",
      issuer: "Edureka / Professional Accreditation",
      focus: "Object-oriented programming, scripting, data manipulation with Pandas & NumPy, and algorithm design.",
    },
    {
      name: "Learning Ansible",
      issuer: "LinkedIn Learning",
      focus: "Declarative configuration management, automated deployment playbooks, and systems orchestration.",
    },
    {
      name: "Data Analytics A-Z with Python",
      issuer: "Professional Certificate",
      focus: "Statistical analysis, exploratory data discovery, ETL transformations, and regression analysis.",
    },
    {
      name: "Graphite and Grafana: Visualizing Application Performance",
      issuer: "LinkedIn Learning",
      focus: "Time-series telemetry, system metrics monitoring, alerting thresholds, and performance observability.",
    },
  ] as Certification[],
  interactiveGames: [
    {
      id: "teamforge",
      title: "TeamForge: Build Your Team",
      badge: "FEATURED ARCADE",
      description:
        "Multiverse Character Auction & AI Squad Battle! Draft legends across Marvel, DC, Anime, Cricket, Football, Basketball, Movies & Gaming in a live budget auction, evaluated with AI and tactical analysis.",
      href: "/games/teamforge",
      actionText: "▶ Play TeamForge",
      tags: ["Interactive Game", "AI Evaluation", "Live Auction", "Next.js"],
    },
    {
      id: "sql-quest",
      title: "Data Engineering Quest & SQL Practice",
      badge: "SKILL CHALLENGE",
      description:
        "Interactive scenario challenges, pipeline troubleshooting scenarios, and real-time SQL practice questions designed to test data manipulation and engineering problem-solving.",
      href: "#quest",
      actionText: "Launch Challenges",
      tags: ["SQL Practice", "Pipeline Scenarios", "Troubleshooting"],
    },
  ],
};
