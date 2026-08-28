import type { Metadata } from 'next';

export const SITE_NAME = 'Chọn Chuẩn';
export const SITE_DESCRIPTION =
  'Gợi ý deal, mã giảm giá và hướng dẫn mua sắm có chọn lọc, giúp bạn kiểm tra giá và điều kiện trước khi quyết định.';

function readSiteUrl(): string | null {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!value) return null;

  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;

    url.hash = '';
    url.search = '';
    return url.toString().replace(/\/+$/, '');
  } catch {
    return null;
  }
}

export const SITE_URL = readSiteUrl();

export function absoluteSiteUrl(path = '/'): string | undefined {
  if (!SITE_URL) return undefined;

  const normalizedPath = path === '/' ? '' : `/${path.replace(/^\/+/, '')}`;
  return `${SITE_URL}${normalizedPath}`;
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  index?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  index = true,
}: PageMetadataOptions): Metadata {
  const canonical = absoluteSiteUrl(path);
  const socialTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title: socialTitle,
      description,
      siteName: SITE_NAME,
      locale: 'vi_VN',
      type: 'website',
      ...(canonical ? { url: canonical } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
    },
    robots: index
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        }
      : { index: false, follow: false },
  };
}

export function createNotFoundMetadata(title: string): Metadata {
  return {
    title,
    robots: { index: false, follow: false },
  };
}
