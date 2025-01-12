import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar } from '@/components/navigation/navbar'
import { Footer } from '@/components/footer/footer'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ASHRAM & SON | Healthcare Recruitment Agency',
  description: 'Leading healthcare recruitment agency connecting talented nursing professionals with premier institutions across Saudi Arabia.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </div>
      </body>
    </html>
  )
}