'use client'
import { usePathname } from 'next/navigation';
import React from 'react';

export const LanguageSwitcher = () => {
    const pathname = usePathname();
    
    // Fonction pour obtenir le chemin dans l'autre langue
    const getOtherLangPath = (currentPath, targetLang) => {
        const pathParts = currentPath.split('/');
        pathParts[1] = targetLang; // Change la langue dans le chemin
        return pathParts.join('/');
    };

    // Détermine la langue actuelle à partir du chemin
    const currentLang = pathname.split('/')[1];

    return (
        <div className="flex langSwitcher border-none items-center	">
            <a 
                href={getOtherLangPath(pathname, 'fr')}
                className={`px-1 py-1 ${currentLang === 'fr' ? 'font-bold' : ''}`}
            >
                FR
            </a>
            <span>&nbsp;|&nbsp;</span>
            <a 
                href={getOtherLangPath(pathname, 'en')}
                className={`px-1 py-1 ${currentLang === 'en' ? 'font-bold' : ''}`}
            >
                EN
            </a>
        </div>
    );
};