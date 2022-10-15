import { useState, useEffect } from 'react'
import * as wasm from '../../Rust/pkg'
import FloatingText from '../blockchainComps/FloatingText'
import styled from 'styled-components';
import { sleep } from '../common';



//Generates a Hash and returns it as a component, prop 'float'
//dictates whether component type if 'floatingText;
export default function WasmHash({ float, nonce, hashTarget, callback, id, solveCallback }) {

    const [hashState, changeHashState] = useState("null");

    const [success, setSuccessStatus] = useState(false);

    useEffect(() => {
        hash();
    },[]);

    async function hash() {
        let result = wasm.hashInputWithNonce(hashTarget, nonce);
        changeHashState(result);
        checkSuccess(result);

    }

    function checkSuccess(result) {
        let state = result[0] == '0';
        setSuccessStatus(state);
        
        if (state) {
            solveCallback(result);
        }
    }



    return (
        <>
            {float ? <FloatingText id={id} callback={callback} type={success}>{hashState}</FloatingText> : <Wrapper>{hashState}</Wrapper>}
        </>
    )

}

const Wrapper = styled.div`
    margin-left: 0.2rem;
    color: papayawhip;
`