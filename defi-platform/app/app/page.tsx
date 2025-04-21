"use client"

import { TooltipTrigger } from "@/components/ui/tooltip"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Plus,
  Info,
  WalletIcon,
  BarChart3,
  LineChart,
  RefreshCw,
  Search,
  Filter,
  X,
  Eye,
  Globe,
} from "lucide-react"
import Image from "next/image"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { useWallet } from "@/components/wallet/wallet-provider"
import { ConnectWalletButton } from "@/components/wallet/connect-wallet-button"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

// Define the types for our data
type Asset = {
  id: string
  name: string
  symbol: string
  icon: string
  apy: number
  wallet: string
  collateral?: boolean
  liquidity?: string
  change24h?: number
  price?: number
  marketCap?: string
  volume24h?: string
}

// Sample data for supply markets
const supplyMarkets: Asset[] = [
  {
    id: "dai",
    name: "Dai",
    symbol: "DAI",
    icon: "dai",
    apy: 2.79,
    wallet: "0 DAI",
    collateral: true,
    change24h: 0.12,
    price: 1.0,
    marketCap: "$5.2B",
    volume24h: "$142M",
  },
  {
    id: "eth",
    name: "Ether",
    symbol: "ETH",
    icon: "eth",
    apy: 0.02,
    wallet: "0 ETH",
    collateral: true,
    change24h: 2.34,
    price: 3521.48,
    marketCap: "$423B",
    volume24h: "$18.7B",
  },
  {
    id: "tusd",
    name: "TrueUSD",
    symbol: "TUSD",
    icon: "tusd",
    apy: 3.09,
    wallet: "0 TUSD",
    collateral: false,
    change24h: -0.05,
    price: 0.999,
    marketCap: "$1.2B",
    volume24h: "$87M",
  },
  {
    id: "usdc",
    name: "USD Coin",
    symbol: "USDC",
    icon: "usdc",
    apy: 1.47,
    wallet: "0 USDC",
    collateral: true,
    change24h: 0.01,
    price: 1.0,
    marketCap: "$28.4B",
    volume24h: "$2.1B",
  },
  {
    id: "usdp",
    name: "Pax Dollar",
    symbol: "USDP",
    icon: "usdp",
    apy: 12.42,
    wallet: "0 USDP",
    collateral: false,
    change24h: 0.03,
    price: 1.0,
    marketCap: "$945M",
    volume24h: "$32M",
  },
  {
    id: "usdt",
    name: "Tether",
    symbol: "USDT",
    icon: "usdt",
    apy: 2.18,
    wallet: "0 USDT",
    collateral: false,
    change24h: 0.02,
    price: 1.0,
    marketCap: "$83.2B",
    volume24h: "$42.5B",
  },
]

// Sample data for borrow markets
const borrowMarkets: Asset[] = [
  {
    id: "aave",
    name: "Aave Token",
    symbol: "AAVE",
    icon: "aave",
    apy: 10.59,
    wallet: "0 AAVE",
    liquidity: "$136k",
    change24h: 3.42,
    price: 92.15,
    marketCap: "$1.3B",
    volume24h: "$98M",
  },
  {
    id: "bat",
    name: "Basic Attention Token",
    symbol: "BAT",
    icon: "bat",
    apy: 2.57,
    wallet: "0 BAT",
    liquidity: "$87k",
    change24h: -1.24,
    price: 0.21,
    marketCap: "$315M",
    volume24h: "$28M",
  },
  {
    id: "comp",
    name: "Compound Governance Token",
    symbol: "COMP",
    icon: "comp",
    apy: 2.79,
    wallet: "0 COMP",
    liquidity: "$0k",
    change24h: 1.87,
    price: 47.32,
    marketCap: "$378M",
    volume24h: "$42M",
  },
  {
    id: "dai",
    name: "Dai",
    symbol: "DAI",
    icon: "dai",
    apy: 4.6,
    wallet: "0 DAI",
    liquidity: "$15.33M",
    change24h: 0.12,
    price: 1.0,
    marketCap: "$5.2B",
    volume24h: "$142M",
  },
  {
    id: "eth",
    name: "Ether",
    symbol: "ETH",
    icon: "eth",
    apy: 2.27,
    wallet: "0 ETH",
    liquidity: "$13.82M",
    change24h: 2.34,
    price: 3521.48,
    marketCap: "$423B",
    volume24h: "$18.7B",
  },
  {
    id: "link",
    name: "ChainLink Token",
    symbol: "LINK",
    icon: "link",
    apy: 3.02,
    wallet: "0 LINK",
    liquidity: "$92k",
    change24h: 4.21,
    price: 13.87,
    marketCap: "$8.1B",
    volume24h: "$412M",
  },
]

