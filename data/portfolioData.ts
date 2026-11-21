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
  periodLabel?: string;
  location: string;
  isCurrent?: boolean;
  responsibilities: string[];
  skills: string[];
  impactMetric?: string;
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

export interface Award {
  title: string;
  organization: string;
  description: string;
}

export const PORTFOLIO_DATA = {
  about: {
    name: "Padmapiyush Pathak",
    preferredName: "Padmapiyush",
    initials: "PP",
    role: "Data Analyst & Analytics Engineer",
    headline: "Data Analyst | SQL, Python, Power BI, Tableau & ETL | Google Certified",
    currentCompany: "IDEMIA Public Security",
    location: "Noida, Uttar Pradesh, India",
    openToRelocation: true,
    intro:
      "Elite Data Analyst with proven experience turning raw, complex data into high-adoption dashboards, automated workflows, and high-impact business decisions.",
    elevator:
      "I don't just visualize data — I understand how it's built from the ground up. Having engineered ETL/ELT pipelines processing 10M+ records daily, I trace data quality issues back to their origin rather than just flagging them on a chart.",
    summary:
      "Data Analyst with 2+ years of high-velocity experience turning messy data into executive decisions. At IDEMIA, I've designed over 20 Power BI dashboards, automated reporting workflows to slash manual effort by 95%, and led A/B testing initiatives that cut vendor costs by 12% while boosting delivery timelines by 8%. Certified by Google, honored with the Spot Award and Shining Star Award, and open to international relocation.",
    bio: [
      "I'm a Data Analyst with two years of experience turning raw, messy data into dashboards, insights, and decisions businesses actually use. At IDEMIA, I've built 20+ Power BI and Tableau dashboards that cut manual reporting effort by 40% to 95% and led A/B testing initiatives that reduced vendor costs by 12% while improving delivery timelines by 8%.",
      "What sets me apart from typical analysts: I don't just analyze data — I understand how it's built. I've worked hands-on with Azure Data Factory, Databricks (PySpark), and SQL Server to build the ETL/ELT pipelines that process 10M+ records daily behind the scenes. That means I can trace a data quality issue back to its source, not just flag it on a dashboard.",
      "My core strengths span Data Analysis & Visualization (SQL, Python, Power BI, Tableau, Excel), Data Pipelines & Cloud Infrastructure (Azure Data Factory, Databricks, SQL Server, ETL/ELT), and Measurable Business Impact (A/B testing, vendor cost optimization, dashboard automation).",
      "I bring a rare blend of analytical rigor and technical depth to any team that wants someone who can own a business problem from raw data to final executive insight."
    ],
  },
  metrics: [
    {
      value: "95%",
      label: "Workflow Automation",
      description: "Manual reporting effort slashed through automated SQL & Python pipelines",
    },
    {
      value: "20+",
      label: "Dashboards Deployed",
      description: "High-visibility executive & operational Power BI/Tableau reports",
    },
    {
      value: "10M+",
      label: "Daily Records Ingested",
      description: "Processed through scalable Azure Data Factory & Databricks pipelines",
    },
    {
      value: "12%",
      label: "Cost Reduction",
      description: "Delivered via statistical A/B testing and vendor selection optimization",
    },
    {
      value: "8%",
      label: "Faster Delivery",
      description: "Accelerated shipment SLA timelines through actionable operational intelligence",
    },
    {
      value: "2x",
      label: "Excellence Awards",
      description: "Recognized with IDEMIA Spot Award & Shining Star Award",
    },
  ],
  awards: [
    {
      title: "Spot Award",
      organization: "IDEMIA Public Security",
      description:
        "Awarded for outstanding operational execution, rapid turnaround on critical stakeholder dashboards, and automated reporting initiatives.",
    },
    {
      title: "Shining Star Award",
      organization: "IDEMIA",
      description:
        "Recognized for exceptional technical depth, data modeling excellence, and driving cross-functional business impact through analytics.",
    },
  ] as Award[],
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
      position: "Data Analyst",
      duration: "June 2025 - Present",
      periodLabel: "1 year 6 months",
      location: "Noida, Uttar Pradesh, India",
      isCurrent: true,
      impactMetric: "95% manual effort reduction • 20+ dashboards",
      responsibilities: [
        "Designed and published over 20 enterprise Power BI dashboards, enhancing visibility of critical business KPIs across multi-national stakeholders.",
        "Architected and automated end-to-end reporting workflows, slashing recurring manual reporting effort by approximately 95%.",
        "Developed centralized enterprise reporting models integrating heterogeneous data from disparate relational databases and APIs.",
        "Engineered and maintained ETL/ELT data pipelines with Azure Data Factory, Databricks (PySpark), and SQL Server processing 10M+ daily records.",
        "Enforced rigorous automated data quality validations, tracing data integrity anomalies to their upstream pipeline source before reaching dashboards."
      ],
      skills: [
        "Power BI",
        "DAX",
        "SQL",
        "Python",
        "Azure Data Factory",
        "Databricks (PySpark)",
        "SQL Server",
        "ETL/ELT",
        "KPI Architecture",
        "Automated Reporting"
      ],
    },
    {
      company: "IDEMIA",
      position: "Data Analyst",
      duration: "June 2024 - May 2025",
      periodLabel: "1 year",
      location: "Noida, Uttar Pradesh, India",
      isCurrent: false,
      impactMetric: "12% cost reduction • 8% faster delivery • 40% time saved",
      responsibilities: [
        "Analyzed and transformed high-volume operational datasets using advanced SQL, Python, and Excel to support executive strategic decision-making.",
        "Designed and deployed 7+ interactive dashboards in Power BI and Tableau, cutting manual reporting effort by 40% across business teams.",
        "Spearheaded statistical A/B testing initiatives optimizing vendor selection, driving a 12% cost reduction and 8% faster delivery SLA turnaround.",
        "Formulated cross-functional operational metrics and automated recurring data extracts to guarantee single-source-of-truth reporting."
      ],
      skills: [
        "Power BI",
        "Tableau",
        "SQL",
        "Python",
        "A/B Testing",
        "Vendor Optimization",
        "Advanced Excel",
        "Data Modeling",
        "Cost Reduction"
      ],
    },
    {
      company: "IDEMIA",
      position: "Data Analyst Apprentice",
      duration: "January 2024 - May 2024",
      periodLabel: "5 months",
      location: "Noida, Uttar Pradesh, India",
      isCurrent: false,
      impactMetric: "Foundation in enterprise analytics & SQL pipelines",
      responsibilities: [
        "Joined IDEMIA as a Data Analyst Apprentice to deliver high-impact practical data analytics solutions.",
        "Utilized SQL and Python for exploratory data analysis, data cleansing, and crafting interactive stakeholder dashboards.",
        "Developed complex SQL queries and automated scripts to extract critical data insights aiding informed executive decisions."
      ],
      skills: [
        "SQL",
        "Python",
        "Data Analysis",
        "Excel",
        "Exploratory Data Analysis (EDA)",
        "Interactive Dashboards"
      ],
    },
    {
      company: "Team CodeOn",
      position: "Data Science Lead & Member",
      duration: "May 2023 - April 2024",
      periodLabel: "1 year",
      location: "Greater Noida, India",
      isCurrent: false,
      impactMetric: "Led technical data science projects & mentored analysts",
      responsibilities: [
        "Served as Data Science Lead (Dec 2023 - Apr 2024) driving data analytics initiatives, predictive modeling, and hackathon project architectures.",
        "Mentored team members on SQL query optimization, Python data analysis libraries, and dashboard visualization best practices.",
        "Collaborated as an active member (May 2023 - Dec 2023) contributing to competitive programming, machine learning, and analytical problem-solving."
      ],
      skills: [
        "Python",
        "Machine Learning",
        "Data Science",
        "Team Leadership",
        "Mentorship",
        "Statistical Modeling"
      ],
    },
  ] as Experience[],
  projects: [
    {
      id: "customer-churn",
      name: "Customer Churn & Retention Analytics",
      tagline: "Predictive Customer Intelligence & Executive Decision Portal",
      description:
        "Built an end-to-end analytics solution segmenting customer behaviors, detecting churn risk indicators, and tracking retention KPIs via Power BI dashboards and SQL data models.",
      problem:
        "Business retention teams operated reactively, relying on retrospective monthly reports with no early-warning churn indicators.",
      solution:
        "Formulated statistical feature matrices in SQL and Python/Pandas, designed A/B testing evaluation frameworks, and deployed dynamic executive Power BI dashboards with DAX measures.",
      highlights: [
        "Engineered behavioral feature sets capturing frequency, monetary spend, support touchpoints, and activity degradation.",
        "Delivered interactive Power BI drill-through reports featuring dynamic scenario forecasting, cohort retention curves, and risk segmentation.",
        "Translated analytical findings into concrete retention strategies for account managers."
      ],
      skills: [
        "SQL",
        "Python",
        "Pandas",
        "Power BI",
        "DAX Measures",
        "A/B Testing",
        "Statistical Analysis",
        "Cohort Retention"
      ],
      github: "https://github.com/Padmapiyush/customer-churn-retention-analytics",
      link: "https://github.com/Padmapiyush/customer-churn-retention-analytics",
      architectureBadge: "Executive BI & A/B Testing",
    },
    {
      id: "supply-chain",
      name: "Supply Chain Performance Intelligence",
      tagline: "Vendor Optimization, Delivery SLA Intelligence & Cost Reduction",
      description:
        "Created an end-to-end operational intelligence suite analyzing vendor performance, purchase order lifecycles, and delivery variance for strategic supply chain decisions.",
      problem:
        "Fragmented supplier timelines and unmonitored SLA breaches led to unexpected warehouse bottlenecks and inflated procurement expediting fees.",
      solution:
        "Built a centralized SQL Server reporting data mart, automated data ingestion pipelines with Python, and developed Power BI operational dashboards for SLA tracking.",
      highlights: [
        "Designed star-schema data models optimizing queries across millions of historical shipment, vendor, and fulfillment logs.",
        "Implemented anomaly detection routines identifying persistent delivery delays and pricing deviations.",
        "Empowered procurement teams with automated vendor scorecards, directly fueling a 12% cost reduction and 8% faster delivery."
      ],
      skills: [
        "SQL Server",
        "Python",
        "Power BI",
        "DAX",
        "Data Modeling",
        "Vendor Performance",
        "Excel",
        "SLA Tracking"
      ],
      github: "https://github.com/Padmapiyush/supply-chain-performance-intelligence",
      link: "https://github.com/Padmapiyush/supply-chain-performance-intelligence",
      architectureBadge: "Supply Chain & Cost Optimization",
    },
    {
      id: "azure-lakehouse",
      name: "Azure Medallion Lakehouse Pipeline (10M+ Records)",
      tagline: "End-to-End Bronze-Silver-Gold Lakehouse on Azure with ADF & Databricks",
      description:
        "Designed and implemented an enterprise-grade Bronze-Silver-Gold lakehouse architecture on Microsoft Azure using ADF, Databricks (PySpark), and Delta tables processing 10M+ daily records.",
      problem:
        "Unreliable legacy batch feeds suffered from schema drift, high compute latency, and lack of upstream data lineage, breaking business dashboards.",
      solution:
        "Engineered a resilient Medallion lakehouse pattern: raw landing in Bronze, cleansed and conformally modeled in Silver, and aggregated into business-ready dimensional models in Gold with Delta ACID reliability.",
      highlights: [
        "Constructed automated data pipelines in Azure Data Factory with dynamic parameterization, error notifications, and monitoring.",
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
        "10M+ Daily Records",
        "Data Quality"
      ],
      github: "https://github.com/Padmapiyush/azure-medallion-lakehouse-pipeline",
      link: "https://github.com/Padmapiyush/azure-medallion-lakehouse-pipeline",
      architectureBadge: "Enterprise Data Pipeline (10M+ Daily)",
    },
    {
      id: "orders-streaming",
      name: "Real-Time Orders Streaming & Anomaly Detection",
      tagline: "Distributed Event Ingestion & Sliding-Window Analytics Platform",
      description:
        "Engineered a real-time event streaming platform that ingests live order events, computes sliding-window aggregations, and surfaces operational metrics.",
      problem:
        "Business operations lacked sub-minute visibility into order surges, payment failure anomalies, and inventory bottlenecks due to batch latency.",
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
  ] as Project[],
  skills: [
    {
      category: "Data Analysis & Business Intelligence",
      items: [
        "Microsoft Power BI",
        "DAX Measures",
        "Tableau",
        "Advanced Excel",
        "A/B Testing",
        "Vendor Cost Optimization",
        "Dashboard Automation (95% reduction)",
        "KPI Architecture",
        "Cohort & Retention Analytics",
        "Executive Storytelling"
      ],
    },
    {
      category: "Programming & Query Languages",
      items: ["SQL (Advanced / Level Up)", "Python", "PySpark", "T-SQL", "MySQL", "PHP & Python Scripting", "Bash", "TypeScript"],
    },
    {
      category: "Data Pipelines, Cloud & ETL/ELT",
      items: [
        "Azure Data Factory (ADF)",
        "Azure Databricks",
        "SQL Server",
        "ETL/ELT Architecture",
        "10M+ Records Processing",
        "Bronze-Silver-Gold Lakehouse",
        "Delta Lake",
        "Data Quality & Lineage Validation"
      ],
    },
    {
      category: "Business Analysis & Process Modeling",
      items: [
        "Business Process Modeling",
        "Root Cause Data Analysis",
        "Requirements Elicitation",
        "Stakeholder Communication",
        "Process Flow Optimization",
        "Cross-Project KPI Alignment"
      ],
    },
    {
      category: "Monitoring, DevOps & Orchestration",
      items: [
        "Graphite & Grafana Observability",
        "Apache Airflow",
        "dbt (data build tool)",
        "Terraform (IaC)",
        "GitHub Actions CI/CD",
        "Docker",
        "Git / Version Control"
      ],
    },
    {
      category: "Databases & Storage Technologies",
      items: [
        "SQL Server",
        "PostgreSQL",
        "MySQL",
        "ADLS Gen2",
        "Delta Tables",
        "Star & Snowflake Schemas"
      ],
    },
    {
      category: "Statistical & Data Science Libraries",
      items: [
        "Pandas",
        "NumPy",
        "Matplotlib",
        "Seaborn",
        "Scikit-learn",
        "Hypothesis Testing & A/B Evals"
      ],
    },
  ] as SkillCategory[],
  education: [
    {
      degree: "Master of Computer Applications - MCA",
      year: "October 2022 - June 2025",
      institution: "Galgotias College of Engineering and Technology",
      location: "Greater Noida, Uttar Pradesh, India",
      link: "https://galgotiacollege.edu/welcome-to-gcet",
    },
    {
      degree: "Bachelor of Computer Applications - BCA",
      year: "2019 - 2022",
      institution: "Integral University",
      location: "Lucknow, Uttar Pradesh, India",
      link: "https://www.iul.ac.in/",
    },
  ] as Education[],
  certifications: [
    {
      name: "Google Data Analytics Professional Certificate",
      issuer: "Google / Coursera",
      focus: "End-to-end data preparation, SQL modeling, statistical data analysis, R/Python programming, and executive visualization storytelling.",
    },
    {
      name: "Business Analysis Foundations: Business Process Modeling",
      issuer: "LinkedIn Learning / Professional Accreditation",
      focus: "Process mapping, business architecture, workflow optimization, and KPI alignment.",
    },
    {
      name: "Level Up: SQL",
      issuer: "LinkedIn Learning",
      focus: "Advanced SQL queries, window functions, CTEs, indexing, performance optimization, and complex joins.",
    },
    {
      name: "SQL Bootcamp with MySQL, PHP & Python : 5 Courses in 1",
      issuer: "Comprehensive Professional Accreditation",
      focus: "Relational database design, multi-table queries, stored procedures, backend integration, and automation.",
    },
    {
      name: "Graphite and Grafana: Visualizing Application Performance",
      issuer: "LinkedIn Learning",
      focus: "Time-series telemetry, real-time dashboarding, alerting thresholds, and system observability.",
    },
    {
      name: "The Python Certification Course",
      issuer: "Edureka / Professional Accreditation",
      focus: "Object-oriented scripting, Pandas, NumPy, data manipulation, and automated analytical pipelines.",
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
