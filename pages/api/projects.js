import Cors from "cors";
import runMiddleware from "../../utils/runMiddleware";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD"],
});

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  if (req.method === "GET") {
    const projects = [
      {
        name: "FORECAST SALES REVENUE",
        description:
          "Developed a robust machine learning model using Python and scikit-learn to forecast sales revenue.",
        stack: ["Python", "scikit-learn", "Pandas", "Numpy", "Matplotlib"],
        link: "https://github.com/Padmapiyush/forecasting-sales-revenue"
      },
      {
        name: "Summarizer",
        description:
          "This code provides Summary of a PDF document using PyPDF2 library to extract text from a PDF document and NLTK library for NLP processing.",
        stack: ["Python", "PyPDF2", "NLTK"],
        link: "https://new-delhi-space-society.github.io/"
      },
      {
        name: "sentiment-analysis",
        description:"Conducted sentiment analysis on customer reviews using natural language processing techniques in Python.",
        stack: ["Python", "NLTK", "Pandas", "Numpy"],
        link: "https://dpsgoethequiz.com"
      },
      {
        name: "COVID-19 Tracker",
        description:
          "Developed a COVID-19 Tracker using ReactJS and Material UI.",
        stack: ["ReactJS", "Material UI"],
      },
    ];

    return res.json(projects);
  } else {
    return res.status(400).json({ message: "Only GET request allowed" });
  }
}
