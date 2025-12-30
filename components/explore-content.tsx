"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ExplorePage() {
  return (
    <main className="container px-4 py-16 max-w-2xl">
      <h1 className="text-4xl font-bold mb-4">
        Explore Spain, Simply
      </h1>

      <p className="text-lg text-muted-foreground mb-8">
        You don’t need to browse endless lists.
        Your personal Spain Helper is ready to guide you — calmly, clearly, and one step at a time.
      </p>

      <div className="space-y-4">
        <Link href="/chat">
          <Button size="lg" className="w-full">
            🗣️ Talk with Your Spain Helper
          </Button>
        </Link>

        <p className="text-sm text-muted-foreground text-center">
          Ask about nearby cafés, simple Spanish phrases, or what’s easy to do today.
        </p>
      </div>
    </main>
  );
}
