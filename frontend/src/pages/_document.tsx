import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="antialiased">
      <Head>
        <meta name="description" content="A word puzzle game" />
        <meta property="og:url" content="https://wordle.openformat.tech" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Rewardle" />
        <meta property="og:description" content="A word puzzle game" />
        <meta
          property="og:image"
          content="https://wordle.openformat.tech/images/banner.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="wordle.openformat.tech" />
        <meta property="twitter:url" content="https://wordle.openformat.tech" />
        <meta name="twitter:title" content="Rewardle" />
        <meta name="twitter:description" content="A word puzzle game" />
        <meta
          name="twitter:image"
          content="https://wordle.openformat.tech/images/banner.png"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
