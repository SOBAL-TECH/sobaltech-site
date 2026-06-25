import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ServiceForm } from "@/components/admin/service-form";
import { Button } from "@/components/ui/button";
import { getServiceById } from "@/lib/actions/admin-services";

export const metadata: Metadata = { title: "Edit Service" };

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await getServiceById(id);
  if (!service) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/services">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold tracking-tight">Edit Service</h1>
          <p className="text-sm text-muted-foreground">{service.title}</p>
        </div>
      </div>

      <ServiceForm service={service} />
    </div>
  );
}
