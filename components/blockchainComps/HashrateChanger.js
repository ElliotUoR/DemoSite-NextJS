import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import { setInterval } from "../redux/CounterSlice";


const baseIncrease = 50;
export default function HashrateChanger({ children }) {

    const interval = useSelector((state) => state.counter.interval);
    const dispatch = useDispatch();



    function IncreaseInterval() {
        dispatch(setInterval(interval + baseIncrease));
    }

    function DecreaseInterval() {
        dispatch(setInterval(interval - baseIncrease));
    }

    return (
        <Wrapper>
            <TriangleLeft onClick={DecreaseInterval}/>
            {children}
            <TriangleRight onClick={IncreaseInterval}/>
        </Wrapper>
    )
}


const TriangleLeft = styled.div`

    width: 0;
    height: 0;

    border-top: 1.5em solid transparent;
    border-bottom: 1.5em solid transparent;
    border-right: 1.5em solid black;
    cursor: pointer;
    transition: border-right 300ms linear;

    &:hover{
        border-right: 1.5em solid red;
    }
`

const TriangleRight = styled.div`

    width: 0;
    height: 0;

    border-top: 1.5em solid transparent;
    border-bottom: 1.5em solid transparent;
    border-left: 1.5em solid black;

    cursor: pointer;
    transition: border-left 300ms linear;

    &:hover{
        border-left: 1.5em solid green;
    }

`

const Wrapper = styled.div`

    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-right: 2rem;
    padding-top: 0.6rem;
`
