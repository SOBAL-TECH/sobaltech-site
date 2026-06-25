import { prisma } from "@/lib/db";

/**
 * Retrieve a single site setting value by key.
 * Returns null if the key does not exist.
 */
export async function getSetting(key: string): Promise<string | null> {
  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { key },
      select: { value: true },
    });
    return setting?.value ?? null;
  } catch {
    return null;
  }
}

/**
 * Retrieve all site settings, optionally filtered by group.
 * Returns a flat key→value record for easy access.
 */
export async function getSettings(
  group?: string
): Promise<Record<string, string>> {
  try {
    const settings = await prisma.siteSetting.findMany({
      where: group ? { group } : undefined,
      select: { key: true, value: true },
    });

    return settings.reduce<Record<string, string>>((acc, { key, value }) => {
      acc[key] = value;
      return acc;
    }, {});
  } catch {
    return {};
  }
}

/**
 * Update (or create) a site setting by key.
 */
export async function updateSetting(
  key: string,
  value: string
): Promise<void> {
  await prisma.siteSetting.upsert({
    where: { key },
    update: { value },
    create: {
      key,
      value,
      label: key
        .split("_")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
    },
  });
}

/**
 * Update multiple settings at once.
 */
export async function updateSettings(
  settings: Record<string, string>
): Promise<void> {
  await Promise.all(
    Object.entries(settings).map(([key, value]) => updateSetting(key, value))
  );
}

/**
 * Delete a site setting by key.
 */
export async function deleteSetting(key: string): Promise<void> {
  await prisma.siteSetting.delete({ where: { key } });
}
