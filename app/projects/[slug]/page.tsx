// app/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import projects from "@/data/projects.json";
import CaseStudyClient from "../CaseStudyClient";
type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) return notFound();

  return <CaseStudyClient slug={slug} />;
}