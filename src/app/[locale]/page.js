import { BlockRenderer } from "../../../components/BlockRenderer";
import { getPage } from "../../../utils/getPage";
import { notFound } from "next/navigation";
import { getSeo } from "../../../utils/getSeo";
import { useTranslations } from "next-intl";

export default async function Home({ params }) {
  const locale = params.locale || 'en';
  const slug = locale === 'en' ? "/home" : "/";
  const data = await getPage(slug);

  if (!data) {
    notFound();
  }
 
  return <BlockRenderer blocks={data} />;
}

export async function generateMetadata({ params }) {
  const locale = params.locale || 'en';
  const slug = locale === 'en' ? "/home" : "/";
  const seo = await getSeo(slug);
  return {
    title: seo?.title || "",
    description: seo?.metaDesc || "",
  };
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }];
}