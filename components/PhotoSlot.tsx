import Image from "next/image";
import { site } from "@/data/site";

export function PhotoSlot({ alt, className = "" }: { alt: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-paper/10 bg-ink-800 ${className}`}>
      <Image src={site.photo} alt={alt} fill priority sizes="(min-width: 1024px) 384px, 320px" className="photo-zoom object-cover object-top" />
    </div>
  );
}