// Sample chart data
const generateChartData = (days = 30, volatility = 0.1, uptrend = true) => {
  const data = []
  let value = 100

  for (let i = 0; i < days; i++) {
    const change = uptrend
      ? Math.random() * volatility - volatility * 0.3
      : Math.random() * volatility - volatility * 0.7

    value = Math.max(value * (1 + change), 10)
    data.push({ day: i, value: value })
  }

  return data
}

// Component for animated number counter
const AnimatedCounter = ({ value, prefix = "", suffix = "", duration = 1 }) => {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let startTime = null
    let animationFrame = null

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)

      setDisplayValue(Math.floor(progress * value))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [value, duration])

  return (
    <span>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  )
}

// Mini chart component
const MiniChart = ({ data, color = "#22c55e", height = 40, width = 100 }) => {
  const pathRef = useRef(null)
  const isInView = useInView(pathRef, { once: true })

  // Normalize data for the chart
  const maxValue = Math.max(...data.map((d) => d.value))
  const minValue = Math.min(...data.map((d) => d.value))
  const range = maxValue - minValue

  // Create SVG path
  const createPath = () => {
    const points = data.map((d, i) => {
      const x = (i / (data.length - 1)) * width
      const y = height - ((d.value - minValue) / range) * height
      return `${x},${y}`
    })

    return `M${points.join(" L")}`
  }

  return (
    <svg width={width} height={height} className="overflow-visible">
      <motion.path
        ref={pathRef}
        d={createPath()}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
    </svg>
  )
}

// Animated card component
const AnimatedCard = ({ children, delay = 0, ...props }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ y: 20, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Interactive donut chart component
const DonutChart = ({ value, max = 100, size = 120, strokeWidth = 10, color = "var(--primary)" }) => {
  const percentage = (value / max) * 100
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference
  const [displayPercentage, setDisplayPercentage] = useState(0)

  useEffect(() => {
    let startTime = null
    let animationFrame = null

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / 1500, 1)

      setDisplayPercentage(Math.round(progress * percentage))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [percentage])

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rotate-[-90deg]">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--secondary)"
          strokeWidth={strokeWidth}
        />

        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          strokeLinecap="round"
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold">{displayPercentage}%</span>
      </div>
    </div>
  )
}

