import { useMemo, useState } from "react";
import styles from "./Input.module.css";

export default function Input({ command, onSubmit, suggestions = [] }) {
  const [_command, setCommand] = useState(command ? command : "");
  const normalizedInput = _command.trim().toLowerCase();
  const filteredSuggestions = useMemo(
    () =>
      normalizedInput
        ? suggestions.filter((item) => item.startsWith(normalizedInput))
        : suggestions,
    [normalizedInput, suggestions]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setCommand("");
    return onSubmit(_command);
  };

  const handleKeyDown = (e) => {
    if (e.key !== "Tab" || command) return;
    if (!filteredSuggestions.length) return;

    e.preventDefault();
    setCommand(filteredSuggestions[0]);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="command">
        <span style={{ color: "#ff9e64" }}>λ</span> ::{" "}
        <span style={{ color: "var(--primary)" }}>~</span>{" "}
        <span style={{ color: "var(--secondary)" }}>&gt;&gt;</span>
      </label>

      <input
        type="text"
        className={styles.input}
        value={_command}
        onChange={(e) => setCommand(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={command ? true : false}
        ref={(input) => input && !command && input.focus()}
        autoFocus={command === ""}
      />
      {!command && normalizedInput && filteredSuggestions.length > 0 && (
        <div className={styles.suggestion}>
          autocomplete: {filteredSuggestions.slice(0, 4).join(", ")}
        </div>
      )}
    </form>
  );
}
