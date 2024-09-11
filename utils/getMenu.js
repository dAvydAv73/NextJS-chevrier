import { mapMainMenuItems } from "./mapMainMenuItems";

export const getMenu = async (locale = 'en') => {
  const params = {
    query: `
    query MenuQuery {
      acfOptionsMainMenu {
        mainMenu {
          enLang {
            callToActionButton {
              label
              emaildestination
            }
            callToActionButton2 {
              label
              url
            }
            menuItems {
              menuItem {
                label
                destination {
                  ... on Page {
                    uri
                  }
                }
              }
            }
          }
          frLang {
            callToActionButton {
              label
              emaildestination
            }
            callToActionButton2 {
              label
              url
            }
            menuItems {
              menuItem {
                label
                destination {
                  ... on Page {
                    uri
                  }
                }
              }
            }
          }
        }
      }
    }
    `
  };

  try {
    const response = await fetch(process.env.WP_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data } = await response.json();

    if (!data || !data.acfOptionsMainMenu || !data.acfOptionsMainMenu.mainMenu) {
      throw new Error('Data structure is not as expected');
    }

    const langData = locale === 'en' ? data.acfOptionsMainMenu.mainMenu.enLang : data.acfOptionsMainMenu.mainMenu.frLang;

    return {
      mainMenuItems: mapMainMenuItems(langData.menuItems),
      callToActionLabel: langData.callToActionButton.label,
      callToActionEmail: langData.callToActionButton.emaildestination,
      callToAction2Label: langData.callToActionButton2.label,
      callToAction2Destination: langData.callToActionButton2.url,
    };
  } catch (error) {
    console.error('Error fetching menu data:', error);
    return {
      mainMenuItems: [],
      callToActionLabel: 'Accueil',
      callToActionDestination: '/',
    };
  }
};