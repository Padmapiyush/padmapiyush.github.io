import { describe, it, expect } from "vitest";
import { PORTFOLIO_DATA } from "../../data/portfolioData";

describe("Portfolio Data Integrity & Structure", () => {
  it("contains complete and authentic professional profile for Padmapiyush", () => {
    expect(PORTFOLIO_DATA.about.name).toBe("Padmapiyush Pathak");
    expect(PORTFOLIO_DATA.about.role).toBe("Data Engineering Analyst");
    expect(PORTFOLIO_DATA.about.currentCompany).toBe("IDEMIA Public Security");
    expect(PORTFOLIO_DATA.about.location).toBe("Noida, India");
    expect(PORTFOLIO_DATA.about.bio.length).toBeGreaterThan(0);
  });

  it("preserves authentic contact links and email", () => {
    expect(PORTFOLIO_DATA.contact.email).toBe("thepadmapiyush@gmail.com");
    expect(PORTFOLIO_DATA.contact.mobile).toBe("+91 9532683568");
    expect(PORTFOLIO_DATA.contact.github).toContain("github.com/padmapiyush");
    expect(PORTFOLIO_DATA.contact.linkedin).toContain("linkedin.com/in/padmapiyush");
    expect(PORTFOLIO_DATA.contact.resume).toContain("drive.google.com");
  });

  it("contains chronological employment records with bullet points", () => {
    expect(PORTFOLIO_DATA.experiences.length).toBe(3);
    const [currentRole, analystRole, apprenticeRole] = PORTFOLIO_DATA.experiences;

    expect(currentRole.company).toBe("IDEMIA Public Security");
    expect(currentRole.position).toBe("Data Engineering Analyst");
    expect(currentRole.isCurrent).toBe(true);
    expect(currentRole.responsibilities.length).toBeGreaterThanOrEqual(4);
    expect(currentRole.skills).toContain("Azure Data Factory");
    expect(currentRole.skills).toContain("PySpark");

    expect(analystRole.company).toBe("IDEMIA");
    expect(analystRole.position).toBe("Data Analyst");

    expect(apprenticeRole.company).toBe("IDEMIA");
    expect(apprenticeRole.position).toContain("Apprentice");
  });

  it("preserves all 4 featured engineering projects with problem and solution statements", () => {
    expect(PORTFOLIO_DATA.projects.length).toBe(4);

    const lakehouse = PORTFOLIO_DATA.projects.find((p) => p.id === "azure-lakehouse");
    expect(lakehouse).toBeDefined();
    expect(lakehouse?.skills).toContain("Delta Lake");
    expect(lakehouse?.skills).toContain("Azure Databricks");
    expect(lakehouse?.problem.length).toBeGreaterThan(20);
    expect(lakehouse?.solution.length).toBeGreaterThan(20);

    const streaming = PORTFOLIO_DATA.projects.find((p) => p.id === "orders-streaming");
    expect(streaming).toBeDefined();
    expect(streaming?.skills).toContain("Apache Kafka");
    expect(streaming?.skills).toContain("Spark Structured Streaming");

    const churn = PORTFOLIO_DATA.projects.find((p) => p.id === "customer-churn");
    expect(churn).toBeDefined();

    const supplyChain = PORTFOLIO_DATA.projects.find((p) => p.id === "supply-chain");
    expect(supplyChain).toBeDefined();
  });

  it("organizes technical skills into distinct categories", () => {
    expect(PORTFOLIO_DATA.skills.length).toBeGreaterThanOrEqual(6);
    const categories = PORTFOLIO_DATA.skills.map((s) => s.category);
    expect(categories.some((c) => c.includes("Programming"))).toBe(true);
    expect(categories.some((c) => c.includes("Data Engineering"))).toBe(true);
    expect(categories.some((c) => c.includes("Cloud & Big Data"))).toBe(true);
    expect(categories.some((c) => c.includes("Analytics"))).toBe(true);
  });

  it("preserves education and certifications", () => {
    expect(PORTFOLIO_DATA.education.length).toBe(2);
    expect(PORTFOLIO_DATA.education[0].degree).toContain("MCA");
    expect(PORTFOLIO_DATA.education[1].degree).toContain("BCA");

    expect(PORTFOLIO_DATA.certifications.length).toBe(5);
    expect(PORTFOLIO_DATA.certifications.some((c) => c.name.includes("Google Data Analytics"))).toBe(true);
  });
});
