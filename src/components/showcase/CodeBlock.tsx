import { Highlight, themes } from "prism-react-renderer";
import type { CodeFile } from "../../lib/registry";
import { useTheme } from "../../lib/theme";
import { CopyButton } from "./CopyButton";

interface CodeBlockProps {
  file: CodeFile;
}

export function CodeBlock({ file }: CodeBlockProps) {
  const { theme } = useTheme();
  const prismTheme = theme === "dark" ? themes.vsDark : themes.github;

  return (
    <div className="overflow-hidden rounded-lg border border-black/10 bg-gray-50 dark:border-white/10 dark:bg-[#0d0d14]">
      <div className="flex items-center justify-between border-b border-black/10 px-4 py-2 dark:border-white/10">
        <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
          {file.filename}
        </span>
        <CopyButton text={file.source} />
      </div>
      <Highlight
        theme={prismTheme}
        code={file.source.trimEnd()}
        language={file.language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} overflow-x-auto p-4 text-sm leading-relaxed`}
            style={{ ...style, background: "transparent" }}
          >
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line });
              return (
                <div key={i} {...lineProps}>
                  <span className="mr-4 inline-block w-6 select-none text-right text-gray-400 dark:text-gray-600">
                    {i + 1}
                  </span>
                  {line.map((token, key) => {
                    const tokenProps = getTokenProps({ token });
                    return <span key={key} {...tokenProps} />;
                  })}
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
