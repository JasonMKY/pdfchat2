"use client";

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { ArrowRight, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MobileNav = ({ isAuth }: { isAuth: boolean }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) toggleOpen();
  }, [pathname]);

  const closeonCurrent = (href: string) => {
    if (pathname === href) toggleOpen();
  };
  return (
    <div className="sm:hidden">
      <Menu
        onClick={toggleOpen}
        className="relative z-50 h-5 w-5 cursor-pointer text-zinc-700"
      />
      {isOpen ? (
        <div className="fixed inset-0 z-0 w-full animate-in fade-in-20 slide-in-from-top-5">
          <ul className="absolute grid w-full gap-3 border-b border-zinc-200 bg-white px-10 pb-8 pt-20 shadow-xl">
            {!isAuth ? (
              <>
                <li>
                  <Link
                    href="/sign-up"
                    className="flex w-full items-center font-semibold text-green-600"
                    onClick={() => closeonCurrent("/sign-up")}
                  >
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </li>
                <li className="my-3 h-px w-full bg-gray-300" />
                <li>
                  <Link
                    href="/sign-in"
                    className="flex w-full items-center font-semibold"
                    onClick={() => closeonCurrent("/sign-in")}
                  >
                    Sign In
                  </Link>
                </li>
                <li className="my-3 h-px w-full bg-gray-300" />
                <li>
                  <Link
                    href="/pricing"
                    className="flex w-full items-center font-semibold"
                    onClick={() => closeonCurrent("/pricing")}
                  >
                    Pricing
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/dashboard"
                    className="flex w-full items-center font-semibold"
                    onClick={() => closeonCurrent("/dashboard")}
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="my-3 h-px w-full bg-gray-300" />
                <li>
                  <LogoutLink
                    // href="/sign-out"
                    className="flex w-full items-center font-semibold"
                  >
                    Sign Out
                  </LogoutLink>
                </li>
              </>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default MobileNav;