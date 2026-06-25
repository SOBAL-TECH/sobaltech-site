import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ProjectForm } from "@/components/admin/project-form";
import { Button } from "@/components/ui/button";
import { getProjectById } from "@/lib/actions/admin-projects";

export const metadata: Metadata = { title: "Edit Project" };

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/projects">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold tracking-tight">Edit Project</h1>
          <p className="text-sm text-muted-foreground">{project.title}</p>
        </div>
      </div>

      <ProjectForm project={project} />
    </div>
  );
}
