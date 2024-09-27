import { unstable_setRequestLocale } from 'next-intl/server';
import { BlockRenderer } from "../../../components/BlockRenderer";
import { getPage } from "../../../utils/getPage";
import { notFound } from "next/navigation";
import { getSeo } from "../../../utils/getSeo";

// Forcer le rendu dynamique
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home({ params: { locale } }) {
  console.log('Rendering Home component with locale:', locale);
  unstable_setRequestLocale(locale);

  const slug = locale === 'en' ? "/home" : "/";
  console.log('Fetching page data for slug:', slug);

  try {
    const data = await getPage(slug);
    //console.log('Received page data:', JSON.stringify(data, null, 2));

    if (!data) {
      //console.log('No data received, calling notFound()');
      notFound();
    }

    if (!Array.isArray(data)) {
      console.error('Received data is not an array:', data);
      throw new Error('Invalid data format');
    }

    return <BlockRenderer blocks={data} />;
  } catch (error) {
    //console.error('Error in Home component:', error);
    throw error;
  }
}

export async function generateMetadata({ params: { locale } }) {
  //console.log('Generating metadata for locale:', locale);
  unstable_setRequestLocale(locale);

  const slug = locale === 'en' ? "/home" : "/";
  //console.log('Fetching SEO data for slug:', slug);

  try {
    const seo = await getSeo(slug);
    //console.log('Received SEO data:', seo);

    return {
      title: seo?.title || "",
      description: seo?.metaDesc || "",
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: "",
      description: "",
    };
  }
}