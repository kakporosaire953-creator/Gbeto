import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest { return { name:"Gbéto", short_name:"Gbéto", description:"Le marché qui nous rassemble", start_url:"/", display:"standalone", background_color:"#FAF7F1", theme_color:"#1B1F3D", lang:"fr" }; }
