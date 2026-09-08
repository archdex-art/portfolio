import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { BASE_PATH } from "@/lib/base-path";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: site.description,
    start_url: `${BASE_PATH}/`,
    display: "standalone",
    theme_color: "#0b0a09",
    background_color: "#0b0a09",
  };
}
