"use client"

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export const CallToActionButton = ({
  align = "left",
  buttonLabel,
  destination,
  btnclass = "btn",
}) => {
  const params = useParams();
  const locale = params?.locale || 'en';

  const btnMap = {
    true : "btninvert",
    false: "btn",
  }

  const alignMap = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const parseUrl = (url) => {
    if (typeof url !== 'string') {
      console.warn('URL is not a string:', url);
      return '/';
    }

    try {
      const parsedUrl = new URL(url);
      // Extraire le chemin de l'URL (sans le domaine)
      let path = parsedUrl.pathname;
      
      // Supprimer le slash initial si présent
      if (path.startsWith('/')) {
        path = path.slice(1);
      }

      // Construire l'URL locale
      return `/${locale}/${path}`;
    } catch (error) {
      console.error('Invalid URL:', url);
      return '/';
    }
  };

  const url = destination?.url;
  const target = destination?.target || '_self';
  const title = destination?.title;


  return (
    <div className={alignMap[align]}>
      <Link 
        href={url}
        target={target}
        className={`${btnMap[btnclass]} neutra-light`}
      >
        {buttonLabel}
      </Link>
    </div>
  );
};