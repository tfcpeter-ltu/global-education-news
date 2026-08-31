export type PartnerSchool = {
  name: string;
  aliases?: string[];
};

/*
 * INTERNATIONAL EDUCATION PARTNERS — editorial rule
 *
 * Keep one central partner-school list here. Do not render this directory on the
 * public site. A story is eligible for the partner column only when its
 * frontmatter identifies a school/organization that matches this list (or when
 * partnerColumn is explicitly true).
 *
 * Phase 1: intentionally empty. Add partner schools here as the editorial list
 * is confirmed in the future.
 */
export const PARTNER_SCHOOLS: PartnerSchool[] = [];

const normalize = (value: unknown) => String(value ?? '')
  .trim()
  .toLowerCase()
  .replace(/\s+/g, ' ');

export const isPartnerStory = (story: any) => {
  if (story?.partnerColumn === true) return true;

  const candidates = [story?.partner, story?.school, story?.organization]
    .filter(Boolean)
    .map(normalize);

  if (!candidates.length || !PARTNER_SCHOOLS.length) return false;

  return PARTNER_SCHOOLS.some((school) => {
    const names = [school.name, ...(school.aliases ?? [])].map(normalize);
    return candidates.some((candidate) => names.includes(candidate));
  });
};

export const isWithinPartnerWindow = (date: unknown, now = new Date()) => {
  const published = new Date(String(date ?? ''));
  if (Number.isNaN(published.getTime())) return false;

  const cutoff = new Date(now);
  cutoff.setMonth(cutoff.getMonth() - 3);
  return published >= cutoff;
};

export const getPartnerStories = (articles: any[], now = new Date()) => articles
  .filter((story) => isPartnerStory(story) && isWithinPartnerWindow(story.date, now))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
