import { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux'
import {toggleTheme} from '../redux/CounterSlice'

export default function ThemeToggle(){

    const [toggle, setToggle] = useState(false); //states are true and false (light and dark) but more themes should be added, false = dark mode by default

    const theme = useSelector((state) => state.counter.theme);
    const dispatch = useDispatch();

    const [windowSize, setWindowSize] = useState(1000);

    function ButtonPress(){
        setWindowSize(window.innerWidth);
        let temp = !toggle;
        setToggle(current => !current);
        if(temp){
        document.querySelector("body").classList.add("lightmode");
        dispatch(toggleTheme(1));
        }
        else{
            document.querySelector("body").removeAttribute('class');
            dispatch(toggleTheme(0));
        }
        //console.log(theme);
    }

    function getText(toggle, windowWidth){
        if (windowWidth >= 450){
            return toggle ? 'Light Mode' : 'Dark Mode';
        }
        else{
            return toggle ? 'Light' : 'Dark';
        }
    }


    return(

        <ToggleButton onClick={ButtonPress}>{getText(toggle, windowSize)}</ToggleButton>

    )

}




const ToggleButton = styled.button`
    
    right: 0px;
    top: 0px;
    height: 1.7em;
    width: 6em;
    text-align: center;
    padding: 0;
    margin: 0;
    border-radius: 2px;



    border-color: white;

`
