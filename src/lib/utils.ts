import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function extractYouTubeId(url: string) {
    const regExp = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^\s&]+)/;
    const match = url.match(regExp);
    return match ? match[1] : "";
}