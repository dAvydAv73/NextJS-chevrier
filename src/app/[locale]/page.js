import { unstable_setRequestLocale } from 'next-intl/server';
import { BlockRenderer } from "../../../components/BlockRenderer";
import { getPage } from "../../../utils/getPage";
import { getSeo } from "../../../utils/getSeo";
import Error from 'next/error';

export default async function Home({ params: { locale } }) {
  console.log('Rendering Home component with locale:', locale);
  unstable_setRequestLocale(locale);

  const slug = locale === 'en' ? "/home" : "/";
  console.log('Fetching page data for slug:', slug);

  try {
    const data = await getPage(slug);
    console.log('Received page data:', JSON.stringify(data, null, 2));

    if (!data || !Array.isArray(data)) {
      console.error('Invalid data received:', data);
      return <Error statusCode={500} />;
    }

    return <BlockRenderer blocks={data} />;
  } catch (error) {
    console.error('Error in Home component:', error);
    return <Error statusCode={500} />;
  }
}

export async function generateMetadata({ params: { locale } }) {
  console.log('Generating metadata for locale:', locale);
  unstable_setRequestLocale(locale);

  const slug = locale === 'en' ? "/home" : "/";
  console.log('Fetching SEO data for slug:', slug);

  try {
    const seo = await getSeo(slug);
    console.log('Received SEO data:', seo);

    return {
      title: seo?.title || "Default Title",
      description: seo?.metaDesc || "Default Description",
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: "Default Title",
      description: "Default Description",
    };
  }
}

export function generateStaticParams() {
  console.log('Generating static params');
  return [{ locale: 'en' }, { locale: 'fr' }];
}

export const dynamicParams = false; // Disable dynamic routing