// Interactive asset row component
const AssetRow = ({ asset, isSupply = true, onClick }) => {
  const [isHovered, setIsHovered] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const chartData = generateChartData(30, 0.05, asset.change24h > 0)
  const chartColor = asset.change24h > 0 ? "#22c55e" : "#ef4444"

  return (
    <motion.tr
      className="cursor-pointer relative group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{
        backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
        transition: { duration: 0.2 },
      }}
      layout
    >
      <TableCell className="relative">
        <div className="flex items-center space-x-3">
          <motion.div
            className="w-10 h-10 rounded-full flex items-center justify-center relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-sm"></div>
            <div className="absolute inset-0 bg-card rounded-full"></div>
            <Image
              src={`/placeholder.svg?height=40&width=40&query=${asset.name}`}
              alt={asset.name}
              width={32}
              height={32}
              className="relative z-10"
            />
          </motion.div>
          <div>
            <div className="font-medium">{asset.name}</div>
            <div className="text-xs text-text/60">{asset.symbol}</div>
          </div>
        </div>

        {/* Hover effect line */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary rounded-full"
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isHovered ? "100%" : "0%",
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        />
      </TableCell>

      <TableCell>
        <div className="flex flex-col">
          <div className="font-medium">{asset.apy}%</div>
          <div className="text-xs text-text/60">APY</div>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex items-center space-x-2">
          <div>{asset.wallet}</div>
          {isHovered && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                <Plus className="h-3 w-3" />
              </Button>
            </motion.div>
          )}
        </div>
      </TableCell>

      {isSupply ? (
        <TableCell>
          <div className="flex items-center">
            <motion.div
              className={cn(
                "w-12 h-6 bg-secondary/20 rounded-full flex items-center",
                asset.collateral ? "justify-start pl-1" : "justify-end pr-1",
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className={cn("w-4 h-4 rounded-full", asset.collateral ? "bg-primary" : "bg-muted")}
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </motion.div>
          </div>
        </TableCell>
      ) : (
        <TableCell>
          <div className="flex items-center space-x-2">
            <div>{asset.liquidity}</div>
            <MiniChart data={chartData} color={chartColor} />
          </div>
        </TableCell>
      )}

      <TableCell className="opacity-0 group-hover:opacity-100 transition-opacity">
        <motion.div initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.2 }}>
          <Button variant="ghost" size="sm" className="h-8 rounded-full">
            <ArrowRight className="h-4 w-4 mr-1" />
            {isSupply ? "Supply" : "Borrow"}
          </Button>
        </motion.div>
      </TableCell>
    </motion.tr>
  )
}

