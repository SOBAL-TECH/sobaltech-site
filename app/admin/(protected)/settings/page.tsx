"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Save } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import {
  saveGeneralSettings,
  saveHeroSettings,
  saveContactSettings,
  saveSeoSettings,
  loadAllSettings,
  type GeneralSettingsValues,
  type HeroSettingsValues,
  type ContactSettingsValues,
  type SeoSettingsValues,
} from "@/lib/actions/admin-settings";

// ─── Schema mirrors from admin-settings.ts ────────────────────────────────────

const GeneralSchema = z.object({
  site_name: z.string().min(1, "Required").max(100),
  site_tagline: z.string().max(200).optional().default(""),
  site_description: z.string().max(500).optional().default(""),
});

const HeroSchema = z.object({
  hero_headline: z.string().min(1, "Required").max(200),
  hero_subheadline: z.string().max(400).optional().default(""),
  hero_cta_primary: z.string().max(60).optional().default(""),
  hero_cta_secondary: z.string().max(60).optional().default(""),
});

const ContactSchema = z.object({
  contact_email: z.string().email("Valid email required").max(200),
  contact_phone: z.string().max(30).optional().default(""),
  contact_address: z.string().max(300).optional().default(""),
  social_twitter: z.string().max(200).optional().default(""),
  social_github: z.string().max(200).optional().default(""),
  social_linkedin: z.string().max(200).optional().default(""),
  social_facebook: z.string().max(200).optional().default(""),
  social_instagram: z.string().max(200).optional().default(""),
});

const SeoSchema = z.object({
  seo_default_title: z.string().max(70).optional().default(""),
  seo_default_description: z.string().max(160).optional().default(""),
  seo_og_image: z.string().max(500).optional().default(""),
});

// ─── Section wrapper ──────────────────────────────────────────────────────────

