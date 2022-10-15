import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import StaggeredText from "./StaggeredText";


export default function HashUpdateText({ children, counter, fullUpdate, interval }) {

    const [animationState, setAnimationState] = useState(false);

    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        //console.log(children + counter);
        if (loaded){
        setAnimationState(true);
        }
        else{
            setLoaded(true); //ensures animations dont trigger on page load
        }
    }, [counter])

    function AnimationOver() {
        //console.log(children + "ani over");
        setAnimationState(false);
    }

    return (
        <Container>
            {fullUpdate ?
                <FullTextWriter interval = {interval} string={counter.toString()} animationState={animationState} callback={AnimationOver}>{children} </FullTextWriter>
                :
                <TextWriter interval ={interval} string={counter.toString()} animationState={animationState} callback={AnimationOver}>{children} </TextWriter>
            }
        </Container>

    )


}

const TextWriter = ({ string, children, animationState, callback, interval }) => {

    return (
        <>
            <StaticLetter>{children}</StaticLetter>
            {[...string].map((letter, i) => (
                <AnimatedLetter interval={interval} animationState={animationState} onAnimationEnd={() => { if (callback) { callback() } }} delay={i} key={i} stringLength={string.length}>{letter}</AnimatedLetter>

            ))}

        </>
    );
};


const FullTextWriter = ({ string, children, animationState, callback, interval }) => {

    return (
        <>
            <AnimatedTextBase interval={interval} animationState={animationState} stringLength={string.length}>{children}</AnimatedTextBase>
            {
                [...string].map((letter, i) => (
                    <AnimatedLetterFull interval={interval} animationState={animationState} onAnimationEnd={() => { if (callback) { callback() } }} delay={i} key={i} stringLength={string.length}>{letter}</AnimatedLetterFull>

                ))}


        </>
    );
};

/*

*/


const StaticLetter = styled.span`
    color: papayawhip;

    margin-block-start: 1em;
    display: inline-block;
`

const AnimatedTextBase = styled.span`



    color: papayawhip;
    margin-block-start: 1em;
    display: inline-block;
    animation: ${props => props.animationState ? colourSwitch : null};
    animation-duration: ${props => Math.max(props.stringLength * 0.35,Math.min(props.interval/1000*3,2.5)) + "s"};
    animation-iteration-count: 1;

    

`

/*
animation-duration: ${props => Math.min(0.5,props.stringLength * 0.3) + "s"};
*/

const colourSwitch = keyframes`
    0%{color: papayawhip;}
    50%{color: green;}
    1000%{olor: papayawhip;}
`

const colourSwitchAndFloat = keyframes`

    0%{transform: translateY(0.0em); color:papayawhip;}
    50%{transform: translateY(-0.075em); color:rgb(215, 197, 0);}
    1000%{transform: translateY(0.0em); color:papayawhip;}

`


const AnimatedLetter = styled.span`

    color: papayawhip;

    margin-block-start:0 1em;
    display: inline-block;
    animation: ${props => props.animationState ? quickFloat : null};
    animation-iteration-count: 1;

    animation-delay: ${props => ((props.delay / 10)/props.stringLength) + "s"};
    animation-duration: ${props => Math.min(props.stringLength * 0.3,props.interval/1000*0.7) + "s"};
    animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
    
    

`
//max animation delay + duration = time to run for


const AnimatedLetterFull = styled.span`

    color: papayawhip;

    margin-block-start:0 1em;
    display: inline-block;
    animation: ${props => props.animationState ? colourSwitchAndFloat : null};
    animation-iteration-count: 1;

    animation-delay: ${props => ((props.delay / 10)/props.stringLength) + "s"};
    animation-duration: ${props => Math.max(props.stringLength * 0.35,Math.min(props.interval/1000*3,2.5)) + "s"};
    animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
    
    

`


const quickFloat = keyframes`
    0%{transform: translateY(0.0em)}
    50%{transform: translateY(-0.075em)}
    1000%{transform: translateY(0.0em)}

`


const Container = styled.div`
    display: inline-block;
    white-space: normal;
    flex-wrap: wrap;

    

`


