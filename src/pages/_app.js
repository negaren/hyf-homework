import "../reset.css"
import "../style.css"
import Head from "next/head"
export default function App({Component, pageProps}) {
    return (
        <>
         <Head>
          <title>Homework assesment tool</title>
          <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
          <link rel="stylesheet" href="/_next/static/style.css" />
          {/* <link href="https://fonts.googleapis.com/css?family=Space+Mono" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css?family=Work+Sans" rel="stylesheet"></link> */}
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&amp;family=Work+Sans:wght@400;700&amp;display=swap" rel="stylesheet"/>
        </Head>
        <Component {...pageProps} />
        </>
    )
   
}