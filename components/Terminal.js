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
    if (`${normalizedCommand}` in CONTENTS) {
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
      {!loading && <Command onSubmit={(command) => addCommand(command)} />}
    </div>
  );
}
