import { BlockRenderer } from "components/BlockRenderer";
import { MainMenu } from "components/MainMenu";
import Head from "next/head";
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react';
import { getCookie } from 'cookies-next'; // Assurez-vous d'installer ce package si ce n'est pas déjà fait

export const Page = (props) => {

  const router = useRouter();
  const [menuItems, setMenuItems] = useState(props.mainMenuItems);

  useEffect(() => {
    const determineLanguage = () => {
      // Vérifiez d'abord l'URL
      const pathLanguage = router.asPath.split('/')[1];
      if (pathLanguage === 'fr' || pathLanguage === 'en') {
        return pathLanguage;
      }
      
      // Si l'URL ne contient pas la langue, vérifiez le cookie
      const cookieLanguage = getCookie('next_locale');
      if (cookieLanguage) {
        return cookieLanguage;
      }
      
      // Par défaut, retournez 'en'
      return 'en';
    };

    const language = determineLanguage();
    
    // Sélectionnez les éléments du menu en fonction de la langue
    if (language === 'fr') {
      setMenuItems(props.mainMenuItemsFr);
    } else {
      setMenuItems(props.mainMenuItemsEn);
    }
  }, [router.asPath, props.mainMenuItemsFr, props.mainMenuItemsEn]);

  return (
    <div>
      <Head>
        <title>{props.seo.title}</title>
        <meta name="description" content={props.seo.metaDesc} />
      </Head>
      <MainMenu
        items={props.mainMenuItems}
        callToActionEmail={props.callToActionEmail}
        callToActionLabel={props.callToActionLabel}
        callToAction2Label={props.callToAction2Label}
        callToAction2Destination={props.callToAction2Destination}
      />
      <BlockRenderer blocks={props.blocks} />
    </div>
  );
};
