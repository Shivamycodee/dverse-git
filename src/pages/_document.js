import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script
            async
            src="https://kit.fontawesome.com/ccd84e7d2b.js"
            crossOrigin="anonymous"
          />
        </Head>
        <body>
          <Main />

          {/* Google Analytics */}
          <Script
            id="google-data01"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=G-0VDJC5JMTV`}
          />
          <Script
            id="google-data02"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-0VDJC5JMTV');
              `,
            }}
          />

          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
