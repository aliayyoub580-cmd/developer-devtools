import { useEffect } from 'react';
import type { SEOProps } from '../types';

export const SEO = ({
  title,
  description,
  canonical = '',
  ogTitle = title,
  ogDescription = description,
  ogImage = '',
  ogUrl = '',
  twitterTitle = title,
  twitterDescription = description,
  twitterImage = ogImage,
  schema,
}: SEOProps) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}

      <meta property="og:type" content="website" />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:url" content={ogUrl || canonical} />
      {ogImage && <meta property="og:image" content={ogImage} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={twitterTitle} />
      <meta name="twitter:description" content={twitterDescription} />
      {twitterImage && <meta name="twitter:image" content={twitterImage} />}

      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </>
  );
};
