import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ServiceForm } from "@/components/admin/service-form";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "New Service" };

export default function NewServicePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/services">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold tracking-tight">New Service</h1>
          <p className="text-sm text-muted-foreground">Add a new service to your offerings.</p>
        </div>
      </div>

      <ServiceForm />
    </div>
  );
}
