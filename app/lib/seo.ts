import type { Metadata } from 'next';

export const SITE_NAME = 'Chọn Chuẩn';
export const SITE_DESCRIPTION =
  'Gợi ý deal, mã giảm giá và hướng dẫn mua sắm có chọn lọc, giúp bạn kiểm tra giá và điều kiện trước khi quyết định.';
export const PRODUCTION_SITE_URL = 'https://chonchuan.dolphinxstudio.com';
export const SOCIAL_IMAGE_PATH = '/chon-chuan-social.png';
export const SOCIAL_IMAGE_ALT = 'Chọn Chuẩn — Deal và mã giảm giá có nguồn';

function readSiteUrl(): string {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim() || PRODUCTION_SITE_URL;

  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return PRODUCTION_SITE_URL;

    url.hash = '';
    url.search = '';
    return url.toString().replace(/\/+$/, '');
  } catch {
    return PRODUCTION_SITE_URL;
  }
}

export const SITE_URL = readSiteUrl();

export function absoluteSiteUrl(path = '/'): string | undefined {
  if (!SITE_URL) return undefined;

  const normalizedPath = path === '/' ? '' : `/${path.replace(/^\/+/, '')}`;
  return `${SITE_URL}${normalizedPath}`;
}

export function createSocialImageMetadata() {
  return {
    url: absoluteSiteUrl(SOCIAL_IMAGE_PATH) ?? SOCIAL_IMAGE_PATH,
    width: 1200,
    height: 630,
    alt: SOCIAL_IMAGE_ALT,
  };
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  index?: boolean;
  follow?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  index = true,
  follow = true,
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
      images: [createSocialImageMetadata()],
      ...(canonical ? { url: canonical } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [createSocialImageMetadata()],
    },
    robots: index
      ? {
          index: true,
          follow,
          googleBot: {
            index: true,
            follow,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        }
      : { index: false, follow },
  };
}

export function createNotFoundMetadata(title: string): Metadata {
  return {
    title,
    robots: { index: false, follow: false },
  };
}
