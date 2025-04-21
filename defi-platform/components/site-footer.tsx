import Link from "next/link"
import Image from "next/image"
import { Github, Twitter, DiscIcon as Discord, Linkedin } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-muted/50 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative w-10 h-10">
                <Image src="/logo.svg" alt="Peridot Logo" width={40} height={40} className="object-contain" />
              </div>
              <span className="text-2xl font-bold gradient-text">Peridot</span>
            </div>
            <p className="text-text/70 mb-6 max-w-md">
              A decentralized cross-chain lending and borrowing platform that enables users to earn interest on their
              crypto assets and borrow against their collateral.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text/60 hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text/60 hover:text-primary transition-colors"
                aria-label="Discord"
              >
                <Discord className="h-5 w-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text/60 hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text/60 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Platform</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/app" className="text-text/70 hover:text-primary transition-colors">
                  App
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-text/70 hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/whitepaper" className="text-text/70 hover:text-primary transition-colors">
                  Whitepaper
                </Link>
              </li>
              <li>
                <Link href="/governance" className="text-text/70 hover:text-primary transition-colors">
                  Governance
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/docs" className="text-text/70 hover:text-primary transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-text/70 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-text/70 hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/developers" className="text-text/70 hover:text-primary transition-colors">
                  Developers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-text/70 hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-text/70 hover:text-primary transition-colors">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-text/70 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-text/70 hover:text-primary transition-colors">
                  Press
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/30 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-text/60 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Peridot Protocol. All rights reserved.
            </div>

          </div>
        </div>
      </div>
    </footer>
  )
}
