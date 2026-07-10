"use client"

import { useState } from "react"
import { X, Search as SearchIcon } from "lucide-react"
import { useRouter } from "next/navigation"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const router = useRouter()

  if (!isOpen) return null

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
      if (query.trim()) {
      onClose()
      router.push(`/blog?search=${encodeURIComponent(query.trim())}`)
      setQuery("")
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl p-4 relative shadow-2xl animate-fade-up">
        <form onSubmit={handleSearch} className="flex items-center">
          <SearchIcon size={24} className="text-gray-400 ml-4" />
          <input
            type="text"
            placeholder="Search stories, destinations, insights..."
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-6 py-4 text-lg border-none focus:outline-none focus:ring-0 font-sans bg-transparent"
          />
          <button 
            type="button"
            onClick={onClose}
            className="p-4 text-gray-400 hover:text-black transition-colors"
          >
            <X size={24} />
          </button>
        </form>
      </div>
    </div>
  )
}
