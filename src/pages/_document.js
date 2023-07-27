import Document, { Html, Head, Main, NextScript } from "next/document";

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


    {/*Google analytics... */ }

<script async src="https://www.googletagmanager.com/gtag/js?id=G-0VDJC5JMTV"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments)}
  gtag('js', new Date());

  gtag('config', 'G-0VDJC5JMTV');
</script>


        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