function SettingsSection({
  title,
  description,
  children,
  onSave,
  isPending,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  onSave: () => void;
  isPending: boolean;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        {description && <CardDescription className="text-xs">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
        <div className="flex justify-end border-t border-border pt-4">
          <Button size="sm" onClick={onSave} disabled={isPending} className="gap-2">
            {isPending ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Save className="h-3.5 w-3.5" />
            )}
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(true);

  // General settings form
  const generalForm = useForm<GeneralSettingsValues>({
    resolver: zodResolver(GeneralSchema),
    defaultValues: {
      site_name: "SobalTech",
      site_tagline: "",
      site_description: "",
    },
  });

  // Hero settings form
  const heroForm = useForm<HeroSettingsValues>({
    resolver: zodResolver(HeroSchema),
    defaultValues: {
      hero_headline: "",
      hero_subheadline: "",
      hero_cta_primary: "",
      hero_cta_secondary: "",
    },
  });

  // Contact settings form
  const contactForm = useForm<ContactSettingsValues>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      contact_email: "",
      contact_phone: "",
      contact_address: "",
      social_twitter: "",
      social_github: "",
      social_linkedin: "",
      social_facebook: "",
      social_instagram: "",
    },
  });

  // SEO settings form
  const seoForm = useForm<SeoSettingsValues>({
    resolver: zodResolver(SeoSchema),
    defaultValues: {
      seo_default_title: "",
      seo_default_description: "",
      seo_og_image: "",
    },
  });

  const [pending, setPending] = React.useState<string | null>(null);

  // Load settings on mount
  React.useEffect(() => {
    loadAllSettings().then((settings) => {
      generalForm.reset({
        site_name: settings.site_name ?? "SobalTech",
        site_tagline: settings.site_tagline ?? "",
        site_description: settings.site_description ?? "",
      });
      heroForm.reset({
        hero_headline: settings.hero_headline ?? "",
        hero_subheadline: settings.hero_subheadline ?? "",
        hero_cta_primary: settings.hero_cta_primary ?? "",
        hero_cta_secondary: settings.hero_cta_secondary ?? "",
      });
      contactForm.reset({
        contact_email: settings.contact_email ?? "",
        contact_phone: settings.contact_phone ?? "",
        contact_address: settings.contact_address ?? "",
        social_twitter: settings.social_twitter ?? "",
        social_github: settings.social_github ?? "",
        social_linkedin: settings.social_linkedin ?? "",
        social_facebook: settings.social_facebook ?? "",
        social_instagram: settings.social_instagram ?? "",
      });
      seoForm.reset({
        seo_default_title: settings.seo_default_title ?? "",
        seo_default_description: settings.seo_default_description ?? "",
        seo_og_image: settings.seo_og_image ?? "",
      });
      setLoading(false);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async (
    section: string,
    data: GeneralSettingsValues | HeroSettingsValues | ContactSettingsValues | SeoSettingsValues
  ) => {
    setPending(section);
    try {
      let result;
      if (section === "general") result = await saveGeneralSettings(data as GeneralSettingsValues);
      else if (section === "hero") result = await saveHeroSettings(data as HeroSettingsValues);
      else if (section === "contact") result = await saveContactSettings(data as ContactSettingsValues);
      else result = await saveSeoSettings(data as SeoSettingsValues);

      toast({ title: result?.message, variant: result?.success ? "default" : "destructive" });
    } finally {
      setPending(null);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Configure your site content and appearance.
        </p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        {/* ── General ──────────────────────────────────────────────── */}
        <TabsContent value="general">
          <Form {...generalForm}>
            <SettingsSection
              title="General"
              description="Basic site information."
              isPending={pending === "general"}
              onSave={generalForm.handleSubmit((data) => handleSave("general", data))}
            >
              <FormField
                control={generalForm.control}
                name="site_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Site Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="SobalTech" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={generalForm.control}
                name="site_tagline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tagline</FormLabel>
                    <FormControl>
                      <Input placeholder="Building the Future, One Line at a Time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={generalForm.control}
                name="site_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Site Description</FormLabel>
                    <FormControl>
                      <Textarea rows={3} placeholder="Full-service digital agency…" {...field} />
                    </FormControl>
                    <FormDescription className="text-xs">
                      {(field.value ?? "").length}/500
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </SettingsSection>
          </Form>
        </TabsContent>

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <TabsContent value="hero">
          <Form {...heroForm}>
            <SettingsSection
              title="Hero Section"
              description="Content displayed in the homepage hero."
              isPending={pending === "hero"}
              onSave={heroForm.handleSubmit((data) => handleSave("hero", data))}
            >
              <FormField
                control={heroForm.control}
                name="hero_headline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Headline *</FormLabel>
                    <FormControl>
                      <Input placeholder="Building the Future, One Line at a Time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={heroForm.control}
                name="hero_subheadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subheadline</FormLabel>
                    <FormControl>
                      <Textarea rows={2} placeholder="We build high-performance…" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={heroForm.control}
                  name="hero_cta_primary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary CTA Text</FormLabel>
                      <FormControl>
                        <Input placeholder="Get a Free Quote" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={heroForm.control}
                  name="hero_cta_secondary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Secondary CTA Text</FormLabel>
                      <FormControl>
                        <Input placeholder="View Our Work" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </SettingsSection>
          </Form>
        </TabsContent>

        {/* ── Contact ──────────────────────────────────────────────── */}
        <TabsContent value="contact">
          <Form {...contactForm}>
            <SettingsSection
              title="Contact & Social"
              description="Contact details and social media links."
              isPending={pending === "contact"}
              onSave={contactForm.handleSubmit((data) => handleSave("contact", data))}
            >
              <FormField
                control={contactForm.control}
                name="contact_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Email *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="hello@sobaltech.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={contactForm.control}
                  name="contact_phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 000-0000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={contactForm.control}
                  name="contact_address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="San Francisco, CA" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Social Links
              </p>

              <div className="grid grid-cols-2 gap-4">
                {(
                  [
                    { name: "social_twitter", label: "Twitter / X" },
                    { name: "social_github", label: "GitHub" },
                    { name: "social_linkedin", label: "LinkedIn" },
                    { name: "social_facebook", label: "Facebook" },
                    { name: "social_instagram", label: "Instagram" },
                  ] as const
                ).map(({ name, label }) => (
                  <FormField
                    key={name}
                    control={contactForm.control}
                    name={name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                          <Input placeholder="https://…" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </SettingsSection>
          </Form>
        </TabsContent>

        {/* ── SEO ──────────────────────────────────────────────────── */}
        <TabsContent value="seo">
          <Form {...seoForm}>
            <SettingsSection
              title="SEO Defaults"
              description="Default meta tags used when page-specific SEO is not set."
              isPending={pending === "seo"}
              onSave={seoForm.handleSubmit((data) => handleSave("seo", data))}
            >
              <FormField
                control={seoForm.control}
                name="seo_default_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Default Meta Title</FormLabel>
                    <FormControl>
                      <Input placeholder="SobalTech — Building the Future" {...field} />
                    </FormControl>
                    <FormDescription className="text-xs">
                      {(field.value ?? "").length}/70
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={seoForm.control}
                name="seo_default_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Default Meta Description</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={3}
                        placeholder="Full-service digital agency building high-performance web apps…"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      {(field.value ?? "").length}/160
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={seoForm.control}
                name="seo_og_image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Default OG Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://sobaltech.com/og-image.png" {...field} />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Recommended: 1200x630px
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </SettingsSection>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
