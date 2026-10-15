import { useRef, useState } from "react";
import { CONTENTS } from "../utils/commandHelper";
import Command from "./Command";
import styles from "./Terminal.module.css";

export default function Terminal() {
  const [commands, setCommands] = useState([]);
  const [loading, setLoading] = useState(false);
  const terminalRef = useRef(null);

  const escapeHTML = (str) =>
    str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const addCommand = async (command) => {
    const normalizedCommand = command.trim().toLowerCase();
    let output;
    setLoading(true);
    setCommands([...commands, { command: normalizedCommand, output: "Loading..." }]);

    if (
      normalizedCommand === "teamforge" ||
      normalizedCommand === "game 1" ||
      normalizedCommand === "game teamforge" ||
      normalizedCommand === "play teamforge" ||
      normalizedCommand === "1"
    ) {
      if (typeof window !== "undefined") {
        window.location.href = "/games/teamforge";
      }
      output = `<div class="command">⚡ Launching <b>TeamForge: Build Your Team</b>... <a href="/games/teamforge" style="color: var(--secondary); text-decoration: underline;">Click here if not redirected automatically.</a></div>`;
    } else if (
      normalizedCommand === "game 2" ||
      normalizedCommand === "game quest" ||
      normalizedCommand === "play quest" ||
      normalizedCommand === "quest"
    ) {
      output = `<div class="command">💡 To open <b>Data Engineering Quest & SQL Practice</b>, click the floating <b>portfolio:$</b> button in the bottom right corner of the screen!</div>`;
    } else if (`${normalizedCommand}` in CONTENTS) {
      output = await CONTENTS[`${normalizedCommand}`]();
    } else if (normalizedCommand === "clear") {
      setLoading(false);
      return setCommands([]);
    } else {
      output = CONTENTS.error(escapeHTML(normalizedCommand));
    }

    setLoading(false);
    setCommands([
      ...commands.slice(0, commands.length),
      { command: normalizedCommand, output },
    ]);
    if (terminalRef) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  return (
    <div className={styles.terminal} ref={terminalRef}>
      {/* <Command command="help" output="Some very long text will go in here" /> */}
      {commands.map(({ command, output }, index) => (
        <Command command={command} output={output} key={index} />
      ))}
      {!loading && (
        <Command
          onSubmit={(command) => addCommand(command)}
          suggestions={[...Object.keys(CONTENTS), "clear"]}
        />
      )}
    </div>
  );
}
