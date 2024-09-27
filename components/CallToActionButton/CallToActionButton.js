"use client"

import React, { useEffect, useState } from 'react';
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
  const [url, setUrl] = useState('/');

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

    if (typeof window !== 'undefined') {
      const currentOrigin = window.location.origin;
      if (url.startsWith(currentOrigin) && url.includes('#')) {
        const [path, hash] = url.split('#');
        if (path === currentOrigin || path === `${currentOrigin}/${locale}`) {
          return `#${hash}`;
        }
      }

      try {
        const parsedUrl = new URL(url, currentOrigin);
        let path = parsedUrl.pathname;

        if (path.startsWith('/')) {
          path = path.slice(1);
        }

        return `/${locale}/${path}${parsedUrl.hash || ''}`;
      } catch (error) {
        console.error('Invalid URL:', url);
        return '/';
      }
    }

    // Fallback for server-side rendering
    return url;
  };

  useEffect(() => {
    if (destination?.url) {
      setUrl(parseUrl(destination.url));
    }
  }, [destination]);

  const handleScrollToAnchor = (event, url) => {
    if (url.startsWith('#')) {
      event.preventDefault();
      const elementId = url.substring(1);
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const target = destination?.target || '_self';
  const title = destination?.title;

  return (
    <div className={alignMap[align]}>
      <Link 
        href={url}
        target={target}
        className={`${btnMap[btnclass]} neutra-light`}
        onClick={(e) => handleScrollToAnchor(e, url)}
      >
        {buttonLabel}
      </Link>
    </div>
  );
};