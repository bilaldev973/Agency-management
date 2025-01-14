"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Loader } from "@/components/ui/loader";
import { useLoading } from "@/hooks/use-loading";
import { Suspense } from "react";  // Import Suspense from React

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isLoading, setLoading } = useLoading();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleStop = () => setLoading(false);

    handleStop();
  }, [pathname, searchParams, setLoading]);

  return (
    <Suspense fallback={<Loader />}>  {/* Wrap with Suspense */}
      {isLoading && <Loader />}
      {children}
    </Suspense>
  );
}
