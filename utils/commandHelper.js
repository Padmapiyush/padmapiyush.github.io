const COMMANDS = [
  {
    command: "about",
    description: "About Me",
  },
  {
    command: "education",
    description: "My Education",
  },
  {
    command: "skills",
    description: "Data Engineering Skills",
  },
  {
    command: "projects",
    description: "Data Projects",
  },
  {
    command: "experience",
    description: "Work Experience",
  },
  {
    command: "certifications",
    description: "Professional Certifications",
  },
  {
    command: "post",
    description: "Open LinkedIn Posts",
  },
  {
    command: "contacts",
    description: "Contact Me",
  },
  {
    command: "resume",
    description: "View My Resume",
  },
  {
    command: "game",
    description: "Play Interactive Games (TeamForge, etc.)",
  },
  {
    command: "teamforge",
    description: "Launch TeamForge: Build Your Team",
  },
  {
    command:
      // 'clear <span style="color: var(--primary)">(Ctrl+L shortcut)</span>',
      "clear",
    description: "Clear Terminal",
  },
];

const PROJECTS = [
  {
    name: "Customer Churn & Retention Analytics",
    description:
      "Built an end-to-end analytics project that segments customers, detects churn risk, and tracks retention KPIs with interactive Power BI dashboards and SQL models.",
    stack: ["SQL", "Python", "Pandas", "Power BI", "A/B Testing"],
    link: "https://github.com/Padmapiyush/customer-churn-retention-analytics",
  },
  {
    name: "Supply Chain Performance Intelligence",
    description:
      "Created a data analytics solution to analyze procurement, delivery SLAs, and vendor performance; includes KPI trend analysis and anomaly detection for operational decisions.",
    stack: ["SQL Server", "Python", "Excel", "Power BI", "Statistics"],
    link: "https://github.com/Padmapiyush/supply-chain-performance-intelligence",
  },
  {
    name: "Azure Medallion Lakehouse Pipeline",
    description:
      "Designed a Bronze-Silver-Gold lakehouse on Azure with ADF, Databricks (PySpark), and Delta tables. Added data quality checks, orchestration, and cost-aware transformations.",
    stack: [
      "Azure Data Factory",
      "Databricks",
      "PySpark",
      "Delta Lake",
      "SQL",
    ],
    link: "https://github.com/Padmapiyush/azure-medallion-lakehouse-pipeline",
  },
  {
    name: "Real-Time Orders Streaming Platform",
    description:
      "Engineered a streaming data platform that ingests live order events, performs near-real-time aggregations, and serves operational metrics with automated data pipeline monitoring.",
    stack: ["Kafka", "Spark Structured Streaming", "Docker", "Airflow", "dbt"],
    link: "https://github.com/Padmapiyush/realtime-orders-streaming-platform",
  },
];

const CONTACTS = [
  {
    medium: "github",
    username: "Padmapiyush",
    link: "https://github.com/padmapiyush",
  },
  {
    medium: "mobile",
    username: "9532683568",
    link: "tel:+919532683568",
  },
  {
    medium: "email",
    username: "thepadmapiyush@gmail.com",
    link: "mailto:thepadmapiyush@gmail.com",
  },
  {
    medium: "linkedin",
    username: "Padmapiyush",
    link: "https://www.linkedin.com/in/padmapiyush/",
  },
];

const getProjects = () => {
  const projectHTML =
    `<h3>My Projects (You can scroll)</h3>` +
    PROJECTS
      .map(
        (project) => `<div class="command">
        <a href="${project.link || "#"}" target="_blank"><b class="command">${
          project.name
        }</b></a> - <b>${project.stack.join(", ")}</b>
        <p class="meaning">${project.description}</p>
      </div>`
      )
      .join("");
  return projectHTML;
};

const getContacts = () => {
  return CONTACTS
    .map(
      (contact) => `<div style="display: flex; justify-content: space-between;">
      <p style="font-size: 15px">${contact.medium}</p>
      <a class="meaning" href="${contact.link}" target="_blank">${contact.username}</a>
    </div>`
    )
    .join("");
};

