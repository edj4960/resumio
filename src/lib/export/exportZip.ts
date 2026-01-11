import JSZip from "jszip";
import type { Resume } from "@/lib/schema/resume";
import { viewerManifest } from "@/lib/export/viewerManifest";

const viewerBasePath = "/viewer-dist";

const readmeText = `Resume Builder Export\n\nSteps\n1. Unzip this archive.\n2. Upload the folder contents to a static host (Netlify Drop, Cloudflare Pages, GitHub Pages).\n3. Ensure index.html and resume.json stay in the same folder.\n\nNotes\n- Theme and template are read from resume.json.\n- No build step is required.`;

export async function buildExportZip(resume: Resume) {
  const zip = new JSZip();

  await Promise.all(
    viewerManifest.map(async (filePath) => {
      const response = await fetch(`${viewerBasePath}/${filePath}`);
      if (!response.ok) {
        throw new Error(`Failed to load viewer asset: ${filePath}`);
      }
      const data = await response.arrayBuffer();
      zip.file(filePath, data);
    }),
  );

  zip.file("resume.json", JSON.stringify(resume, null, 2));
  zip.file("README.txt", readmeText);

  return zip.generateAsync({ type: "blob" });
}
