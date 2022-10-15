import styled, { keyframes } from "styled-components"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react";

let loaded = false;
export default function LayoutMain({children}){

    const theme = useSelector((state) => state.counter.theme);

    const [currentClass, setClass] = useState("darkMode");

    useEffect(() => {
      
        if (!loaded){
            loaded=true;
        }
        
    

    }, [theme])
    

    return (
        <Main theme={theme}>{children}</Main>
    )
}


const getAnimation = (props) => {
    if (props.theme === 1){
        console.log("gtr");
        //return greyToRed;
    }
    else{
        console.log("rtg");
        //return redToGrey;
    }


}

const getColor = (props) => {
    if (props.theme === 1){
        return 'rgb(23,129,147,0.6)';
    }
    else{
        return 'rgb(77, 77, 77,0.6)';
    }
    //return 'rgb(255, 51, 51,0.6)';
}

const InOut = keyframes`

    0% {opacity: 0.7;}
    50% {opacity: 0;}
    100% {opacity: 0.7}
`

const checkAni = (props) => {

}

const Main = styled.main`

 background-color: ${getColor};

 border: black;
 border-style: solid;
 border-width: thick;
 padding: 0.5rem;
 gap: 0.5rem;
 flex-flow: column;
 top: 100px;
 bottom: 0;
 height: fit-content;
 width: 100%;
 border-radius: .5rem;
 transition: background-color 1000ms linear;

 overflow: hidden;

 
`
