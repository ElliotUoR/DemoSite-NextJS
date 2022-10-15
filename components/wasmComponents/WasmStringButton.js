import { useState } from 'react'
import * as wasm from '../../Rust/pkg'
import styled from 'styled-components';
import WasmCodeHighlighter from './WasmCodeHighlighter';

export default function WasmStringButton() {
  const [stringWasm, changeStringWasm] = useState("null")


  const [lock, setLock] = useState(false);


  const Assemcode = `#[wasm_bindgen]
    pub fn pickRandomString() -> String {
        let vs = vec!["hello","wow","good luck","yes","no","sad face","null"];
        let sample: Vec<_> = vs
            .choose_multiple(&mut rand::thread_rng(), 1)
            .collect();
        sample[0].to_string()
    }`

  async function retrieveString() {
    if (!lock) {
      let result = wasm.pickRandomString();
      changeStringWasm(result);
      setLock(true);
    }
  }

  function callback() {
    setLock(false);
  }

  return (
    <>
      <TitleCon>Fortune Cookie</TitleCon>
      <Container>
        <button onClick={retrieveString}>Open Wasm Fortune</button>
        <CookieJar>
          <FortunePaper>{stringWasm}</FortunePaper>
          <FortuneTop anim={lock} />
          <FortuneBottom anim={lock} onAnimationEnd={callback} />
        </CookieJar>
      </Container>

      <WasmCodeHighlighter renderMe={Assemcode}></WasmCodeHighlighter>
    </>
  )
}



const Container = styled.div`

  display: flex;
  justify-content: center;

`

const TitleCon = styled.div`

    display: flex;
    justify-content: center;
    margin-bottom: 0.3rem;

    font-size: calc(2vh);

    font-weight: bolder;

`


const FortunePaper = styled.div`

  position: absolute;
  background-color: white;
  width: 7rem;
  height: 2.5rem;
  color: black;
  font-weight: bold;
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 0.5rem;
  margin-left: 0.5rem;
  border-width: 0.1rem;
  border-color: black;
  border-style: solid;
`


const FortuneTop = styled.div`

  background-color: #d19a66;
  width: 8rem;
  height: 2.25rem;
  position: absolute;
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
  top: 1.25rem;
  border-top: 0;
  border-width: 0.1rem;
  border-color: black;
  border-style: solid;

  animation: ${props => props.anim ? 'openTop 2s' : ''};

  opacity: ${props => props.anim ? 0 : 1};

  @keyframes openTop{

    0%{ opacity:1; transform: translateY(0) };
    100%{ opacity: 0; transform: translateY(3rem)}
  }

  transition: opacity 0.3s linear;
`


const FortuneBottom = styled.div`

  background-color: #d19a66;
  position: absolute;
  width: 8rem;
  height: 2.25rem;
  
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
  bottom: 1.35rem;
  border-bottom: 0;

  border-width: 0.1rem;
  border-color: black;
  border-style: solid;

  opacity: ${props => props.anim ? 0 : 1};

  animation: ${props => props.anim ? 'openBot 2s' : ''};

  @keyframes openBot{

    0%{ opacity:1; transform: translateY(0) };
    100%{ opacity: 0; transform: translateY(-3rem)}
  }

  transition: opacity 0.3s linear;
`


const CookieJar = styled.div`
  margin-left: 8rem;
  height: 3rem;
  width: 8rem;
  display: flex;
  position: relative;

`