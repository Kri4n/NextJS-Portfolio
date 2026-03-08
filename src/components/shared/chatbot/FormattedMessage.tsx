export default function FormattedMessage({ content }: { content: string }) {
  const lines = content.split("\n");

  function formatInline(text: string): string {
    return text
      .replace(
        /\*\*(.+?)\*\*/g,
        '<strong class="text-amber-400/90">$1</strong>',
      )
      .replace(
        /\[(.+?)\]\((https?:\/\/[^\)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-amber-400 underline underline-offset-2 hover:text-amber-300">$1</a>',
      );
  }

  return (
    <div className="flex flex-col gap-2">
      {lines.map((line, i) => {
        // Bullet points: * or -
        if (/^\s*[\*\-]\s+/.test(line)) {
          const text = line.replace(/^\s*[\*\-]\s+/, "");
          return (
            <div key={i} className="flex gap-2 items-start">
              <span className="text-amber-400/50 mt-0.5 shrink-0">▸</span>
              <span dangerouslySetInnerHTML={{ __html: formatInline(text) }} />
            </div>
          );
        }

        // Empty line = spacer
        if (line.trim() === "") {
          return <div key={i} className="h-1" />;
        }

        // Regular paragraph
        return (
          <p key={i} dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
        );
      })}
    </div>
  );
}
