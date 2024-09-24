export const relativeToAbsoluteUrls = (htmlString = "") => {
  // Vérification du type de htmlString
  if (typeof htmlString !== 'string') {
    console.warn('relativeToAbsoluteUrls received a non-string value:', htmlString);
    return "";
  }

  const wpUrl = process.env.NEXT_PUBLIC_WP_URL;
  
  // Vérification de l'existence de NEXT_PUBLIC_WP_URL
  if (!wpUrl) {
    console.warn('NEXT_PUBLIC_WP_URL is not defined');
    return htmlString;
  }

  try {
    // Utilisation de la méthode replaceAll au lieu de split et join
    return htmlString.replaceAll(wpUrl, "");
  } catch (error) {
    console.error('Error in relativeToAbsoluteUrls:', error);
    return htmlString;
  }
};