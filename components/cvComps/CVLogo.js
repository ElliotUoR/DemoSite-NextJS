import styled from "styled-components";
import { useEffect, useState } from "react";
import { sleep } from "../common";

let mounted = false;
export default function CVLogo(){

    const [fin,SetFinished] = useState(false);
    const [started, SetStarted] = useState(false)

    const [pageContents, setContents] = useState('');

    useEffect(() => {
        if (!started) {

            mounted = true;
            PageTimer();
        }

        return () => {

            mounted = false;
        };
    }, [])

    async function PageTimer(){
        const target = ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris';
        while (mounted){
            let charLimit = 175;
            let charCount = 0;
            
            
            await sleep(1000);
            SetFinished(current => !current);
            while(charCount < charLimit){
                setContents(current => current + target[charCount]);
                charCount++;
                await sleep(25);
            }
            await sleep(2000);
            setContents('');
            
        }
    }

    return(
        <Base>
            <PageHolder>
                <Page2/>
                <Page1/>
                <Page fin = {fin}>
                {pageContents}
                </Page>
            </PageHolder>
        </Base>
    )
}


const Base = styled.div`

    width: 10rem;
    height: 10rem;
    background-color: rgba(0,0,0,0);
    position: relative;

`




const Page = styled.div`

    position: absolute;
    background-color: #e9eaeb;
    aspect-ratio: 4/5;
    width: 6.5rem;
    border-width: 0.1rem;
    border-color: black;
    border-style: solid;
    overflow: hidden;
    overflow-wrap: break-word;
    padding-left: 0.5rem;
    font-size: xx-small;
    color: black;

    transition: transform 600ms linear;

    @media screen and (max-width: 550px) {
    
    font-size: calc(.75vh) !important;
    }

    user-select: none;

`

const Page1 = styled(Page)`

    transform: rotate(-2.5deg) translateX(-.5rem);

`


const Page2 = styled(Page)`

    transform: rotate(-5deg) translateX(-1.5rem);



`

const PageHolder = styled.div`

    display: flex;
    justify-content: center;
    
    &:hover {
        ${Page}{
            
            transform: rotate(2.5deg) translateX(1rem);
        }
        ${Page1}{
            transform: rotate(-15deg) translateX(-.75rem);
        }
        ${Page2}{
            transform: rotate(-20.5deg) translateX(-2.25rem);
        }
    }
    

`



//transform: rotate(2.5deg) translateX(1rem);

/*
animation: ${props => props.fin ? '' : ''};
@keyframes leave{
        0% {transform: translateX(0rem); opacity: 1}
        0% {transform: rotate(2.5deg) translateX(1rem); opacity: 1}
        100%{transform: rotate(5deg) translateX(10rem); opacity: 0}
    }
*/