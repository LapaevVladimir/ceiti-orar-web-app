import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "@/components/providers/theme-provider"
import ConvexClientProvider from "@/app/(main)/(routes)/_components/_providers/convex-client-provider";
import {Toaster} from "sonner";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Orar',
  description: 'Better and more convenient',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
        <body className={inter.className}>
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
          >
            <ConvexClientProvider>
              <Toaster position="bottom-center" />
              {children}
            </ConvexClientProvider>
          </ThemeProvider>
        </body>
    </html>
  )
}
