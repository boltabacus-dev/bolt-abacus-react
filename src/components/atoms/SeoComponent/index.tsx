import { APP_NAME, APP_URL } from '@constants/app';
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

export interface SeoComponentProps {
  title: string;
  href?: string;
  description?: string;
  type?: string;
}

const SeoComponent: FC<SeoComponentProps> = ({
  title,
  description = 'The perfect app to learn and master abacus!',
  type = 'article',
  href = '',
}) => {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{`${title} | ${APP_NAME}`}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={`${APP_URL}${href}`} />

      {/* OpenGraph metadata tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={APP_URL} />
      <meta property="og:image" content={`${APP_URL}logo.png`} />

      {/* Twitter meta data tags */}
      <meta name="twitter:card" content={type} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${APP_URL}logo.png`} />
    </Helmet>
  );
};

export default SeoComponent;
