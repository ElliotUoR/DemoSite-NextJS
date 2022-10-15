import styled from "styled-components";
import style from "./blockchain.module.css";
import { keyframes } from "styled-components";



export default function FloatingText({children ,type, callback, infinite, id}){

    //console.log(type.toString());



    return(
            <HashText infinite={infinite} success = {type.toString()} onAnimationEnd={() => {if(callback){callback(id)}}}><span>{children}</span></HashText>
    );
}




const animationFail = keyframes`
    0% {opacity: 1; transform: translateY(0px);}
    90% {opacity: 0; transform: translateY(-50px);}
    100% {opacity: 0; transform: translateY(-50px);}
`

const animationSuccess = keyframes`
    0% {opacity: 1; transform: translateY(0px);}
    90% {opacity: 0.5; transform: translateY(-70px);}
    100% {opacity: 0; transform: translateY(-70px);}
`


const HashText = styled.span`
    display: inline-block;
    color: ${props => props.success === 'true' ? 'green' : 'red'};
    font-family: monospace !important;
    font-weight: bold;
    font-size: 1.3rem;
    //position: absolute;
    span{
        display: inline-block;
        opacity: 0;
        animation-name: ${props => props.success === 'true' ? animationSuccess : animationFail};
        animation-duration: 1.5s;
        animation-fill-mode: forwards;
        animation-iteration-count: ${props => props.infinite ? 'infinite' : 1};
        animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
    }

    
`

//font-size was 1.3rem 