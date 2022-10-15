
import { useState } from 'react'
import style from '../../components/wasmTesting.module.css'

import Layout from '../../components/Layout'

import WasmStringButton from '../../components/wasmComponents/WasmStringButton'

import WasmIntButton from '../../components/wasmComponents/WasmIntButton'
import dynamic from 'next/dynamic'
import WasmSelector from '../../components/wasmComponents/WasmSelector'
import styled from 'styled-components'
import { sleep } from '../../components/common'

const WasmHashButton = dynamic(() => import('../../components/wasmComponents/WasmHashButton'), {
  ssr: false,
})


export default function WasmTesting() {

  const [wasmNum, setWasm] = useState(0);


  const [changing, setChange] = useState(false);

  const [loadIn, setLoadIn] = useState(false);

  const [loadOut, setLoadOut] = useState(false);


  const [starting, setStarted] = useState(false);

  function UpdateNum(num) {
    UpdateContent(num);
  }


  async function UpdateContent(num) {

    if (!starting) {
      setStarted(true); //this is triggered by WASMSelectors useEffect and as such can be ignored once
      return;
    }
    setChange(true);
    setLoadOut(true);
    await sleep(500);
    setLoadOut(false);
    setWasm(num);
    setLoadIn(true);
    await sleep(500);
    setLoadIn(false);
    setChange(false);
  }


  return (

    <Layout pageName="Web Assembly">
      
      <p>The following content has been developed using javascript that hooks into web assembly code written in rust.
        Web Assembly is useful when server side processing is not desired or available. Instead of javascript, more performant languages are used in place and compiled into usable web Assembly.</p>
        <p>This content demonstrates basic functions compiled into web assembly such as addition, hashing, and randomness. Click the ? button to see the Rust code for each function.</p>
      <WasmSelector callback={UpdateNum} isLoading={changing} />

      <Loader loadIn={loadIn} loadOut={loadOut}>

        <WasmComp num={wasmNum} />

      </Loader>





    </Layout>

  )
}


const WasmComp = (props) => {

  let result = <></>;

  switch (props.num) {
    case 0:
      result = <WasmIntButton />
      break;
    case 1:
      result = <WasmHashButton />
      break;
    case 2:
      result = <WasmStringButton />
      break;

  }

  return (
    <>
      {result}
    </>
  )
}



const Loader = styled.div`

  background-color: rgba(100,100,100,0);

  animation: ${props => GetAnimation(props.loadIn, props.loadOut)};

  @keyframes loadin{

    0%{opacity: 0};
    100%{opacity: 1};
  }


  @keyframes loadout{

    0%{opacity: 1};
    100%{opacity: 0};
  } 


`


const GetAnimation = (loadIn, loadOut) => {
  if (loadIn) {
    return 'loadin 0.5s';
  }
  if (loadOut) {
    return 'loadout 0.5s';
  }
  return '';
}