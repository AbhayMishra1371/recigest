import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Recigest - AI-Powered Recipe Discovery",
  description: "Turn your pantry ingredients into delicious meals with AI-powered recipe suggestions",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased selection:bg-[#AA4D4D]/10 selection:text-[#AA4D4D]`}>
        {children}
      </body>
    </html>
  )
}
