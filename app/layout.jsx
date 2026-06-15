import "../src/index.css";
import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";
import ThemeToggle from "../src/components/ThemeToggle";
import ScrollToTop from "../src/components/ScrollToTop";
import Script from "next/script"; // Corrected import capitalized

export const metadata = {
  title: "VedVidYoga",
  description:
    "Understanding Vedic Cult: A Scientific Perspective — Vedas, Upanishads, Ayurveda, and Yoga explained with logic and clarity.",
  metadataBase: new URL("https://vedvidyoga.com"),
  
  // FIX 1: Hardcoding the absolute canonical path to drop URL query strings
  alternates: {
    canonical: "https://vedvidyoga.com",
  },
  
  // FIX 2: Explicitly state the global indexable settings
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/vedvidyoga-logo.webp" type="image/webp" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://api.vedvidyoga.com/wp-includes/css/dist/block-library/style.min.css"
        />
        <link
          rel="stylesheet"
          href="https://api.vedvidyoga.com/wp-includes/css/dist/block-library/theme.min.css"
        />
        
        {/* FIX 3: Replaced raw HTML script with clean Next.js inline script wrapper to avoid parsing errors */}
        <script
          dangerouslySetInnerHTML={{
            __html: `if(localStorage.getItem('theme')==='dark'){document.documentElement.classList.add('dark')}`,
          }}
        />
      </head>
      <body>
        {/* FIX 4: Corrected Google Tag Manager using Next.js Script strategy */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MXLGGKD7');`}
        </Script>

        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MXLGGKD7"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        
        <ScrollToTop />
        <Navbar />
        {children}
        <Footer />
        <ThemeToggle />
      </body>
    </html>
  );
}