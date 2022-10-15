import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";
import { sleep } from "../common";
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../redux/CounterSlice'
import FallingCompCreater from './FallingCompCreater'

let started = false;
let themeStarted = false;
export default function BackgroundObjects() {

    const theme = useSelector((state) => state.counter.theme);
    const [compArray, setArrayState] = useState([]);

    const [finishedGen, setGen] = useState(false);

    const reference = useRef();
    reference.current = compArray;

    useEffect(() => {

        if (!started) {
            started = true;
            passiveCreator(false);
        }

    }, [])


    async function passiveCreator(colorCode) {
        //create comps for 20s
        let time = Date.now();
        let position = "";
        let count = 0;
        let max = 50;
        let comp;
        let tempArray = [];
        let delay;
        let duration;
        let offsetb;
        let offsetg;
        let offsetr;
        while (count < max) {
            ++count;
            position = (Math.random() * 96) + 1 + "%";
            delay = (Math.random() * 20) + "s";
            [offsetr,offsetg,offsetb] = setOffset();
            duration = (10 + (Math.random() * 10) + "s");
            comp = { id: count, pos: position, delay: delay, duration: duration, offSet: [offsetr,offsetg,offsetb]}
            tempArray.push(comp);

        }
        setArrayState(tempArray);

        setGen(true);
    }

    return (
        <>
            {finishedGen ?
                <FallingCompCreater list={compArray} theme={theme} />
                : null
            }
        </>
    );

}

function setOffset(){
    return [Math.random()*50,Math.random()*50,Math.random()*50];

}
