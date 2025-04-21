"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useToast } from "@/components/ui/use-toast"

type WalletType = "metamask" | "phantom" | "solflare" | null
type ChainType = "ethereum" | "polygon" | "avalanche" | "solana" | "bsc" | null

interface WalletContextType {
  address: string | null
  chainId: string | null
  chainType: ChainType
  walletType: WalletType
  isConnecting: boolean
  isConnected: boolean
  connectMetaMask: () => Promise<void>
  connectPhantom: () => Promise<void>
  connectSolflare: () => Promise<void>
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  chainId: null,
  chainType: null,
  walletType: null,
  isConnecting: false,
  isConnected: false,
  connectMetaMask: async () => {},
  connectPhantom: async () => {},
  connectSolflare: async () => {},
  disconnect: () => {},
})

export const useWallet = () => useContext(WalletContext)

interface WalletProviderProps {
  children: ReactNode
}

export function WalletProvider({ children }: WalletProviderProps) {
  const [address, setAddress] = useState<string | null>(null)
  const [chainId, setChainId] = useState<string | null>(null)
  const [chainType, setChainType] = useState<ChainType>(null)
  const [walletType, setWalletType] = useState<WalletType>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const { toast } = useToast()

  // Check for existing connections on mount
  useEffect(() => {
    const checkExistingConnection = async () => {
      // Check for MetaMask connection
      if (typeof window !== "undefined" && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" })
          if (accounts.length > 0) {
            const chainId = await window.ethereum.request({ method: "eth_chainId" })
            setAddress(accounts[0])
            setChainId(chainId)
            setWalletType("metamask")
            setChainType(getChainType(chainId))
            setIsConnected(true)
          }
        } catch (error) {
          console.error("Error checking existing MetaMask connection:", error)
        }
      }

      // Check for Phantom connection
      if (typeof window !== "undefined" && window.solana) {
        try {
          const resp = await window.solana.connect({ onlyIfTrusted: true })
          if (resp.publicKey) {
            setAddress(resp.publicKey.toString())
            setChainId("solana")
            setWalletType("phantom")
            setChainType("solana")
            setIsConnected(true)
          }
        } catch (error) {
          // User hasn't connected before or has revoked access
        }
      }
    }

    checkExistingConnection()
  }, [])

  // Listen for account changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.ethereum && walletType === "metamask") {
        const handleAccountsChanged = (accounts: string[]) => {
          if (accounts.length === 0) {
            // User disconnected
            disconnect()
          } else {
            // Account changed
            setAddress(accounts[0])
          }
        }

        const handleChainChanged = (chainId: string) => {
          setChainId(chainId)
          setChainType(getChainType(chainId))
          window.location.reload()
        }

        window.ethereum.on("accountsChanged", handleAccountsChanged)
        window.ethereum.on("chainChanged", handleChainChanged)

        return () => {
          window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
          window.ethereum.removeListener("chainChanged", handleChainChanged)
        }
      }

      if (window.solana && (walletType === "phantom" || walletType === "solflare")) {
        const handleDisconnect = () => {
          disconnect()
        }

        window.solana.on("disconnect", handleDisconnect)

        return () => {
          window.solana.removeListener("disconnect", handleDisconnect)
        }
      }
    }
  }, [walletType])

  const getChainType = (chainId: string): ChainType => {
    // Convert chainId to decimal for easier comparison
    const chainIdDecimal = Number.parseInt(chainId, 16)

    switch (chainIdDecimal) {
      case 1: // Ethereum Mainnet
        return "ethereum"
      case 137: // Polygon Mainnet
        return "polygon"
      case 43114: // Avalanche C-Chain
        return "avalanche"
      case 56: // Binance Smart Chain
        return "bsc"
      default:
        return null
    }
  }

  const connectMetaMask = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      toast({
        title: "MetaMask not found",
        description: "Please install MetaMask browser extension and try again.",
        variant: "destructive",
      })
      return
    }

    setIsConnecting(true)

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
      const chainId = await window.ethereum.request({ method: "eth_chainId" })

      setAddress(accounts[0])
      setChainId(chainId)
      setWalletType("metamask")
      setChainType(getChainType(chainId))
      setIsConnected(true)

      toast({
        title: "Wallet connected",
        description: `Connected to MetaMask: ${accounts[0].substring(0, 6)}...${accounts[0].substring(
          accounts[0].length - 4,
        )}`,
      })
    } catch (error: any) {
      console.error("Error connecting to MetaMask:", error)
      toast({
        title: "Connection failed",
        description: error.message || "Failed to connect to MetaMask",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  const connectPhantom = async () => {
    if (typeof window === "undefined" || !window.solana || !window.solana.isPhantom) {
      toast({
        title: "Phantom wallet not found",
        description: "Please install Phantom wallet extension and try again.",
        variant: "destructive",
      })
      return
    }

    setIsConnecting(true)

    try {
      const resp = await window.solana.connect()
      const publicKey = resp.publicKey.toString()

      setAddress(publicKey)
      setChainId("solana")
      setWalletType("phantom")
      setChainType("solana")
      setIsConnected(true)

      toast({
        title: "Wallet connected",
        description: `Connected to Phantom: ${publicKey.substring(0, 6)}...${publicKey.substring(publicKey.length - 4)}`,
      })
    } catch (error: any) {
      console.error("Error connecting to Phantom:", error)
      toast({
        title: "Connection failed",
        description: error.message || "Failed to connect to Phantom wallet",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  const connectSolflare = async () => {
    if (typeof window === "undefined" || !window.solflare) {
      toast({
        title: "Solflare wallet not found",
        description: "Please install Solflare wallet extension and try again.",
        variant: "destructive",
      })
      return
    }

    setIsConnecting(true)

    try {
      await window.solflare.connect()
      const publicKey = window.solflare.publicKey.toString()

      setAddress(publicKey)
      setChainId("solana")
      setWalletType("solflare")
      setChainType("solana")
      setIsConnected(true)

      toast({
        title: "Wallet connected",
        description: `Connected to Solflare: ${publicKey.substring(0, 6)}...${publicKey.substring(
          publicKey.length - 4,
        )}`,
      })
    } catch (error: any) {
      console.error("Error connecting to Solflare:", error)
      toast({
        title: "Connection failed",
        description: error.message || "Failed to connect to Solflare wallet",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnect = () => {
    if (walletType === "phantom" && window.solana) {
      window.solana.disconnect()
    } else if (walletType === "solflare" && window.solflare) {
      window.solflare.disconnect()
    }

    setAddress(null)
    setChainId(null)
    setWalletType(null)
    setChainType(null)
    setIsConnected(false)

    toast({
      title: "Wallet disconnected",
      description: "Your wallet has been disconnected.",
    })
  }

  return (
    <WalletContext.Provider
      value={{
        address,
        chainId,
        chainType,
        walletType,
        isConnecting,
        isConnected,
        connectMetaMask,
        connectPhantom,
        connectSolflare,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

// Add type definitions for window
declare global {
  interface Window {
    ethereum?: any
    solana?: any
    solflare?: any
  }
}
