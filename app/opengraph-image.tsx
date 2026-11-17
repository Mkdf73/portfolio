import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

const name = "Mohamed Kadafi";

export const alt = `${name}, software developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Image de partage (LinkedIn, WhatsApp, Facebook...) avec la photo de profil.
export default async function Image() {
  const photo = await readFile(join(process.cwd(), "public", "photo.jpg"));
  const src = `data:image/jpeg;base64,${photo.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#F8F8F4", color: "#14172B" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 70px", flex: 1 }}>
          <div style={{ fontSize: 22, letterSpacing: 6, textTransform: "uppercase", color: "#5B45E0", fontWeight: 700 }}>Software developer</div>
          <div style={{ fontSize: 86, fontWeight: 700, marginTop: 24, lineHeight: 1 }}>{name}</div>
          <div style={{ fontSize: 34, marginTop: 28, color: "#5C6075" }}>Backend, APIs and databases.</div>
          <div style={{ fontSize: 34, marginTop: 6, color: "#5C6075" }}>AI video production.</div>
          <div style={{ display: "flex", marginTop: 44, height: 6, width: 120, background: "#5B45E0", borderRadius: 3 }} />
        </div>
        <div style={{ display: "flex", width: 430, height: "100%", position: "relative" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" width={430} height={630} style={{ objectFit: "cover", objectPosition: "top", width: 430, height: 630 }} />
        </div>
      </div>
    ),
    size,
  );
}
