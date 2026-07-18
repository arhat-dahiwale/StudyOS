import Link from "next/link"

import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-4xl rounded-2xl border p-12 text-center">
        <h2 className="text-4xl font-bold">
          Ready to boost your productivity?
        </h2>

        <p className="mt-4 text-muted-foreground">
          Start organizing your studies with StudyOS today.
        </p>

        <div className="mt-8">
          <Link href="/register">
            <Button size="lg">
              Create Free Account
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}