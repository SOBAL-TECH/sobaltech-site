import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProductForm } from "@/components/admin/product-form";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "New Product" };

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/products">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold tracking-tight">New Product</h1>
          <p className="text-sm text-muted-foreground">Add a new productized offer.</p>
        </div>
      </div>

      <ProductForm />
    </div>
  );
}
