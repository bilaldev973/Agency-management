import Link from "next/link"
import { Stethoscope } from "lucide-react"
import { FooterSection } from "./footer-section"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 text-white mb-4">
              <Stethoscope className="h-6 w-6" />
              <span className="font-bold">ASHRAM & SON'S</span>
            </Link>
            <p className="text-sm">
              Leading healthcare recruitment agency connecting talented professionals with premier institutions across Saudi Arabia.
            </p>
          </div>

          <FooterSection title="Quick Links">
            <ul className="space-y-2 text-sm">
              <li><Link href="/jobs" className="hover:text-white">Browse Jobs</Link></li>
              <li><Link href="/apply" className="hover:text-white">Apply Now</Link></li>
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </FooterSection>

          <FooterSection title="Contact">
            <ul className="space-y-2 text-sm">
              <li>Office # 2/24</li>
              <li>4rth Floor Silk Center Near</li>
              <li>Rehamanabad Metro Station RWP</li>
              <li>hr@aasioe.com</li>
              <li>hr.umergujjar@gmail.com</li>
              <li>+92304-9009934</li>
              <li>+92309-1817632</li>
            </ul>
          </FooterSection>

          <FooterSection title="Follow Us">
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white">Twitter</a></li>
              <li><a href="#" className="hover:text-white">Facebook</a></li>
            </ul>
          </FooterSection>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-sm text-center">
            © {new Date().getFullYear()} ASHRAM & SON'S. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}