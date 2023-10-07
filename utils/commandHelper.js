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
    description: "My Tech Skills",
  },
  {
    command: "projects",
    description: "My Tech Projects",
  },
  {
    command: "contact",
    description: "Contact Me",
  },
  {
    command: "resume",
    description: "View My Resume",
  },
  {
    command:
      // 'clear <span style="color: var(--primary)">(Ctrl+L shortcut)</span>',
      "clear",
    description: "Clear terminal",
  },
];

const getProjects = async () => {
  const projects = await (await fetch("/api/projects")).json();
  const projectHTML =
    `<h3>My Projects (You can scroll)</h3>` +
    projects
      .map(
        (project) => `<div class="command">
        <a href="${project.link}" target="_blank"><b class="command">${
          project.name
        }</b></a> - <b>${project.stack.join(", ")}</b>
        <p class="meaning">${project.description}</p>
      </div>`
      )
      .join("");
  return projectHTML;
};

const getContacts = async () => {
  const contactMediums = await (await fetch("/api/contacts")).json();
  return contactMediums
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
  )} and I\'m a Tech Enthusiast and a Software Developer, loving to play with data.
    <br/><br/>
    Exploring the realms of curiosity and constant enthusiasm, I'm a perpetual student who spends the majority of my time crafting intricate code, particularly in the captivating realm of JavaScript. Join me on this coding adventure, and let's bring our ideas to life together!
    <br /><br />
    I love coding in C/C++, Java and Python, and have worked with frameworks like ReactJS, Express, MongoDB and MySQL. 
    <br /><br />
    I am Club Lead at <a href="https://codeons.github.io" target="_blank">CodeOn</a> ('22-23).
    <br />
    I am also the Technical Lead at the Department of Computer Applications, of <a href="https://space.nss.org" target="_blank">GCET</a>.
    <br />
    As one of the Placement Co-ordinators, I am also responsible for all the placement activities at the Department of Computer Applications, of <a href="https://galgotiacollege.edu/welcome-to-gcet" target="_blank">GCET</a>.
  `,
  education:
    () => `MCA, 2024 <br /> <a href="https://galgotiacollege.edu/welcome-to-gcet" target="_blank">Galgotias College of Engineering & Technology, Greater Noida</a> 
    <br /> BCA, 2022 <br /> <a href="https://www.iul.ac.in/" target="_blank">Integral University, Lucknow</a>.`,
  skills: () => `
  I am experienced with Java, Python and the web technologies dominating at the time: <br />
  <div class="skill"><b>core</b>: JavaScript, Java, Python, Linux, Git, SQL<br /></div>
  <div class="skill"><b>frameworks</b>: React, Express, Tableau, Google Cloud Platform, Android<br /></div>
  <div class="skill"><b>database</b>: MongoDB, PostgreSQL, MySQL <br /></div>.
<br /><br />
  I also have experience with Android Development.
  `,
  projects: getProjects,
  contact: getContacts,
  error: (input) =>
    `<div class="help-command">sh: Unknown command: ${input}</div><div class="help-command">See \`help\` for info`,
  resume: () => {
    window.open("https://drive.google.com/file/d/1Z2nUAIa6JmOROGqtCVFYlBCnH31JqW-_/view?usp=sharing", "_blank");
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
