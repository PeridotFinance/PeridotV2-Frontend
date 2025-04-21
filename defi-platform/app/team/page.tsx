"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Twitter, Linkedin, Globe, Mail } from "lucide-react"
import { motion } from "framer-motion"

// Team member type
type TeamMember = {
  id: string
  name: string
  role: string
  bio: string
  skills: string[]
  image: string
  social: {
    twitter?: string
    github?: string
    linkedin?: string
    website?: string
    email?: string
  }
}

// Team members data
const teamMembers: TeamMember[] = [
  {
    id: "alex-chen",
    name: "Alex Chen",
    role: "Founder & CEO",
    bio: "Former lead developer at a top DeFi protocol with 8+ years in blockchain development. Alex has contributed to multiple open-source projects and led the development of innovative cross-chain solutions.",
    skills: ["Solidity", "Rust", "Cross-Chain Architecture", "DeFi Protocols", "Smart Contract Security"],
    image: "alex-chen",
    social: {
      twitter: "https://twitter.com/alexchen",
      github: "https://github.com/alexchen",
      linkedin: "https://linkedin.com/in/alexchen",
    },
  },
  {
    id: "sarah-johnson",
    name: "Sarah Johnson",
    role: "CTO",
    bio: "Cryptography expert and smart contract security specialist with a background in distributed systems. Sarah previously worked at a leading blockchain security firm where she audited protocols securing billions in TVL.",
    skills: ["Cryptography", "Zero-Knowledge Proofs", "Smart Contract Auditing", "Distributed Systems", "Solidity"],
    image: "sarah-johnson",
    social: {
      twitter: "https://twitter.com/sarahjohnson",
      github: "https://github.com/sarahjohnson",
      linkedin: "https://linkedin.com/in/sarahjohnson",
    },
  },
  {
    id: "michael-rodriguez",
    name: "Michael Rodriguez",
    role: "Head of Research",
    bio: "PhD in Financial Economics with expertise in market design and algorithmic pricing mechanisms. Michael's research on automated market makers has been published in top academic journals.",
    skills: ["Financial Modeling", "Market Design", "Algorithmic Pricing", "Economic Research", "Data Analysis"],
    image: "michael-rodriguez",
    social: {
      twitter: "https://twitter.com/michaelrodriguez",
      linkedin: "https://linkedin.com/in/michaelrodriguez",
      website: "https://michaelrodriguez.com",
    },
  },
  {
    id: "emma-wilson",
    name: "Emma Wilson",
    role: "Head of Community",
    bio: "Community builder with experience growing several successful DAO communities in DeFi. Emma has a background in digital marketing and community management for Web3 projects.",
    skills: ["Community Building", "DAO Governance", "Social Media Strategy", "Content Creation", "Event Management"],
    image: "emma-wilson",
    social: {
      twitter: "https://twitter.com/emmawilson",
      linkedin: "https://linkedin.com/in/emmawilson",
      email: "emma@crosslend.com",
    },
  },
  {
    id: "david-park",
    name: "David Park",
    role: "Lead Smart Contract Engineer",
    bio: "Solidity expert who has audited and developed protocols securing billions in TVL. David specializes in gas optimization and secure smart contract architecture.",
    skills: ["Solidity", "EVM", "Gas Optimization", "Smart Contract Architecture", "Security Auditing"],
    image: "david-park",
    social: {
      github: "https://github.com/davidpark",
      linkedin: "https://linkedin.com/in/davidpark",
      twitter: "https://twitter.com/davidpark",
    },
  },
  {
    id: "sophia-martinez",
    name: "Sophia Martinez",
    role: "Cross-Chain Architect",
    bio: "Specialized in cross-chain messaging protocols and interoperability solutions. Sophia has contributed to several bridge protocols and has deep expertise in secure cross-chain communication.",
    skills: ["Cross-Chain Messaging", "Bridge Architecture", "Solidity", "Rust", "Protocol Design"],
    image: "sophia-martinez",
    social: {
      github: "https://github.com/sophiamartinez",
      twitter: "https://twitter.com/sophiamartinez",
      linkedin: "https://linkedin.com/in/sophiamartinez",
    },
  },
  {
    id: "james-taylor",
    name: "James Taylor",
    role: "Product Lead",
    bio: "Former product manager at a leading crypto exchange with a focus on user experience. James has a track record of building intuitive and accessible DeFi products.",
    skills: ["Product Management", "UX Design", "Market Research", "Agile Methodology", "DeFi Product Strategy"],
    image: "james-taylor",
    social: {
      linkedin: "https://linkedin.com/in/jamestaylor",
      twitter: "https://twitter.com/jamestaylor",
      website: "https://jamestaylor.com",
    },
  },
  {
    id: "olivia-brown",
    name: "Olivia Brown",
    role: "Head of Operations",
    bio: "Operations specialist with experience scaling DeFi startups from concept to market leaders. Olivia has a background in finance and business development.",
    skills: ["Operations Management", "Business Development", "Strategic Planning", "Team Leadership", "Finance"],
    image: "olivia-brown",
    social: {
      linkedin: "https://linkedin.com/in/oliviabrown",
      email: "olivia@crosslend.com",
      twitter: "https://twitter.com/oliviabrown",
    },
  },
]

