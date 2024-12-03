"use client"

import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export const NavBar = () => {
    const active = usePathname()
  return (
    <div>
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <span className="text-xl font-bold text-primary">StudentFinance</span>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    <a href="/" className={cn("border-primary text-gray-900 inline-flex items-center px-1 pt-1  text-sm font-medium", active === "/"?"border-b-2":"")}>
                      Dashboard
                    </a>
                    <a href="/expenses" className={cn("border-primary text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1  text-sm font-medium" , active === "/expenses"?"border-b-2":"")}>
                      Expenses
                    </a>
                    <a href="/income" className={cn("border-primary text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1  text-sm font-medium" , active === "/income"?"border-b-2":"")}>
                      Income
                    </a>
                    <a href="/budget" className={cn("border-primary text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1  text-sm font-medium" , active === "/budget"?"border-b-2":"")}>
                      Budget
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <a href="/notifications" className="text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </nav>
    </div>
  )
}
