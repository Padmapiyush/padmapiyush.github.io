import Cors from "cors";
import runMiddleware from "../../utils/runMiddleware";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD"],
});

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  if (req.method === "GET") {
    const contactMediums = [
      {
        medium: "github",
        username: "Padmapiyush",
        link: "https://github.com/padmapiyush",
      },
      {
        medium: "email",
        username: "thepadmapiyush@gmail.com",
        link: "mailto:thepadmapiyush@gmail.com",
      },
      {
        medium: "facebook",
        username: "Padmapiyush Pathak",
        link: "https://www.facebook.com/thepadmapiyush/",
      },
      {
        medium: "linkedin",
        username: "Padmapiyush",
        link: "https://www.linkedin.com/in/padmapiyush/",
      },
    ];

    res.json(contactMediums);
  } else {
    return res.status(400).json({ message: "Only GET request allowed" });
  }
}
