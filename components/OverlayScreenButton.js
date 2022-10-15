import { useState } from "react";
import styled, { keyframes } from "styled-components";
import BlurOverlay from "./BlurOverlay";
import {sleep} from "./common";

export default function OverlayScreenButton() {

    const [activeState, toggleActiveState] = useState(false);

    const [inbetweenState, toggleInbetState] = useState(false);

    async function toggleActive() {

        
        let temp = !activeState;
        if (!temp){
            await sleep(90);
        }
        toggleActiveState(currentState => !currentState);

        if (!activeState) {
            inbetState();
        }


    }

    function inbetState() {
        toggleInbetState(currentState => !currentState);
        //console.log(inbetweenState)
    }

    function CheckifDone(state) {
        if (!state) {
            toggleActive();
        }
    }

    return (
        <Wrapper>
            <button onClick={toggleActive}>Technical Skills</button>
            {activeState ? <OverlayDisplay currentState={inbetweenState} inbetCallback={inbetState} callback={CheckifDone} /> : null}
        </Wrapper>
    )
}


const OverlayDisplay = ({ callback, currentState, inbetCallback }) => (
    <>
        <BlurOverlay curState={currentState} />
        <Overlay curState={currentState} onAnimationEnd={() => { if (callback) { callback(currentState) } }}>
            <AniWrapper curState={currentState} >
                <ButtonX onClick={inbetCallback}>Close</ButtonX>
                <TextDiv>
                    <ul>Languages
                        <li>C# .Net Core, Java</li>
                        <li>Javascript</li>
                        <li>Python, Rust, Solidity</li>
                    </ul>

                    <ul> Web Techs
                        <li> HTML, CSS, ASP NET</li>
                        <li> React &#40;redux&#41;, NextJS</li>
                        <li> Web assembly - using Rust</li>
                        <li> Styled Components, Tailwind CSS</li>
                    </ul>

                    <ul> Other
                        <li>SQL, JSON</li>
                        <li>Regex, Mocha</li>
                    </ul>
                </TextDiv>



            </AniWrapper>
        </Overlay>

    </>

)



const FadeIn = keyframes`

0%{transform: scale(0);  width: 0%;};
    100%{transform: scale(1);  width: 80%};

`
const FadeOut = keyframes`

    0%{opacity: 1};
    100%{opacity: 0;};
    

`
/*

0%{height: 0%; width: 0%};
    100%{height: 490px; width: 80%};


0%{height: 490px; width: 80%;};
    100%{height: 0%; width: 80%;};

    0%{transform: scale(1);  width: 80%;};
    100%{transform: scale(0); max-height: 0vh; width: 0%; opacity: 0;};
*/


const Overlay = styled.div`
    position: absolute;
    background-color: black;
    color: aqua;
    
    max-height: ${props => props.curState ? '100vh' : '0vh'};
    width: ${props => props.curState ? '80%' : '0%'};
    
    display: flex;
    opacity: 0.7;
    padding-left: 1rem;
    overflow: hidden;
    animation-name: ${props => props.curState ? FadeIn : FadeOut};
    animation-duration: 0.5s;

    
    transition: max-height 0.5s linear, width 0.5s linear;
    


    
`
/*

0%{opacity: 1};
    100%{opacity: 0;};
max-height: ${props => props.curState ? '100vh' : '0vh'};


height: ${props => props.curState ? '490px' : '0%'};

@media screen and (max-width: 550px) {
        
        aspect-ratio: 7/6;
    }

*/
const FadeTextIn = keyframes`

    0%{opacity: 0}
    35%{opacity: 0}
    100%{opacity:1}
`

const FadeTextOut = keyframes`
    0%{opacity: 1}
    35%{opacity: 0}
    100%{opacity:0}
`

const AniWrapper = styled.div`


    animation-name: ${props => props.curState ? FadeTextIn : FadeTextOut};
    animation-duration: 0.75s;
`


const Cover = styled.div`
    backdrop-filter: blur(5px);
    position: absolute;
    background-color: grey;

    top:0px;
    right:0px;
    bottom:0px;
    left:0px;

    display: flex;
    opacity: 0.3;
    
    
`

const ButtonX = styled.button`
     position:absolute;
     background-color: red;
     color: black !important;
     top:0;
     right:0;
     border-color: black;
     padding: 5px 5px !important;

    :hover {
        background-color: pink;

    }

    :active {
        background-color: darkred;
    }

    animation: float 1.5s infinite alternate;

    @keyframes float {
      from{
        transform: translateY(0.5em);
      }

      to {
        transform: translateY(-0.5em);
      }
    }


`


const Wrapper = styled.div`
    position: relative/fixed/absolute;
    justify-content: space-around;
    align-items: center;
    display: flex;
    gap: 2rem;

    button{
        color: green;
        font-family: monospace;
        padding: 10px 30px;
    }

`

const TextDiv = styled.div`

    animation: loadIn 1.5s;
    color: aqua;

    @keyframes loadIn{
        0% {color: blue; transform: translateX(10rem);  opacity: 0;};
        20% {color:blue; };
        100% {color:aqua;};
    }

`


/*todo:

work out how to overlay in css

try use 'context' on read about it more

work on css learning page, try and design components to look nice
and also design cool shapes/stuff in css

animation for background

animations for buttons/loading pages in, good start is the More button

perhaps use - useeffect with [text] as dependancy array

test out using useMemo with an const object and then changing it and using useEffect to 
log the change (with a dependancy array attached to the object)

test out use transition

look into lazy loading and suspense - load lazy content inside <suspense> tag
and add a fallback=<div>content</div> that is used while loading


consider 'redux' library to avoid prop drilling

also look at the context api

to pass lots of data at same time use spread props e.g.

data ={
    id: xx
    name: "xxx"
    age: xx
}
<User id={id},name={name},age={age}/> is bad instead use

<User {...data}/>

look more into event handlers


interesting libaries:
greensock -animation
scrollmagic - scoll animations


animated containers - scoll down as they get larger,
same for successful hash view

react query

sveltekit - for new website

p5js - animation library

picardio website for js source 

*/

