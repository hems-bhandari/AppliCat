import { Inter, Roboto, Katibeh } from "next/font/google";

export const inter = Inter({
    subsets: ["latin"],
    weight: ["400"],
});

export const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "500"],
});

export const katibeh = Katibeh({
    subsets: ["latin"],
    weight: ["400"],
    adjustFontFallback: false
})
