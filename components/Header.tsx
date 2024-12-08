'use client';

import Link from 'next/link';
import { BanknoteIcon, PiggyBankIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCurrentUser } from '@/hooks/use-current-user';
import { CustomSidebar } from './MobileSideBar';
import { LogoutButton } from './auth/logout-button';
import { logout } from '@/actions/logout';
import { signOut } from 'next-auth/react';
import { FcHome } from 'react-icons/fc';
const routes = [
  {
    href: '/',
    label: 'Dashboard',
  },
  {
    href: '/expenses',
    label: 'Expenses',
  },
  {
    href: '/income',
    label: 'Income',
  },
  {
    href: '/budget',
    label: 'Budget',
  },
  {
    href: '/notifications',
    label: 'Notifications',
  },
];

export const Header = () => {
  const pathname = usePathname();
  const user = useCurrentUser();
  const router = useRouter()
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className='md:hidden '>
        <CustomSidebar />
        </div>
        <div className="mr-4 hidden md:flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <FcHome className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              StudentFinance
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  'transition-colors hover:text-foreground/80',
                  pathname === route.href ? 'text-primary underline' : 'text-foreground/60'
                )}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Add search functionality here if needed */}
          </div>
          <nav className="flex items-center">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.image || ''} alt={user.name || ''} />
                      <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                 
                  <DropdownMenuItem
                    className="cursor-pointer"
                   
                  >
                    <LogoutButton>
                    <Button
                    
                    >
                    Sign out
                    </Button>
                    </LogoutButton>
                  </DropdownMenuItem>
                 
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" asChild>
                <Link href="/auth/login">Sign in</Link>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
