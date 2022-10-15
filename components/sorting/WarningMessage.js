
import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { sleep } from "../common";

export default function WarningMessage({ warningLevel }) {

    const [active, setActive] = useState(false);


    useEffect(() => {

        if (warningLevel > 0) {
            if (!active){
            setActive(true);
            cooldown();
            }
        }

    }, [warningLevel])


    async function cooldown() {
        await sleep(1500);
        setActive(false);
    }

    return (

        <RedText active={active}>Cannot change while active...</RedText>
    )
}



const RedText = styled.div`

    color: red;
    position: absolute;

    left: 10rem;

    opacity: ${props => props.active ? 1 : 0};

    user-select: none;

    animation: ${props => props.active ? 'shakeMessage 500ms' : ''};

    transition: opacity 300ms linear;

    @keyframes shakeMessage{
    0% {transform: translateY(0px);}
    25% {transform: translateY(-6px);}
    50% {transform: translateY(6px);}
    75% {transform: translateY(-6px);}
    100% {transform: translateY(0px);}
    
    }


`

/*
display: ${props => props.active ? 'inline' : 'none' };
*/