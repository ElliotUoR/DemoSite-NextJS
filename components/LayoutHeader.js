import styled from "styled-components";
import ThemeToggle from '../components/backgroundComps/ThemeToggle'
import Link from 'next/link';
import { useRouter } from 'next/router'
import Image from 'next/image';

import Socials from "./Socials";

export default function LayoutHeader() {

    const router = useRouter();

    return (
        <Header>
            <ExtraContainer>
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                <HomeButton onClick={() => router.push('/')}><i className="fa fa-home"></i></HomeButton>
                <Link href = "/"><MobileText href="/">Elliot Jordan - Demo Site</MobileText></Link>
            </ExtraContainer>

            <div></div>
            

            

            <ExtraContainer>
            <SocialsContainer>
            <Socials/>
            </SocialsContainer>
            
            <div>
            <ThemeToggle />
            </div>

            </ExtraContainer>


        </Header>

    )
}

/*

<Link href="/">Elliot Jordan - Demo Site </Link>

*/

const MobileText = styled.a`

    color:white;


@media screen and (max-width: 350px) {
    text-color: black;
    font-size: xx-small;
    display: none;
}

`

const Header = styled.div`

    left: 0;
    right: 0;
    top: 0;

    color: white;
    

    padding-top: 0.1em;
    padding-left: 0.3em;

    height: 2em;

    position: absolute;

    display: flex;
    justify-content: space-between;

    background-color: black;

`

const HomeButton = styled.button`
    margin: 0 !important;
    padding: 0 !important;
    margin-left: 0.5em !important;
    margin-right: 0.5em !important;
`

const ExtraContainer = styled.div`
display: inline-flex;
`

const SocialsContainer = styled.div`
    display: flex;
    flex-direction: row-reverse;
`
