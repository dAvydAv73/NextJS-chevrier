import { unstable_setRequestLocale } from 'next-intl/server';
import { BlockRenderer } from "../../../components/BlockRenderer";
import { getPage } from "../../../utils/getPage";
import { notFound } from "next/navigation";
import { getSeo } from "../../../utils/getSeo";

export default async function Home({ params: { locale } }) {
  unstable_setRequestLocale(locale);

  const slug = locale === 'en' ? "/home" : "/";
  const data = await getPage(slug);

  if (!data) {
    notFound();
  }

  return <BlockRenderer blocks={data} />;
}

export async function generateMetadata({ params: { locale } }) {
  unstable_setRequestLocale(locale);

  const slug = locale === 'en' ? "/home" : "/";
  const seo = await getSeo(slug);

  return {
    title: seo?.title || "",
    description: seo?.metaDesc || "",
  };
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }];
}