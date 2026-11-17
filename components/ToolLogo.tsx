import type { Tool } from "@/data/site";

/** Couleur de marque d'un outil (logo officiel ou monogramme). */
export const toolColor = (tool: Tool) => (tool.icon ? `#${tool.icon.hex}` : tool.mono?.color ?? "#5B45E0");

/**
 * Logo d'un outil : le logo officiel s'il existe dans simple-icons, sinon un monogramme sobre.
 * `colored` affiche directement la couleur de marque ; sinon le logo hérite de currentColor.
 */
export function ToolLogo({ tool, size = 30, colored = false }: { tool: Tool; size?: number; colored?: boolean }) {
  if (tool.icon) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} fill={colored ? toolColor(tool) : "currentColor"} aria-hidden="true">
        <path d={tool.icon.path} />
      </svg>
    );
  }
  const text = tool.mono?.text ?? tool.name.slice(0, 2);
  return (
    <span
      aria-hidden="true"
      className="inline-flex items-center justify-center rounded-md font-semibold leading-none transition-colors"
      style={{
        width: size,
        height: size,
        fontSize: size * (text.length > 2 ? 0.34 : 0.44),
        background: colored ? toolColor(tool) : "currentColor",
      }}
    >
      <span style={{ color: colored ? "#fff" : "var(--tile-bg, #fff)" }}>{text}</span>
    </span>
  );
}
