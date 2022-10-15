import { useEffect } from "react";
import styled from "styled-components";

export default function FallingCompCreater({ list, theme }){


    let setupList = list.slice(0);
    //console.log(setupList);
    let renderArray = [];

    setupList.forEach((item, index) => {
        renderArray.push(<DyanmicFallingComp key={index} {...item} theme={theme} />)
    })


    return (
        <CompWrapper>
            {renderArray}
        </CompWrapper>
    )


}


function colorPreset(string) {

    let colorr;
    let offsetr;
    let colorg;
    let offsetg;
    let colorb;
    let offsetb;
    switch (string) {
        case true:
            [colorr, offsetr, colorg, offsetg, colorb, offsetb] = [70, 20, 50, 200, 50, 215]
            break;
        default: //green
            [colorr, offsetr, colorg, offsetg, colorb, offsetb] = [30, 15, 50, 70, 30, 15]
            break;

    }
    colorr = Math.round(Math.random() * colorr) + offsetr;
    colorg = Math.round(Math.random() * colorg) + offsetg;
    colorb = Math.round(Math.random() * colorb) + offsetb;

    return 'rgba(' + (colorr) + ',' + (colorg) + ',' + (colorb) + ',0.6)';


}



//args for DyanmicFallingComp
// {start (-2vh,10vh)}- {length (90-100vh)} {left (1-99vh)}
// {animationSpeed 10-20s}
let baseIce = [20,200,215];
let baseGreen = [15,70,15];
const setColor = (props) => {
    if (props.theme === 1){
        return 'rgba(' + (baseIce[0]+props.offSet[0]) + ',' + (baseIce[1]+props.offSet[1]) + ',' + (baseIce[2]+props.offSet[2]) + ',0.6)';
    }
    else{
    return 'rgba(' + (baseGreen[0]+props.offSet[0]) + ',' + (baseGreen[1]+props.offSet[1]) + ',' + (baseGreen[2]+props.offSet[2]) + ',0.6)';
    }
}

const DyanmicFallingComp = styled.li`
   position: absolute;
   z-index: 1 !important;
   overflow: hidden;
   display: block;
   list-style: none;
   width: 10px;
   height: 10px;
   background: ${setColor};
   top:-5vh;
   animation: anim linear infinite;
   animation-duration: ${props => props.duration};
   border-radius: 25%;
   left: ${props => props.pos};

   transition: background-color 1000ms linear;

   animation-delay: ${props => props.delay};

   @keyframes anim {
    0%{
        transform: translateY(0vh) rotate(0deg);
        opacity: 1;
    
    }

    100%{
        transform: translateY(95vh) rotate(720deg);
        opacity: 0;

    }
   }

`

const CompWrapper = styled.div`

    position: relative/fixed/absolute;
    overflow: hidden;
`