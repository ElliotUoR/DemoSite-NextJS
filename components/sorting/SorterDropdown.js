import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import SorterOption from "./SorterOption";
import { sleep } from "../common";
import WarningMessage from "./WarningMessage";
import { setSorter } from '../redux/CounterSlice'

export default function SorterDropdown({ type, sorting }) {

    const [open, setOpen] = useState(false);

    const [closing, setClosing] = useState(false)

    const [internalType, setType] = useState("Bubble");

    const [swapping, setSwapping] = useState(false);

    const [warning, setWarning] = useState(0);

    const selected = useSelector((state) => state.counter.sorter);
    const dispatch = useDispatch();

    useEffect(() => {

        setType(type);

    }, [])

    const map = {
        'Bubble': 'Bubble Sort',
        'Quick': 'Quick Sort',
        'Swap': 'Manual Sort',
    }

    function Open() {
        if (!sorting) {
            if (!open) {
                setOpen(true);
            }
            else {
                setClosing(true);
                Close();
            }
        }
        else {
            setWarning(current => current + 1);
        }

    }

    async function SelectionCallback(chosen) {
        if (sorting) {
            setClosing(true);
            await Close();
            setWarning(current => current + 1);
        }
        else {
            setClosing(true);
            setSwapping(true);
            await Close();
            setType(chosen);
            setSwapping(false);
            dispatch(setSorter(chosen));
        }

    }

    async function Close() {
        await sleep(300);
        setClosing(false);
        setOpen(false);
    }


    function RenderText() {
        return map[internalType];
    }



    return (
        <>
            <Wrapper>
                <WarningMessage warningLevel={warning} />
                <Background type={internalType} onClick={Open}>{RenderText()}</Background>
                {open ? <SorterOptions sorting={sorting} callback={SelectionCallback} currentType={internalType} closing={closing} /> : <></>}

            </Wrapper>
        </>
    )

}


const SorterOptions = ({ currentType, closing, callback, sorting }) => {

    let itemList = [];



    if (currentType != "Bubble") {
        itemList.push(<SorterOption key={1} sorting={sorting} type="Bubble" callback={callback} closing={closing} position={itemList.length}>b</SorterOption>)
    }
    if (currentType != "Quick") {
        itemList.push(<SorterOption key={2} sorting={sorting} type="Quick" callback={callback} closing={closing} position={itemList.length}>q</SorterOption>)
    }
    if (currentType != "Swap") {
        itemList.push(<SorterOption key={3} sorting={sorting} type="Swap" callback={callback} closing={closing} position={itemList.length}>s</SorterOption>)
    }

    return (
        <>
            {itemList}
        </>
    )

};



const Background = styled.div`

    margin-left: 0.5rem;
    display: inline-flex;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    color: ${props => props.type == "Bubble" ? "darkblue" : props.type == "Quick" ? "darkred" : "darkgreen"};
    background-color: lightyellow;
    font-size: larger;
    font-weight: bold;

    position: absolute;
    border-radius: 10%;
    user-select: none;

    &:hover{
        cursor: pointer;
    }

`

const Wrapper = styled.div`

    position: relative;
    padding-bottom: 2rem;
`