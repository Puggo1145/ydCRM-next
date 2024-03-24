"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Loader from "@/components/loader";

import { useSession } from "next-auth/react";

const WelcomePage: React.FC = () => {
  const { data: session, status } = useSession();

  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      {
        status === "loading" || status === "unauthenticated" && (
          <>
            <p className="text-lg lg:text-xl font-bold">正在验证您的身份，请稍后...</p>
            <p className="text-sm text-muted-foreground">这可能需要一些时间</p>
            <Loader size="lg" />
          </>
        )
      }
      {
        status === "authenticated" && (
          <>
            <p className="text-lg lg:text-xl font-bold">您好，{session.user?.name}</p>
            <Button asChild>
              <Link href="/dashboard">
                进入系统
              </Link>
            </Button>
          </>
        )
      }
    </div>
  );
};

export default WelcomePage;