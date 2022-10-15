
import styled, { keyframes } from "styled-components"

export default function BlurOverlay({children, curState}) {


    return (
        <>
        <BlurTemplate curState={curState}>
            {children}
        </BlurTemplate>
        
        </>
    )
}

const FadeIn = keyframes`

    0%{ top: 50%; right:50%; left: 50%; bottom:50%;}
    100%{top: 0%;right: 0%;left: 0%;bottom: 0%;}

`

const FadeOut = keyframes`

    0%{top: 0%;right: 0%;left: 0%;bottom: 0%;}
    1%{backdrop-filter: blur(5px)}
    75%{backdrop-filter: blur(0px)}
    100%{ top: 50%; right:50%; left: 50%; bottom:50%;}

    

`

const BlurTemplate = styled.div`
    backdrop-filter: blur(5px);
    position: absolute;
    top: 0%;
    right: 0%;
    left: 0%;
    bottom: 0%;
    display: flex;
    justify-content: center;
    align-items: center;

    animation: ${props => props.curState ? FadeIn : FadeOut} ${props => props.curState ? '0.55s' : '0.75s'};

    background-color: rgb(0,0,0,0);

`