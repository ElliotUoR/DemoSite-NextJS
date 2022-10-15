import hljs from 'highlight.js'
import javascript from 'highlight.js/lib/languages/javascript';
import { useState, useEffect } from 'react'
import styled from 'styled-components';

import rust from 'highlight.js/lib/languages/rust'

hljs.registerLanguage('rust', rust)
hljs.registerLanguage('javascript', javascript)
export default function WasmCodeHighlighter({ renderMe, renderMe2 }) {

    const string = "#[wasm_bindgen] pub fn add(n1: i32, n2: i32) -> i32 { unsafe { i = n1 + n2 + i}; unsafe {i}"

    const [active, setActive] = useState(false);

    useEffect(() => {
        hljs.highlightAll();
    }, []);


    function toggleActive(){
        setActive(current => !current);
    }


    return (
        <>
            <Container2>
            <Container>
                <QuestionButton active={active} onClick={toggleActive}>?</QuestionButton>
                <PreSet active={active}>
                    <CodeSet className="rust">{renderMe}
                    </CodeSet>
                    {renderMe2 ? <CodeSet className='rust'>{renderMe2}</CodeSet> : <></>}
                </PreSet>
            </Container>
            </Container2>

        </>
    )
}

/*
<p>
    </p>

background-color: rgba(0,0,0,0);
*/



const PreSet = styled.pre`

        opacity: 1;
        display: ${props => props.active ? 'inline-block' : 'none'};
        justify-content: center;
        padding-top: 0.5rem;
        overflow: visible  !important;

        
    

`


const CodeSet = styled.code`
    background-color: rgba(0,0,0);
    
    font-size: calc(1.4vh) !important;

        @media screen  and (max-width: 550px) {
        font-size: calc(1.0vh) !important;
        span{
            font-size: calc(1.0vh) !important;
        }
        }

`

const Container = styled.div`

    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    position: relative;

    &:hover{
        ${PreSet}{
            display: inline-block;
        }
    }

`

const Container2 = styled.div`

    display: flex;
    justify-content: center;
    

`

const QuestionButton = styled.button`

    font-weight: bolder;
    color: yellow;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    border-radius: 50%;
    background-color: rgba(20,20,20);
    align-self: center;
    background-color: ${props => props.active ? 'grey' : 'black'};

    &:active{
        background-color: grey;
    }

    @media screen  and (max-width: 550px) {
        padding-left: 0.5rem !important;
        padding-right: 0.5rem !important;
    }

`


/*

&:hover {
        ${PreSet}{
            display: inline-block;
        }
    }

*/