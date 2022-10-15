import { useState, useEffect } from "react";
import styled from "styled-components";



export default function WasmSelector({ callback, isLoading }) {

    const [selected, setSelected] = useState(0);

    const totalChoices = 3; //(nu)


    useEffect(() => {
        if (callback) {
            callback(selected);
        }
    }, [selected])



    function forward() {
        if (!isLoading) {
            if (selected >= totalChoices - 1) {
                setSelected(0);
                return;
            }
            setSelected(current => current + 1);
        }
        else {

        }

    }

    function backward() {
        if (!isLoading) {
            if (selected <= 0) {
                setSelected(totalChoices - 1);
                return;
            }
            setSelected(current => current - 1);
        }
    }

    return (

        <Container>
            <SelectionButton onClick={backward}>Prev</SelectionButton>
            <p>{selected + 1}/{totalChoices}</p>
            <SelectionButton onClick={forward}>Next</SelectionButton>
        </Container>
    )

}


const Container = styled.div`

    display: flex;

    align-items: center;
    justify-content: center;

`

const SelectionButton = styled.button`

    padding: 1rem;
    margin-right: 1rem;
    margin-left: 1rem;

`