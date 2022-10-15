import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import * as wasm from '../../Rust/pkg'
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import WasmCodeHighlighter from './WasmCodeHighlighter';



export default function WasmIntButton() {

    const Assemcode = `#[wasm_bindgen]
    pub fn add(n1: i32, n2: i32) -> i32 {
        unsafe { i = n1 + n2 + i};
        unsafe {i}
    }`

    const [num, changeNum] = useState(wasm.add(0,0))

    const [show, changeShow] = useState(false)

    const [started, setStarted] = useState(false);

    useEffect(() => {
        if (!started) {
            setStarted(true);
            return;
        }
        changeShow(true);

    }, [num])

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const theme = useSelector((state) => state.counter.theme);

    async function addWasmInt() {
        let result = await wasm.add(x, y);
        changeNum(result);


    }

    function finishedAni() {
        changeShow(false);
    }


    function handleChange1(event) {
        setX(event.target.value);
        //console.log(event.target.value);
    }

    function handleChange2(event) {
        setY(event.target.value);
        //console.log(event.target.value);
    }



    return (
        <div>

            <div>
            </div>
            <TitleCon>Addition</TitleCon>
            <AdditionContainer>
                <Para>{num}</Para>
                <Para>+</Para>
                <InputNum type="number" name="x" autoComplete='off' onChange={handleChange1} />
                <Para>+</Para>
                <InputNum type="number" name="y" autoComplete='off' onChange={handleChange2} />
                <CalcButton onClick={addWasmInt}>Calculate </CalcButton>
            </AdditionContainer>
            <ResultContainer><ResultText theme={theme} animate={show} onAnimationEnd={() => { finishedAni() }}>Result: {num}</ResultText></ResultContainer>
            <WasmCodeHighlighter renderMe = {Assemcode}/>

        </div>

    )
}



const Para = styled.p`

    margin: 0.2rem;

`


const AdditionContainer = styled.div`

    display: flex;
    align-items: center;
    justify-content: center;
    

`

const ResultContainer = styled.div`

    display: flex;
    justify-content: center;

`



const InputNum = styled.input`

    margin: 0.3rem;
    width: 3rem;
    height: 2rem;

`



const CalcButton = styled.button`

    background-color: darkred;
    margin-left: 3rem;
    padding: 0.5rem;

`



const ResultText = styled.p.attrs(
    ({ theme, animate }) => ({

        style: {
            color: (theme == 1) ? 'blue' : '#74FF34',
            textShadow: (theme == 1) ? '1px 1px 10px blue' : '1px 1px 10px #6BEE2E, 1px 1px 10px #74FF34',
            animation: animate ? 'animate 1s' : ''
        }
    })
)`

    @keyframes animate {
        0%{transform: translateY(0rem)}
        50%{transform: translateY(-0.5rem); color: 'gold'}
        100%{transform: translateY(0rem);}
    }

 transition: color 500ms linear, text-shadow 500ms linear;
`


const TitleCon = styled.div`

    display: flex;
    justify-content: center;

    font-size: calc(2vh);

    font-weight: bolder;

    margin-bottom: 0.3rem;

`