// Asset detail modal component
const AssetDetailCard = ({ asset, onClose, isSupply = true }) => {
  const chartData = generateChartData(30, 0.05, asset.change24h > 0)
  const chartColor = asset.change24h > 0 ? "#22c55e" : "#ef4444"

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-card border border-border/50 rounded-xl shadow-xl w-full max-w-2xl overflow-hidden"
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Image
                  src={`/placeholder.svg?height=48&width=48&query=${asset.name}`}
                  alt={asset.name}
                  width={36}
                  height={36}
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">{asset.name}</h3>
                <div className="text-sm text-text/60">{asset.symbol}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium flex items-center",
                  asset.change24h > 0 ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500",
                )}
              >
                {asset.change24h > 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {asset.change24h > 0 ? "+" : ""}
                {asset.change24h}%
              </div>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <h4 className="text-sm font-medium text-text/60 mb-1">Current Price</h4>
              <div className="text-2xl font-bold">${asset.price.toLocaleString()}</div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h4 className="text-sm font-medium text-text/60 mb-1">Market Cap</h4>
                <div className="font-medium">{asset.marketCap}</div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-text/60 mb-1">24h Volume</h4>
                <div className="font-medium">{asset.volume24h}</div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-medium text-text/60 mb-3">APY</h4>
              <div className="flex items-center space-x-3">
                <DonutChart value={asset.apy} max={15} color="var(--primary)" />
                <div>
                  <div className="text-2xl font-bold">{asset.apy}%</div>
                  <div className="text-sm text-text/60">Annual Percentage Yield</div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-text/60 mb-2">
                {isSupply ? "Collateral Factor" : "Liquidity Available"}
              </h4>
              {isSupply ? (
                <div className="flex items-center space-x-3">
                  <div
                    className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium",
                      asset.collateral ? "bg-primary/10 text-primary" : "bg-muted/50 text-text/60",
                    )}
                  >
                    {asset.collateral ? "Enabled" : "Disabled"}
                  </div>
                  <div className="text-sm text-text/60">
                    {asset.collateral
                      ? "This asset can be used as collateral"
                      : "This asset cannot be used as collateral"}
                  </div>
                </div>
              ) : (
                <div className="text-lg font-medium">{asset.liquidity}</div>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-text/60 mb-4">Price History (30 Days)</h4>
            <div className="h-[200px] w-full bg-card/50 rounded-lg border border-border/50 p-4 flex items-center justify-center">
              <MiniChart data={chartData} color={chartColor} height={150} width={300} />
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-medium text-text/60 mb-3">{isSupply ? "Supply" : "Borrow"} Amount</h4>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="0.00"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                    MAX
                  </Button>
                  <span className="text-sm font-medium">{asset.symbol}</span>
                </div>
              </div>

              <Button className="w-full mt-4 bg-primary text-background hover:bg-primary/90">
                {isSupply ? "Supply" : "Borrow"} {asset.symbol}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function AppPage() {
  const [supplyBalance] = useState("$0")
  const [borrowBalance] = useState("$0")
  const [netAPY] = useState("0%")
  const [borrowLimit] = useState(0)
  const { isConnected, address, chainType } = useWallet()
  const [selectedAsset, setSelectedAsset] = useState(null)
  const [isSupplySelected, setIsSupplySelected] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState("supply")
  const [showFilters, setShowFilters] = useState(false)
  const isMobile = useMobile()

  // Refresh data animation
  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  // Handle asset selection
  const handleAssetClick = (asset, isSupply) => {
    setSelectedAsset(asset)
    setIsSupplySelected(isSupply)
  }

  // Close asset detail modal
  const handleCloseAssetDetail = () => {
    setSelectedAsset(null)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Overview */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatedCard delay={0.1}>
            <Card className="bg-card border-border/50 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-primary flex items-center">
                  Supply Balance
                  <motion.div
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.3 }}
                    className="ml-auto cursor-pointer"
                    onClick={handleRefresh}
                  >
                    <RefreshCw
                      className={cn(
                        "h-4 w-4 text-text/40 hover:text-primary transition-colors",
                        isRefreshing && "animate-spin",
                      )}
                    />
                  </motion.div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div
                  className="text-3xl font-bold"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {supplyBalance}
                </motion.div>
                <div className="mt-2 flex items-center text-xs text-text/60">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  <span className="text-green-500">+0.00%</span>
                  <span className="ml-1">last 24h</span>
                </div>
              </CardContent>

              {/* Interactive hover effect */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-primary/50"
                initial={{ scaleX: 0, originX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Card>
          </AnimatedCard>

          <AnimatedCard delay={0.2}>
            <Card className="bg-card border-border/50 relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-center">Net APY</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <motion.div
                  className="relative"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
                >
                  <div className="w-24 h-24 rounded-full border-4 border-primary/30 flex items-center justify-center relative">
                    <div className="absolute inset-0 rounded-full border-4 border-primary animate-pulse opacity-30"></div>
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-primary"
                      style={{
                        borderTopColor: "transparent",
                        borderRightColor: "transparent",
                      }}
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    />
                    <div className="text-xl font-bold flex items-center">
                      <AnimatedCounter value={0} suffix="%" duration={1.5} />
                      <Sparkles className="h-4 w-4 ml-1 text-primary" />
                    </div>
                  </div>
                </motion.div>
              </CardContent>

              {/* Interactive hover effect */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-primary/50"
                initial={{ scaleX: 0, originX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Card>
          </AnimatedCard>

          <AnimatedCard delay={0.3}>
            <Card className="bg-card border-border/50 relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-right text-primary flex items-center justify-end">
                  <motion.div
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.3 }}
                    className="mr-auto cursor-pointer"
                    onClick={handleRefresh}
                  >
                    <RefreshCw
                      className={cn(
                        "h-4 w-4 text-text/40 hover:text-primary transition-colors",
                        isRefreshing && "animate-spin",
                      )}
                    />
                  </motion.div>
                  Borrow Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div
                  className="text-3xl font-bold text-right"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {borrowBalance}
                </motion.div>
                <div className="mt-2 flex items-center justify-end text-xs text-text/60">
                  <span className="mr-1">last 24h</span>
                  <span className="text-green-500">+0.00%</span>
                  <TrendingUp className="h-3 w-3 ml-1 text-green-500" />
                </div>
              </CardContent>

              {/* Interactive hover effect */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-primary/50"
                initial={{ scaleX: 0, originX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Card>
          </AnimatedCard>
        </motion.div>

        {/* Borrow Limit */}
        <AnimatedCard delay={0.4} className="mb-8">
          <Card className="bg-card border-border/50 p-4 relative overflow-hidden">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div className="text-sm font-medium">Borrow Limit</div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <Info className="h-4 w-4 ml-1 text-text/40 cursor-help" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs max-w-xs">
                        Your borrow limit is determined by the value of your supplied assets that are enabled as
                        collateral.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="text-sm">{borrowBalance}</div>
            </div>

            <div className="relative h-2 mb-1">
              <div className="absolute inset-0 bg-secondary/30 rounded-full"></div>
              <motion.div
                className="absolute inset-y-0 left-0 bg-primary rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${borrowLimit}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />

              {/* Animated markers */}
              {[25, 50, 75].map((marker) => (
                <motion.div
                  key={marker}
                  className="absolute top-0 bottom-0 w-0.5 bg-text/20"
                  style={{ left: `${marker}%` }}
                  initial={{ height: 0 }}
                  animate={{ height: "100%" }}
                  transition={{ duration: 0.5, delay: 0.7 + marker / 100 }}
                />
              ))}

              {/* Animated limit indicator */}
              <motion.div
                className="absolute -top-1 w-4 h-4 bg-primary rounded-full shadow-lg"
                style={{ left: `${borrowLimit}%`, marginLeft: "-8px" }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15, delay: 1 }}
              />
            </div>

            <div className="flex justify-between text-xs text-text/60">
              <div>0%</div>
              <div>Safe: 0-80%</div>
              <div className="text-yellow-500">Warning: 80-90%</div>
              <div className="text-red-500">Risk: 90-100%</div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          </Card>
        </AnimatedCard>

        {/* Connected Wallet Info */}
        {isConnected && address && (
          <AnimatedCard delay={0.5} className="mb-8">
            <Card className="bg-card border-border/50 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"></div>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center">
                    <motion.div
                      className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3 relative overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full animate-pulse"></div>
                      {chainType === "ethereum" ||
                      chainType === "polygon" ||
                      chainType === "avalanche" ||
                      chainType === "bsc" ? (
                        <Image
                          src={`/placeholder.svg?height=40&width=40&query=${chainType}`}
                          alt={chainType || ""}
                          width={40}
                          height={40}
                          className="w-6 h-6 relative z-10"
                        />
                      ) : chainType === "solana" ? (
                        <Image
                          src="/glowing-solana-network.png"
                          alt="Solana"
                          width={40}
                          height={40}
                          className="w-6 h-6 relative z-10"
                        />
                      ) : null}
                    </motion.div>
                    <div>
                      <div className="text-sm text-text/60">Connected Wallet</div>
                      <div className="font-medium flex items-center">
                        <span>
                          {address.substring(0, 6)}...{address.substring(address.length - 4)}
                        </span>
                        <motion.div
                          className="ml-2 w-2 h-2 rounded-full bg-green-500"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="rounded-full">
                      <Eye className="h-4 w-4 mr-1" />
                      View on Explorer
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-full">
                      <Globe className="h-4 w-4 mr-1" />
                      Switch Network
                    </Button>
                  </div>
                </div>
              </CardContent>

              {/* Animated border effect */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scaleX: [0.9, 1, 0.9],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              />
            </Card>
          </AnimatedCard>
        )}

        {/* Markets */}
        <AnimatedCard delay={0.6}>
          <Card className="bg-card border-border/50 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-30"></div>

            <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-border/50">
              <div>
                <h2 className="text-xl font-bold mb-1">Markets</h2>
                <p className="text-sm text-text/60">Supply or borrow assets from the protocol</p>
              </div>

              <div className="flex items-center space-x-2 mt-3 sm:mt-0">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search assets..."
                    className="pl-8 pr-4 py-2 text-sm rounded-full bg-background/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-auto"
                  />
                  <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text/40" />
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-1" />
                  Filters
                </Button>

                <Button variant="ghost" size="icon" className="rounded-full" onClick={handleRefresh}>
                  <RefreshCw className={cn("h-4 w-4 text-text/60", isRefreshing && "animate-spin")} />
                </Button>
              </div>
            </div>

            {/* Filters panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  className="p-4 border-b border-border/50 bg-background/50"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Sort By</label>
                      <select className="w-full p-2 rounded-md bg-background border border-border/50">
                        <option>Highest APY</option>
                        <option>Lowest APY</option>
                        <option>Name (A-Z)</option>
                        <option>Market Size</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1 block">Asset Type</label>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="rounded-full text-xs">
                          All
                        </Button>
                        <Button variant="ghost" size="sm" className="rounded-full text-xs">
                          Stablecoins
                        </Button>
                        <Button variant="ghost" size="sm" className="rounded-full text-xs">
                          Tokens
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1 block">Collateral</label>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="rounded-full text-xs">
                          All
                        </Button>
                        <Button variant="ghost" size="sm" className="rounded-full text-xs">
                          Enabled
                        </Button>
                        <Button variant="ghost" size="sm" className="rounded-full text-xs">
                          Disabled
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <Tabs defaultValue="supply" className="w-full" value={activeTab} onValueChange={setActiveTab}>
              <div className="px-4 pt-4">
                <TabsList className="grid grid-cols-2 mb-6 relative">
                  <TabsTrigger value="supply" className="relative z-10">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Supply Markets
                  </TabsTrigger>
                  <TabsTrigger value="borrow" className="relative z-10">
                    <LineChart className="h-4 w-4 mr-2" />
                    Borrow Markets
                  </TabsTrigger>

                  {/* Animated background for selected tab */}
                  <motion.div
                    className="absolute inset-0 bg-muted rounded-md z-0"
                    initial={false}
                    animate={{
                      x: activeTab === "supply" ? 0 : "50%",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{ width: "50%" }}
                  />
                </TabsList>
              </div>

              <TabsContent value="supply" className="mt-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Asset</TableHead>
                        <TableHead>APY</TableHead>
                        <TableHead>Wallet</TableHead>
                        <TableHead>Collateral</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <AnimatePresence>
                        {supplyMarkets.map((asset) => (
                          <AssetRow
                            key={asset.id}
                            asset={asset}
                            isSupply={true}
                            onClick={() => handleAssetClick(asset, true)}
                          />
                        ))}
                      </AnimatePresence>
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="borrow" className="mt-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Asset</TableHead>
                        <TableHead>APY</TableHead>
                        <TableHead>Wallet</TableHead>
                        <TableHead>Liquidity</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <AnimatePresence>
                        {borrowMarkets.map((asset) => (
                          <AssetRow
                            key={asset.id}
                            asset={asset}
                            isSupply={false}
                            onClick={() => handleAssetClick(asset, false)}
                          />
                        ))}
                      </AnimatePresence>
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>

            {/* Decorative elements */}
            <div className="absolute -left-32 -top-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute -right-32 -bottom-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
          </Card>
        </AnimatedCard>

        {/* Connect Wallet CTA */}
        {!isConnected ? (
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Card className="bg-card border-border/50 p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10"></div>
              <div className="relative z-10">
                <motion.div
                  className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center"
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, 0, -5, 0],
                  }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <WalletIcon className="h-10 w-10 text-primary" />
                </motion.div>

                <h3 className="text-2xl font-bold mb-2">Connect Your Wallet</h3>
                <p className="text-text/70 mb-6 max-w-md mx-auto">
                  Connect your wallet to start lending and borrowing assets across multiple blockchains with Peridot.
                </p>

                <ConnectWalletButton className="bg-primary text-background hover:bg-primary/90 rounded-full px-8" />
              </div>

              {/* Decorative elements */}
              <div className="absolute -left-32 -bottom-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
              <div className="absolute -right-32 -top-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            className="flex justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Button className="bg-primary text-background hover:bg-primary/90 rounded-full group relative overflow-hidden">
              <span className="relative z-10 flex items-center">
                Supply Assets
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.div>
              </span>
              <motion.div
                className="absolute inset-0 bg-primary/80"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Button>

            <Button variant="outline" className="rounded-full group relative overflow-hidden">
              <span className="relative z-10 flex items-center">
                Borrow Assets
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.div>
              </span>
              <motion.div
                className="absolute inset-0 bg-primary/10"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </motion.div>
        )}
      </div>

      {/* Asset Detail Modal */}
      <AnimatePresence>
        {selectedAsset && (
          <AssetDetailCard asset={selectedAsset} onClose={handleCloseAssetDetail} isSupply={isSupplySelected} />
        )}
      </AnimatePresence>
    </div>
  )
}
