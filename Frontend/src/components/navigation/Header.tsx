"use client";

import React, { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Bell, Menu, Mic, Plus, Search } from "lucide-react";
import Link from "next/link";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/lib/AuthContext";
import { cn } from "@/lib/utils";
import ChannelDialog from "../home/ChannelDialog";
import { useRouter } from "next/dist/client/components/navigation";

const Header = ({ toggleSideBar }: { toggleSideBar: () => void }) => {
  const { user, logout, handleGoogleSignIn } = useUser();

  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearchSubmit(e);
    }
  };
  
  return (
    <header className="w-full sticky top-0 left-0 z-30 right-0 flex justify-between items-center px-3 py-2 bg-white shadow-md">
      <div className="flex justify-between items-center gap-2">
        <Button
          onClick={toggleSideBar}
          variant="ghost"
          className="h-8 w-8 p-4 text-gray-600 rounded-full">
          <Menu />
        </Button>
        <Link href="/" className="flex items-center">
          <div>
            <svg
              width="40"
              height="25"
              viewBox="0 0 200 140"
              xmlns="http://www.w3.org/2000/svg">
              <rect
                x="0"
                y="0"
                width="200"
                height="140"
                rx="30"
                fill="#FF0000"
              />
              <polygon points="80,45 80,95 130,70" fill="white" />
            </svg>
          </div>
          <span className="text-base md:text-xl font-Roboto font-semibold">
            YouTube
          </span>
          <span className="text-[8px] md:text-xs pb-2.5 ml-0.5">TM</span>
        </Link>
      </div>
      <div className="md:w-[70%] flex items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="flex">
          <Input
            type="search"
            placeholder="Search"
            value={searchQuery}
            onKeyDown={handleKeyDown}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`h-10 rounded-l-full ${cn("border-0 md:border")} w-0 p-0 md:px-3 md:w-96 focus-visible:ring-0`}
          />
          <Button
            variant="ghost"
            type="submit"
            className="h-10 rounded-full md:rounded-l-none md:rounded-r-full md:border-l-0 border-gray-300 md:px-6 bg-gray-100 hover:bg-gray-200 text-gray-600">
            <Search className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            className="h-10 hidden md:block border ml-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full">
            <Mic className="w-5 h-5" />
          </Button>
        </form>
        <div>
          {user ? (
            <div className="w-full flex items-center gap-2">
              <Button
                variant={"ghost"}
                className="h-10 border ml-2 border-gray-300 text-gray-600 bg-gray-100 rounded-full py-3">
                <Plus />
                <h4 className="hidden md:block">

                Create
                </h4>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full">
                <Bell className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.image} />
                      <AvatarFallback>
                        {user?.name?.charAt(0)?.toUpperCase()||"U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent forceMount className="w-full md:w-80 p-2">
                  <DropdownMenuItem className="flex flex-col items-start">
                    <div className="flex items-center gap-2">
                      <Button className="h-10 w-10 rounded-full">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user?.image} />
                          <AvatarFallback>
                            {user?.name?.charAt(0)?.toUpperCase()||"U"}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                      <div>
                        <h3>{user?.name}</h3>
                        <h3>{user?.email}</h3>
                      </div>
                    </div>
                    {user?.channelname ? (
                      <Link
                        href={`/channel/${user?._id}`}
                        className="w-full text-center text-blue-600">
                        View your channel
                      </Link>
                    ) : (
                      <Button
                        variant="ghost"
                        className="w-full text-center text-blue-600"
                        onClick={() => setIsDialogOpen(true)}>
                        Create channel
                      </Button>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={`/googleAc/${user.id}`}>Google Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={`/accounts/${user.id}`}>Switch Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={`/ytStudio/${user.id}`}>Youtube Studio</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={`/googleAc/${user.id}`}>
                      Purchases and Memberships
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={"/settings"}>Settings</Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={"/help"}>Help</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={"/feedback"}>Send feedback</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button
                      onClick={logout}
                      variant="ghost"
                      className="w-full text-center border border-gray-300 hover:text-red-600">
                      Sign Out
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
              <Button
                onClick={handleGoogleSignIn}
                variant="ghost"
                className="bg-gray-100 hover:bg-gray-200 text-gray-600">
                Sign in
              </Button>
            </>
          )}
        </div>
      </div>
      <ChannelDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        mode="create"
      />
    </header>
  );
};

export default Header;
