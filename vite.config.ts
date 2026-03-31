import fs from "node:fs";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const figmaAssetPrefix = "figma:asset/";
const figmaAssetsDir = path.resolve(__dirname, "./src/assets");

function resolveFigmaAssetFile(assetId: string) {
  const directPath = path.resolve(figmaAssetsDir, assetId);
  if (fs.existsSync(directPath)) {
    return directPath;
  }

  if (!fs.existsSync(figmaAssetsDir)) {
    return null;
  }

  const matchingAsset = fs
    .readdirSync(figmaAssetsDir)
    .find((fileName) => fileName === assetId || fileName.startsWith(`${assetId}.`));

  return matchingAsset ? path.resolve(figmaAssetsDir, matchingAsset) : null;
}

function figmaAssetResolver() {
  return {
    name: "figma-asset-resolver",
    enforce: "pre" as const,
    resolveId(source: string) {
      if (!source.startsWith(figmaAssetPrefix)) {
        return null;
      }

      const assetId = source.slice(figmaAssetPrefix.length);
      return resolveFigmaAssetFile(assetId);
    },
  };
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ["**/*.svg", "**/*.csv"],
});
