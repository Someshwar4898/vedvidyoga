const DEFAULT_SITE_URL = "https://vedvidyoga.com";

export const SITE_NAME = "VedVidYoga";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL).replace(/\/+$/, "");

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath === "/" ? "" : normalizedPath}`;
}

export function buildStaticMetadata({
  title,
  description,
  path = "/",
  type = "website",
  robots,
}) {
  const canonical = absoluteUrl(path);
  const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

  return {
    title: pageTitle,
    description,
    alternates: { canonical },
    openGraph: {
      title: pageTitle,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
    },
    ...(robots ? { robots } : {}),
  };
}
