'use client';

import React, { useState, useEffect } from 'react';
import { ButtonLink } from "../ButtonLink";
import Image from 'next/image';
import LogoIcon from "../../public/img/LesAviateurs_logo_sky.svg";
import {LanguageSwitcher} from "../LanguageSwitcher";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { useLocale } from 'next-intl';

export const MainMenu = ({
  items,
  callToActionLabel,
  callToActionEmail,
  callToAction2Label,
  callToAction2Destination
}) => {
  const locale = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 640) { // 640px est le breakpoint 'sm' par défaut dans Tailwind
        const currentScrollY = window.scrollY;
        if (currentScrollY > 50) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      } else {
        setIsScrolled(true); // Toujours considéré comme scrolled sur mobile
      }
    };
  
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
  
    // Appel initial pour définir l'état correct
    handleScroll();
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);


  return (
      <div className={`navbar fixed left-0 right-0 bottom-0 sm:top-0 sm:bottom-auto z-20 transition-all duration-300 
        ${isScrolled 
          ? 'bg-amber-50 border-t sm:border-b border-gray-300 shadow-md scrolled' 
          : 'bg-transparent border-t sm:border-b border-transparent'
        }
        h-[110px] sm:h-[140px]`}
      >    
      <div className="container mx-auto px-5 flex items-center justify-between h-[110px] sm:h-[140px]">
        <div className="flex-1">
          <LanguageSwitcher />
        </div>
        <div className={`logoLink flex-3 transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}>
          <a href='/' title="Les Aviateurs par Philippe Chevrier - Home">
            <Image 
              priority
              src={LogoIcon}
              height={90}
              width={260}
              className="w-logo-sm sm:w-logo-md lg:w-logo-lg h-auto"
              alt="Les Aviateurs par Philippe Chevrier"
            />
          </a>
        </div>
        <div className="flex-1 flex justify-end items-center main-menu">
          {(items || []).map((item) => (
            <div
              key={item.id}
              className="relative group animate-slideLeft"
            >
              <a href={item.destination} className={`p-5 block transition-colors duration-300 px-1 py-1 ${
                isScrolled ? 'text-slate-900' : 'text-white drop-shadow-md'
              }`}>
                {item.label}
              </a>
              {!!item.subMenuItems?.length && (
                <div className="group-hover:block hidden bg-slate-800 text-right absolute right-0 top-full -mt-3">
                  {item.subMenuItems.map((subMenuItem) => (
                    <a 
                      key={subMenuItem.id}
                      href={subMenuItem.destination}
                      className="block whitespace-nowrap p-5 hover:bg-slate-700 text-white"
                    >
                      {subMenuItem.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="ml-3">
            <ButtonLink
              destination={`mailto:${callToActionEmail}?subject=Sujet%20du%20mail&body=Email%20content`}
              label={callToActionLabel}
              className={`px-1 py-1 transition-colors duration-300 ${
                isScrolled ? 'text-sky-950' : 'text-white drop-shadow-md'
              }`}
            />
            <a href={callToAction2Destination} 
               alt={callToAction2Label}
               className={`ml-2 transition-colors duration-300 ${
                isScrolled ? 'text-sky-950' : 'text-white drop-shadow-md'
               }`}>
              <FontAwesomeIcon icon={faUtensils} className=""/>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};