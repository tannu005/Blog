import type { Metadata } from "next"
import { Playfair_Display, Inter, Dancing_Script } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-script",
})

export const metadata: Metadata = {
  title: "Kuldeep Insights | Explore. Learn. Inspire.",
  description: "Travel. Life. Lessons. Motivation. Real stories from real experiences, shared to inspire your journey.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${inter.variable} ${dancingScript.variable} font-sans antialiased bg-[#F4F7F9] text-[#1A1A1A] min-h-screen flex flex-col overflow-x-hidden w-full`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
