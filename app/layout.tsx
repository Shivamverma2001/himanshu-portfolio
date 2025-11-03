import type { Metadata } from "next";
import { Inter, Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import CurtainMount from "./components/CurtainMount";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Himanshu Verma - Actor | Creator | Brand Storyteller",
  description: "Theatre-trained actor and brand storyteller passionate about making people smile through powerful, relatable, and memorable content.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${poppins.variable} ${playfair.variable} antialiased`}
        suppressHydrationWarning
      >
        {/* Server-rendered placeholder overlay so content is hidden before client mounts */}
        <div
          id="pre-curtain"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9998,
            background: 'linear-gradient(90deg, #ffffff 0%, #e8f2ff 40%, #3B82F6 100%)',
          }}
        />
        <Providers>
          <CurtainMount />
          {children}
        </Providers>
      </body>
    </html>
  );
}
