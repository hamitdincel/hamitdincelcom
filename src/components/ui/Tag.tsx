export function TagList({
  items,
  className = "",
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((item) => (
        <li
          key={item}
          className="rounded-lg border border-line bg-surface px-2.5 py-1.5 font-mono text-[11.5px] text-ink-muted transition-colors duration-300 hover:border-line-strong hover:text-ink"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
