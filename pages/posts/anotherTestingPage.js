import styled from "styled-components";
import RedirectButton from "../../components/RedirectButton";
import BackgroundObjects from "../../components/backgroundComps/BackgroundObjects";

//use this page for css testing dont use layout here

export default function anotherTestingPage() {


    return (
        <>
            
            <ButtonWrapper>
                <RedirectButton target="wasmTesting">Wasm Testing</RedirectButton>
                <RedirectButton target="blockchain">Blockchain Sim</RedirectButton>
                <RedirectButton target="chess">Chess</RedirectButton>
            </ButtonWrapper>

            <ButtonWrapper>
                <p>helo</p>
                <p> testing</p>
                <p>abc</p>
            </ButtonWrapper>
        </>
    )
}

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-around;

`