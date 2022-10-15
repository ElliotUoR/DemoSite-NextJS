import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import RedirectButton from '../components/RedirectButton';
import styled from 'styled-components';
import OverlayScreenButton from '../components/OverlayScreenButton';
import Image from 'next/image';


export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <TextCentered>Hi, Welcome to my website. I am Elliot Jordan, a software engineer with multiple years experience in industry. </TextCentered>
        
        <ButtonWrapper>
          <RedirectButton target="WasmTesting">Web Assembly</RedirectButton>
          
          <RedirectButton target="blockchain2">Blockchain Example</RedirectButton>
          <RedirectButton target="cv"> CV</RedirectButton>
          <RedirectButton target="SortingPage">Sorting Algorithms</RedirectButton>
        </ButtonWrapper>
        <OverlayScreenButton/>
        
      </section>
    </Layout>
  );
}

const ImageDiv = styled.div`
  display: flex;
  justify-content: center;

`

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 2rem;
  row-gap: 0.2rem;
  justify-content: center;
  
`


const TextCentered = styled.p`

  text-align: center;
`



/*

<RedirectButton target="blockchain">Blockchain Sim</RedirectButton>
          <RedirectButton target="chess">Chess</RedirectButton>
          <RedirectButton target="anotherTestingPage">Testing</RedirectButton>
<RedirectButton target="testing3">Testing 3</RedirectButton>
          

  <p>
          (Welcome to website here is the {' '}
          <Link href="/posts/first-post">first page</Link>)

        </p>

*/