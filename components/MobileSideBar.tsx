'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DollarSignIcon, TrendingUpIcon, PieChartIcon, GridIcon, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const routes = [
  {
    href: '/',
    label: 'Dashboard',
    icon: GridIcon,
  },
  {
    href: '/expenses',
    label: 'Expenses',
    icon: DollarSignIcon,
  },
  {
    href: '/income',
    label: 'Income',
    icon: TrendingUpIcon,
  },
  {
    href: '/budget',
    label: 'Budget',
    icon: PieChartIcon,
  },
];

export function CustomSidebar() {
  const pathname = usePathname();

  return (
    <div className="relative md:flex md:items-start">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          >
            <Menu className="h-7  w-7" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SheetHeader>
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex items-center justify-between p-4 bg-gray-100">
              <Link href="/" className="flex items-center space-x-2">
                <GridIcon className="h-6 w-6 text-gray-700" />
                <span className="font-bold text-gray-700">StudentFinance</span>
              </Link>
            </div>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-4rem)]">
            <nav className="p-4">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    'flex items-center p-2 mb-2 rounded hover:bg-gray-100 transition-colors',
                    pathname === route.href ? 'bg-gray-200 font-semibold' : 'bg-white font-medium'
                  )}
                >
                  <route.icon className="mr-3 h-5 w-5 text-gray-700" />
                  {route.label}
                </Link>
              ))}
            </nav>
          </ScrollArea>
        </SheetContent>
      </Sheet>
      <div className="hidden md:flex flex-col bg-white shadow-lg w-64">
        <div className="flex items-center justify-between p-4 bg-gray-100">
          <Link href="/" className="flex items-center space-x-2">
            <GridIcon className="h-6 w-6 text-gray-700" />
            <span className="font-bold text-gray-700">StudentFinance</span>
          </Link>
        </div>
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <nav className="p-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  'flex items-center p-2 mb-2 rounded hover:bg-gray-100 transition-colors',
                  pathname === route.href ? 'bg-gray-200 font-semibold' : 'bg-white font-medium'
                )}
              >
                <route.icon className="mr-3 h-5 w-5 text-gray-700" />
                {route.label}
              </Link>
            ))}
          </nav>
        </ScrollArea>
      </div>
    </div>
  );
}
