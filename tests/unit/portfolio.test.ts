import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { PORTFOLIO_DATA } from "../../data/portfolioData";

describe("Portfolio Data Integrity & Structure", () => {
  it("contains complete and authentic professional profile for Padmapiyush", () => {
    expect(PORTFOLIO_DATA.about.name).toBe("Padmapiyush Pathak");
    expect(PORTFOLIO_DATA.about.role).toContain("Data Analyst");
    expect(PORTFOLIO_DATA.about.currentCompany).toBe("IDEMIA Public Security");
    expect(PORTFOLIO_DATA.about.location).toContain("Noida");
    expect(PORTFOLIO_DATA.about.openToRelocation).toBe(true);
    expect(PORTFOLIO_DATA.about.bio.length).toBeGreaterThan(0);
  });

  it("contains quantifiable impact metrics proving top analyst positioning", () => {
    expect(PORTFOLIO_DATA.metrics.length).toBeGreaterThanOrEqual(6);
    expect(PORTFOLIO_DATA.metrics.some((m) => m.value === "95%")).toBe(true);
    expect(PORTFOLIO_DATA.metrics.some((m) => m.value === "20+")).toBe(true);
    expect(PORTFOLIO_DATA.metrics.some((m) => m.value === "10M+")).toBe(true);
    expect(PORTFOLIO_DATA.metrics.some((m) => m.value === "12%")).toBe(true);
  });

  it("preserves authentic honors and awards with citation context", () => {
    expect(PORTFOLIO_DATA.awards.length).toBe(2);
    expect(PORTFOLIO_DATA.awards.some((a) => a.title === "Spot Award")).toBe(true);
    expect(PORTFOLIO_DATA.awards.some((a) => a.title === "Shining Star Award")).toBe(true);
  });

  it("preserves authentic contact links and native PDF resume file", () => {
    expect(PORTFOLIO_DATA.contact.email).toBe("thepadmapiyush@gmail.com");
    expect(PORTFOLIO_DATA.contact.mobile).toBe("+91 9532683568");
    expect(PORTFOLIO_DATA.contact.github).toContain("github.com/padmapiyush");
    expect(PORTFOLIO_DATA.contact.linkedin).toContain("linkedin.com/in/padmapiyush");

    // Verify native PDF resume exists in public folder
    const pdfPath = path.resolve(__dirname, "../../public/Padmapiyush_Pathak_Resume.pdf");
    expect(fs.existsSync(pdfPath)).toBe(true);
  });

  it("contains employment records with quantified metrics and Team CodeOn leadership", () => {
    expect(PORTFOLIO_DATA.experiences.length).toBe(4);
    const [currentRole, analystRole, apprenticeRole, codeOnRole] = PORTFOLIO_DATA.experiences;

    expect(currentRole.company).toBe("IDEMIA Public Security");
    expect(currentRole.position).toBe("Data Analyst");
    expect(currentRole.isCurrent).toBe(true);
    expect(currentRole.responsibilities.some((r) => r.includes("20"))).toBe(true);
    expect(currentRole.responsibilities.some((r) => r.includes("95%"))).toBe(true);

    expect(analystRole.company).toBe("IDEMIA");
    expect(analystRole.responsibilities.some((r) => r.includes("12%"))).toBe(true);

    expect(apprenticeRole.company).toBe("IDEMIA");
    expect(apprenticeRole.position).toContain("Apprentice");

    expect(codeOnRole.company).toBe("Team CodeOn");
    expect(codeOnRole.position).toContain("Data Science Lead");
  });

  it("preserves all featured engineering projects with category tags and pipeline flows", () => {
    expect(PORTFOLIO_DATA.projects.length).toBe(4);

    const churn = PORTFOLIO_DATA.projects.find((p) => p.id === "customer-churn");
    expect(churn).toBeDefined();
    expect(churn?.category).toBe("bi");
    expect(churn?.pipelineFlow?.length).toBeGreaterThan(2);

    const supplyChain = PORTFOLIO_DATA.projects.find((p) => p.id === "supply-chain");
    expect(supplyChain).toBeDefined();
    expect(supplyChain?.category).toBe("ab-testing");

    const lakehouse = PORTFOLIO_DATA.projects.find((p) => p.id === "azure-lakehouse");
    expect(lakehouse).toBeDefined();
    expect(lakehouse?.category).toBe("cloud-lakehouse");
    expect(lakehouse?.skills).toContain("10M+ Daily Records");

    const streaming = PORTFOLIO_DATA.projects.find((p) => p.id === "orders-streaming");
    expect(streaming).toBeDefined();
    expect(streaming?.category).toBe("streaming");
  });

  it("preserves education and exact certifications from sheet", () => {
    expect(PORTFOLIO_DATA.education.length).toBe(2);
    expect(PORTFOLIO_DATA.education[0].degree).toContain("Master of Computer Applications");
    expect(PORTFOLIO_DATA.education[1].degree).toContain("Bachelor of Computer Applications");

    expect(PORTFOLIO_DATA.certifications.some((c) => c.name.includes("Google Data Analytics"))).toBe(true);
    expect(PORTFOLIO_DATA.certifications.some((c) => c.name.includes("Level Up: SQL"))).toBe(true);
    expect(PORTFOLIO_DATA.certifications.some((c) => c.name.includes("Business Process Modeling"))).toBe(true);
  });
});
