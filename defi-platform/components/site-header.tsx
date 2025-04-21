"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useReducedMotion } from "@/lib/use-reduced-motion"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isLowPerfDevice } = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Remove animation initially for better iOS compatibility
  const headerVariants = {
    initial: { opacity: 1, y: 0 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5 } 
    },
  }

  const floatingAnimation = !isLowPerfDevice ? {
    y: [0, -5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    }
  } : {}

  const logoVariants = {
    initial: { opacity: 1, scale: 1 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  }

  return (
    <motion.header
      className={`fixed top-0 z-[100] transition-all duration-300 
        lg:max-w-[96%] w-full lg:left-[2%] lg:right-[2%] lg:mt-4 rounded-2xl backdrop-blur-md shadow-lg
        ${isScrolled ? "bg-background/95" : "bg-background/80"}`}
      initial="initial"
      animate="animate"
      variants={isLowPerfDevice ? {} : headerVariants}
      {...floatingAnimation}
      style={{
        WebkitTransform: 'translateZ(0)',
        WebkitBackfaceVisibility: 'hidden',
        boxShadow: '0 8px 32px -4px rgba(0, 0, 0, 0.1), 0 4px 16px -2px rgba(0, 0, 0, 0.06)',
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <motion.div className="flex items-center" variants={isLowPerfDevice ? {} : logoVariants}>
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative w-8 h-8 md:w-10 md:h-10">
                <Image src="/logo.svg" alt="Peridot Logo" width={40} height={40} className="object-contain" />
              </div>
              <span className="text-xl md:text-2xl font-bold gradient-text">Peridot</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/app" className="text-text/80 hover:text-primary transition-colors">
              App
            </Link>
            <Link href="/how-it-works" className="text-text/80 hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link href="/docs" className="text-text/80 hover:text-primary transition-colors">
              Docs
            </Link>
            <Link href="/blog" className="text-text/80 hover:text-primary transition-colors">
              Blog
            </Link>
            <Link href="/faq" className="text-text/80 hover:text-primary transition-colors">
              FAQ
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Button asChild variant="outline" size="sm" className="rounded-xl">
              <Link href="/app">Connect Wallet</Link>
            </Button>
            <Button asChild size="sm" className="bg-primary text-background hover:bg-primary/90 rounded-xl">
              <Link href="/app">Launch App</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="text-text/80 hover:text-primary transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden bg-background/95 backdrop-blur-md shadow-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/app"
                className="text-text/80 hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                App
              </Link>
              <Link
                href="/how-it-works"
                className="text-text/80 hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="https://peridot-finance.gitbook.io/peridot-protocol/introduction/why-cross-chain-defi"
                className="text-text/80 hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Docs
              </Link>
              <Link
                href="/blog"
                className="text-text/80 hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/faq"
                className="text-text/80 hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <div className="flex flex-col space-y-2 pt-2">
                <div className="flex justify-start py-2">
                  <ThemeToggle />
                </div>
                <Button asChild variant="outline" size="sm" className="rounded-xl w-full">
                  <Link href="/app" onClick={() => setIsMenuOpen(false)}>
                    Connect Wallet
                  </Link>
                </Button>
                <Button asChild size="sm" className="bg-primary text-background hover:bg-primary/90 rounded-xl w-full">
                  <Link href="/app" onClick={() => setIsMenuOpen(false)}>
                    Launch App
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