export const CONTENTS = {
  help: () =>
    COMMANDS.map(
      (command) => `<div style="display: flex; justify-content: space-between;">
        <p style="font-size: 15px">${command.command}</p>
        <p>${command.description}</p>
      </div>`
    ).join("") +
    `<br />
      <div class="command">Type one of the above to view. For eg. <span style="color: var(--secondary)">about</span></div>`,
  about: () => `My name is Padmapiyush. I am ${getAge(
    "January 28, 2001"
  )} and I am a Data Engineering Analyst focused on turning raw data into production-ready data products.
    <br/><br/>
    I currently work at <b>IDEMIA Public Security</b>, where I build and optimize ETL/ELT pipelines, cloud infrastructure, and analytics-ready datasets for business teams.
    <br /><br />
    My core strengths include pipeline orchestration, data modeling, data quality, and performance tuning across modern cloud data stacks.
    <br /><br />
    I enjoy solving high-impact problems in analytics engineering, automation, and real-time processing using SQL, Python, PySpark, Databricks, and Azure services.
    <br />
    Open to collaborating on data engineering and analytics projects that require scalable architecture and measurable business outcomes.
  `,
  experience: () => `
  <h3>Experience</h3>
  <div class="command">
    <b>IDEMIA Public Security</b> — <b>Data Engineering Analyst</b><br />
    <span class="meaning">August 2025 - Present | Noida, India</span>
    <p class="meaning">
      • Built production ETL/ELT pipelines with Azure Data Factory and Databricks (PySpark).<br />
      • Provisioned secure Azure infrastructure (Storage, Key Vault, Managed Identity, networking).<br />
      • Improved pipeline runtime and compute efficiency through optimized transformations and SQL tuning.<br />
      • Automated deployments using Terraform + GitHub Actions CI/CD.
    </p>
  </div>
  <div class="command">
    <b>IDEMIA</b> — <b>Data Analyst</b><br />
    <span class="meaning">June 2025 - August 2025 | Noida, India</span>
    <p class="meaning">
      • Delivered interactive dashboards in Power BI/Tableau for operational decision-making.<br />
      • Performed analysis using SQL + Python to reduce manual reporting and improve turnaround.
    </p>
  </div>
  <div class="command">
    <b>IDEMIA</b> — <b>Analyst Trainee / Data Analyst Apprentice</b><br />
    <span class="meaning">January 2024 - May 2025 | Noida, India</span>
    <p class="meaning">
      • Supported analytics initiatives, data preparation, reporting automation, and stakeholder insights.
    </p>
  </div>
  `,
  certifications: () => `
  <h3>Certifications</h3>
  <div class="command">• Google Data Analytics Professional Certificate</div>
  <div class="command">• The Python Certification Course</div>
  <div class="command">• Learning Ansible</div>
  <div class="command">• Data Analytics A-Z with Python</div>
  <div class="command">• Graphite and Grafana: Visualizing Application Performance</div>
  `,
  education:
    () => `MCA, 2024 <br /> <a href="https://galgotiacollege.edu/welcome-to-gcet" target="_blank">Galgotias College of Engineering & Technology, Greater Noida</a> 
    <br /> BCA, 2022 <br /> <a href="https://www.iul.ac.in/" target="_blank">Integral University, Lucknow</a>.`,
  skills: () => `
  I build reliable analytics systems and data platforms with strong foundations in engineering and business intelligence: <br />
  <div class="skill"><b>Languages</b>: SQL, Python, PySpark, T-SQL<br /></div>
  <div class="skill"><b>Data Engineering</b>: ETL/ELT, Data Modeling, Data Warehousing, Data Quality, Batch + Streaming Pipelines<br /></div>
  <div class="skill"><b>Cloud & Big Data</b>: Azure Data Factory, Azure Databricks, ADLS, Delta Lake, Kafka<br /></div>
  <div class="skill"><b>Orchestration & DevOps</b>: Airflow, dbt, GitHub Actions, Terraform, CI/CD<br /></div>
  <div class="skill"><b>Analytics & BI</b>: Power BI, Tableau, Excel, A/B Testing, KPI Design<br /></div>
<br /><br />
  I also work on dashboard storytelling, experimentation, and performance optimization for production analytics workloads.
  `,
  projects: getProjects,
  contact: getContacts,
  contacts: getContacts,
  certificationd: () => CONTENTS.certifications(),
  post: () => {
    window.open("https://www.linkedin.com/in/padmapiyush/recent-activity/posts/", "_blank");
    return "";
  },
  error: (input) =>
    `<div class="help-command">sh: Unknown command: ${input}</div><div class="help-command">See \`help\` for info`,
  game: () => `
  <h3>🎮 Interactive Games & Arcade</h3>
  <p>Select which game you want to play:</p>
  <br />
  <div class="command" style="padding: 12px; border: 1px solid #8B5CF6; border-radius: 8px; background: rgba(139, 92, 246, 0.08); margin-bottom: 12px;">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <b style="color: #F59E0B; font-size: 16px;">1. TeamForge: Build Your Team</b>
      <span style="background: rgba(139, 92, 246, 0.2); color: #C4B5FD; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: bold;">FEATURED</span>
    </div>
    <p class="meaning" style="margin-top: 4px; color: #E2E8F0;">
      Multiverse Character Auction & AI Squad Battle! Draft legends across Marvel, DC, Anime, Cricket, Football, Basketball, Movies & Gaming in a live budget auction, then evaluate the ultimate team with AI or tactical analysis.
    </p>
    <div style="margin-top: 10px; display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
      <a href="/games/teamforge" style="display: inline-block; background: #8B5CF6; color: white; padding: 6px 14px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 12px;">▶ Click to Play TeamForge</a>
      <span style="color: #94A3B8; font-size: 12px;">(or type: <b style="color: #22D3EE;">teamforge</b> or <b style="color: #22D3EE;">game 1</b>)</span>
    </div>
  </div>

  <div class="command" style="padding: 12px; border: 1px solid #2A2A4E; border-radius: 8px; background: rgba(30, 41, 59, 0.2); margin-bottom: 8px;">
    <b style="color: #22D3EE; font-size: 15px;">2. Data Engineering Quest & SQL Practice</b><br />
    <p class="meaning" style="margin-top: 4px;">
      Interactive scenario challenges, pipeline troubleshooting, and real-time SQL practice questions.
    </p>
    <div style="margin-top: 6px;">
      <span style="color: #94A3B8; font-size: 12px;">Click the <b>portfolio:$</b> floating button in the bottom right corner to open!</span>
    </div>
  </div>
  `,
  games: () => CONTENTS.game(),
  teamforge: () => {
    if (typeof window !== "undefined") {
      window.location.href = "/games/teamforge";
    }
    return `<div class="command">⚡ Launching <b>TeamForge: Build Your Team</b>... <a href="/games/teamforge" style="color: #22D3EE; text-decoration: underline;">Click here if not redirected automatically.</a></div>`;
  },
  play: () => CONTENTS.game(),
  resume: () => {
    window.open("https://drive.google.com/file/d/14bikRoLOfn6R8Vr2n1auxisV51F_8HB6/view?usp=sharing", "_blank");
    return "";
  },
};

function getAge(dateString) {
  const today = new Date();
  const birthDate = new Date(dateString);

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;

  return age;
}
