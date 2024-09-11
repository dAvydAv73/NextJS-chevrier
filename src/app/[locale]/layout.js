
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

import { Red_Hat_Display, DM_Serif_Display } from "next/font/google";
import "../../../styles/globals.css";
import { getMenu } from "../../../utils/getMenu";
import { MainMenu } from "../../../components/MainMenu";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const dmserifdisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-dmserifdisplay",
});

const redhatdisplay = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
  variable: "--font-redhatdisplay",
});

export default async function RootLayout({ children, params }) {
  const {locale} = params;
  const menuData = await getMenu(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages(locale);


  return (
    <html lang={locale} className={`${redhatdisplay.variable} ${dmserifdisplay.variable}`}>
      <body className="font-body">
        <NextIntlClientProvider locale={locale} messages={messages}>

          <MainMenu
            callToActionDestination={menuData.callToActionDestination}
            callToActionLabel={menuData.callToActionLabel}
            callToActionEmail={menuData.callToActionEmail}
            callToAction2Label={menuData.callToAction2Label}
            callToAction2Destination={menuData.callToAction2Destination}
            items={menuData.mainMenuItems}
          />
          <div className="content" id="content">
            {children}
          </div>
        </NextIntlClientProvider>

      </body>
    </html>
  );
}
