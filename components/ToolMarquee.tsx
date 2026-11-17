import { ToolLogo } from "@/components/ToolLogo";
import type { Tool } from "@/data/site";

/**
 * Bande de logos qui défile en continu (CSS pur, se met en pause au survol,
 * s'arrête si le visiteur préfère moins de mouvement).
 */
export function ToolMarquee({ tools, label }: { tools: Tool[]; label: string }) {
  const row = (hidden: boolean) => (
    <ul className="marquee-track flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {tools.map((tool) => (
        <li key={tool.name} className="flex items-center gap-3 whitespace-nowrap text-mute">
          <ToolLogo tool={tool} size={24} colored />
          <span className="text-sm font-medium text-paper/80">{tool.name}</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee group relative overflow-hidden py-6" role="region" aria-label={label}>
      <div className="flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