// Social icon component
const SocialIcon = ({ type, url }: { type: string; url: string }) => {
  const icons = {
    twitter: <Twitter className="h-4 w-4" />,
    github: <Github className="h-4 w-4" />,
    linkedin: <Linkedin className="h-4 w-4" />,
    website: <Globe className="h-4 w-4" />,
    email: <Mail className="h-4 w-4" />,
  }

  const getHref = (type: string, url: string) => {
    if (type === "email") return `mailto:${url}`
    return url
  }

  return (
    <Link
      href={getHref(type, url)}
      target="_blank"
      rel="noopener noreferrer"
      className="text-text/60 hover:text-primary transition-colors"
    >
      {icons[type]}
    </Link>
  )
}

// Team member card component
const TeamMemberCard = ({ member, index }: { member: TeamMember; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="bg-card border-border/50 overflow-hidden h-full group">
        <div className="relative">
          <div className="aspect-square overflow-hidden">
            <Image
              src={`/abstract-geometric-shapes.png?height=400&width=400&query=${member.name}`}
              alt={member.name}
              width={400}
              height={400}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
            <div className="p-4 w-full">
              <div className="flex justify-center space-x-3">
                {Object.entries(member.social).map(([type, url]) => (
                  <motion.div
                    key={type}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <SocialIcon type={type} url={url} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-1">{member.name}</h3>
          <p className="text-primary text-sm mb-3">{member.role}</p>
          <p className="text-text/70 text-sm mb-4">{member.bio}</p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {member.skills.slice(0, 3).map((skill) => (
              <span key={skill} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                {skill}
              </span>
            ))}
            {member.skills.length > 3 && (
              <span className="text-xs px-2 py-1 bg-secondary/30 text-text/70 rounded-full">
                +{member.skills.length - 3} more
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function TeamPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 hero-gradient">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Meet Our <span className="gradient-text">Team</span>
            </motion.h1>
            <motion.p
              className="text-lg text-text/80 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              The passionate individuals building the future of cross-chain DeFi lending and borrowing.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Team Values Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-text/70">The core principles that guide our team and shape the CrossLend platform.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-card border border-border/50 rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-text/70">
                We constantly push the boundaries of what's possible in DeFi, pioneering new solutions for cross-chain
                interoperability and capital efficiency.
              </p>
            </motion.div>

            <motion.div
              className="bg-card border border-border/50 rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Security</h3>
              <p className="text-text/70">
                We prioritize the security of user funds above all else, implementing rigorous testing, audits, and
                conservative risk parameters.
              </p>
            </motion.div>

            <motion.div
              className="bg-card border border-border/50 rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Accessibility</h3>
              <p className="text-text/70">
                We believe DeFi should be accessible to everyone, designing intuitive interfaces and educational
                resources to lower the barrier to entry.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
