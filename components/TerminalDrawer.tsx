import * as React from "react";
import { Terminal as TerminalIcon, X, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "./ui/Button";
import Terminal from "./Terminal";

export function TerminalDrawer() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {/* Floating Trigger Button in bottom right */}
      <div className="fixed bottom-5 right-5 z-40">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full shadow-lg border-border bg-card/90 backdrop-blur-md hover:bg-secondary text-foreground text-xs font-mono gap-2 py-2 px-3.5 hover:border-accent transition-all duration-200"
          title="Toggle interactive terminal CLI"
        >
          <TerminalIcon className="h-3.5 w-3.5 text-accent" />
          <span className="hidden sm:inline font-semibold">terminal:~$</span>
          <span className="sm:hidden font-semibold">CLI</span>
        </Button>
      </div>

      {/* Terminal Drawer / Window */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 sm:right-6 z-50 w-[94vw] sm:w-[540px] max-w-[600px] h-[450px] rounded-xl border border-border bg-[#0f111a] text-slate-200 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Terminal Title Bar */}
          <div className="px-4 py-2.5 bg-[#161822] border-b border-white/10 flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span
                  onClick={() => setIsOpen(false)}
                  className="h-3 w-3 rounded-full bg-red-500/80 hover:bg-red-500 cursor-pointer inline-block"
                />
                <span
                  onClick={() => setIsOpen(false)}
                  className="h-3 w-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 cursor-pointer inline-block"
                />
                <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block" />
              </div>
              <span className="text-xs font-mono text-slate-400 ml-2">
                padmapiyush@portfolio:~ (type `help`)
              </span>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded"
              aria-label="Close terminal"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Terminal Content */}
          <div className="flex-1 p-3 overflow-y-auto font-mono text-xs">
            <Terminal />
          </div>
        </div>
      )}
    </>
  );
}

