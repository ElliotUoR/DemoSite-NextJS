import styles from './layout.module.css';
import Image from 'next/image';
import Head from 'next/head';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import ImageRandom from './ImageRandom';
import styled from 'styled-components';
import RedirectButton from './RedirectButton';
import ThemeToggle from './backgroundComps/ThemeToggle';
import LayoutMain from './LayoutMain';
import { useEffect, useState } from 'react';
import IconSorter from './sorting/IconSorter';
import WasmLogo from './wasmComponents/WasmLogo';
import BlockchainLogo from './blockchainComps/BlockchainLogo';
import CVLogo from './cvComps/CVLogo';

const name = "Home";

export const siteTitle = 'Elliot Jordan - Demo Site';


export default function Layout({ children, home, pageName }) {

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {

    if (!loaded) {
      setLoaded(true);
    }

  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href='/favicon.ico' />
        <meta
          name="description"
          content="Demo site built in NextJS"
        />
        <meta
          property='og:image'
          content={'https://op-image.vercel.app/${encodeURI(siteTitle,)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg'}
        />


        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {home ? (
        <header className={styles.header}>
          <Image
            priority
            src="/DemoSite-NextJS/images/icons/home.png"
            className={utilStyles.interactive}
            height={calcImageSize(loaded)}
            width={calcImageSize(loaded)}
            alt={name}
          />
          <h1 className={utilStyles.heading2Xl}>{name}</h1>
        </header>
      ) : (
        <header className={styles.alignedContainer}>
          <RenderPage pageName={pageName}/>
          <h2 className={utilStyles.headingLg}>
            {pageName}
          </h2>
        </header>
      )}

      <LayoutMain>{children}</LayoutMain>
      {!home && (
        <div className={styles.backToHome}>
          <RedirectButton home="true">Home</RedirectButton>
        </div>
      )}
    </div>
  );
}


function calcImageSize(loaded) {
  if (!loaded) {
    return 144;

  }
  return window.innerWidth >= 551 ? 144 : 70;
}

const Main = styled.main`
   background-color: rgb(77, 77, 77,0.7);
    border: black;
    border-style: solid;
    border-width: thick;
    padding: 0.5rem;
    gap: 0.5rem;
    flex-flow: column;
    top: 100px;
    bottom: 0;
    width: 100%;
    border-radius: 5%;

    


    
`


const RenderPage = ({ pageName }) => {

  let renderMe;
  let count = 0;
  //console.log(pageName);
  if (pageName == "Sorting Algorithms") {
    renderMe = (<IconSorter key ={++count}/>)
  }
  else if (pageName == "Web Assembly"){
    renderMe = <WasmLogo key = {++count}/>
  }
  else if (pageName == "Blockchain"){
    renderMe = <BlockchainLogo key={++count}></BlockchainLogo>
  }
  else if (pageName == "CV"){
    renderMe = <CVLogo></CVLogo>
  }
  else {
    count++;
    renderMe = (
      <Link key = {count} href="/">
        <a key = {++count}>

          <ImageRandom key = {++count} name={name} />
        </a>
      </Link>
      )
  }


  return(<>
    {renderMe}
    </>
  )


}

/*
if (pageName == "Web Assembly"){
    renderMe = <p>a</p>
  }
<WasmLogo key = {++count}/>
*/