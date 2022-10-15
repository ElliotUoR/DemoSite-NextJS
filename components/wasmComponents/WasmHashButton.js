import { useState } from 'react'
import * as wasm from '../../Rust/pkg'

import style from './WasmComponents.module.css'
import styled from 'styled-components'
import Switch from '../Switch'
import WasmCodeHighlighter from './WasmCodeHighlighter'
import { useSelector } from 'react-redux'

export default function WasmHashButton() {

    const [hashShow, changeHashShow] = useState(true)

    const [hashValue, changeHashValue] = useState("null")

    const [inputText, changeInputText] = useState("null")

    const [nonceValue, changeNonce] = useState(0);


    const [lastNonceHashed, changeLastNonceHashed] = useState(true);

    const [lastWordHashed, changeLastWordHashed] = useState("null");

    const [switchValue, setSwitchValue] = useState(false);

    const [anim, setAnim] = useState(false);

    const theme = useSelector((state) => state.counter.theme);



    const Assemcode = `#[wasm_bindgen]
pub fn hashInput(input : &str) -> String{
    let mut hasher = Sha256::new();
    hasher.update(input.as_bytes());
    let result = hasher.finalize();
    let strResult: String = format!("{:X}",result);
    strResult.into()
    }`
    const Assemcode2 =
        `#[wasm_bindgen]
pub fn hashInputNonce(input : &str, nonce : bool) -> String{
    if (nonce){
        unsafe { NONCEV += 1;
        let t = format!("{}{}", input, NONCEV);
        return hashInput(&t.to_owned());}
    } 
    hashInput(input)
}`

    async function retrieveHash() {
        let result = wasm.hash();
        changeHashValue(result);
    }

    async function customHash() {
        changeLastWordHashed(inputText);
        let temp = hashValue;
        let result = wasm.hashInputNonce(inputText, switchValue);
        let newNonce = wasm.getNonce();
        if (!switchValue) {
            changeNonce('disabled');
        }
        else {
            changeNonce(newNonce);
        }
        if (temp != result) {
            setAnim(true);
            changeHashValue(result);
        }
    }

    function toggleHash() {
        changeHashShow(!hashShow);
    }

    function handleChange(event) {
        changeInputText(event.target.value);
        //console.log(event.target.value);
    }

    function callback() {
        setAnim(false);
    }


    return (
        <div>
            <TitleCon>SHA256 Hasher</TitleCon>

            <div className={style.buttonContainer}>

                <HashButton onClick={customHash}>Create Hash</HashButton>
                <p>Input:</p>
                <label>

                    <input type="text" name="name" autoComplete='off' onChange={handleChange} />
                </label>
            </div>
            <ResultText theme={theme} animate={anim} onAnimationEnd={callback}>Hash Result: {hashValue}</ResultText>

            <Container>

                <p>Last Hash - Input: {lastWordHashed}  Nonce: {nonceValue} {switchValue ? '(On)' : '(Off)'}</p>
                <Switch
                    isOn={switchValue}
                    handleToggle={() => setSwitchValue(!switchValue)}
                />
            </Container>
            <WasmCodeHighlighter renderMe={Assemcode} renderMe2={Assemcode2}></WasmCodeHighlighter>
        </div>
    )
}


//<button onClick={retrieveHash}>Render WASM Hash</button> //bad function :()


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

    display: flex;
    justify-content: center;
    text-align: center;

    transition: color 500ms linear, text-shadow 500ms linear;

    @media screen and (max-width: 550px) {
        font-size: calc(1vh) !important;
    }
`


const HashButton = styled.button`

    background-color: aqua;
    color: darkblue;

    padding-left: 0.9rem;
    padding-right: 0.9rem;
    padding-bottom: 0.7rem;
    padding-top: 0.7rem;

    &:hover{
        background-color: paleturquoise;
    }

    &:active{
        background-color: palegoldenrod;

    }


    transition: background-color 300ms linear;

`


const Container = styled.div`

    display: flex;
    justify-content: center;

    

`


const TitleCon = styled.div`

    display: flex;
    justify-content: center;

    font-size: calc(2vh);

    font-weight: bolder;

`