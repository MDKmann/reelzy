"use client"

import type React from "react"

import { Search, Filter, ArrowRight, ChevronDown } from "lucide-react"
import { useState } from "react"

export function DarkSearchBar() {
  const [query, setQuery] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedSort, setSelectedSort] = useState("DEFAULT")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Search query:", query)
  }

  const sortMovies = (filter: string) => {
    console.log(filter)
    setSelectedSort(filter)
    setIsDropdownOpen(false)

    if (filter === "YEAR_HIGH_TO_LOW") {
      console.log("Sorting by year, newest to oldest")
    }
    if (filter === "YEAR_LOW_TO_HIGH") {
      console.log("Sorting by year, oldest to newest")
    }
    if (filter === "RATING_HIGH_TO_LOW") {
      console.log("Sorting by rating, highest to lowest")
    }
    if (filter === "RATING_LOW_TO_HIGH") {
      console.log("Sorting by rating, lowest to highest")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative group">
        {/* Gradient glow border */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>

        {/* Main search container */}
        <div className="relative border bg-slate-800/90 backdrop-blur-sm rounded-2xl border-slate-700/50">
          <div className="flex items-center px-6 py-4">
            {/* Search icon */}
            <Search className="flex-shrink-0 w-6 h-6 mr-4 text-gray-400" />

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center flex-shrink-0 gap-1 p-2 mr-4 transition-colors duration-200 rounded-lg bg-slate-700/50 hover:bg-slate-600/50"
              >
                <Filter className="w-4 h-4 text-gray-400" />
                <ChevronDown
                  className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute left-0 z-50 w-64 mt-2 border shadow-xl top-full bg-slate-800/95 backdrop-blur-sm rounded-xl border-slate-700/50">
                  <div className="p-2">
                    <div className="px-3 py-2 text-xs font-medium text-gray-400">Sort Movies</div>
                    <button
                      type="button"
                      onClick={() => sortMovies("DEFAULT")}
                      disabled
                      className="w-full px-3 py-2 text-sm text-left text-gray-500 cursor-not-allowed"
                    >
                      Sort
                    </button>
                    <button
                      type="button"
                      onClick={() => sortMovies("YEAR_HIGH_TO_LOW")}
                      className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
                        selectedSort === "YEAR_HIGH_TO_LOW"
                          ? "bg-purple-500/20 text-purple-300"
                          : "text-gray-300 hover:bg-slate-700/50"
                      }`}
                    >
                      Year Released, Newest to Oldest
                    </button>
                    <button
                      type="button"
                      onClick={() => sortMovies("YEAR_LOW_TO_HIGH")}
                      className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
                        selectedSort === "YEAR_LOW_TO_HIGH"
                          ? "bg-purple-500/20 text-purple-300"
                          : "text-gray-300 hover:bg-slate-700/50"
                      }`}
                    >
                      Year Released, Oldest to Newest
                    </button>
                    <button
                      type="button"
                      onClick={() => sortMovies("RATING_HIGH_TO_LOW")}
                      className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
                        selectedSort === "RATING_HIGH_TO_LOW"
                          ? "bg-purple-500/20 text-purple-300"
                          : "text-gray-300 hover:bg-slate-700/50"
                      }`}
                    >
                      Rating, Highest to Lowest
                    </button>
                    <button
                      type="button"
                      onClick={() => sortMovies("RATING_LOW_TO_HIGH")}
                      className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
                        selectedSort === "RATING_LOW_TO_HIGH"
                          ? "bg-purple-500/20 text-purple-300"
                          : "text-gray-300 hover:bg-slate-700/50"
                      }`}
                    >
                      Rating, Lowest to Highest
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Input field */}
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What movie sounds good?"
              className="flex-1 text-lg text-white placeholder-gray-400 bg-transparent focus:outline-none"
            />

            {/* Submit button */}
            <button
              type="submit"
              className="flex-shrink-0 p-2 ml-4 transition-all duration-200 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
            >
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {isDropdownOpen && <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />}
    </form>
  )
}
