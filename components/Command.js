import Input from "./Input";
import Output from "./Output";

export default function Command({ command, output, onSubmit, suggestions = [] }) {
  return (
    <div>
      <Input
        command={command}
        onSubmit={(command) => onSubmit(command)}
        suggestions={suggestions}
      />
      {output && <Output output={output} />}
    </div>
  );
}
