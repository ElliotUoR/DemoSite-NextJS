import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";

export default function SorterOption({ children, sorting, type, position, closing, callback}) {

    

    const [currentPos, setPos] = useState(0);

    const [loaded, setLoaded] = useState(false);

    const [chosen, setChosen] = useState(false);

    useEffect(() => {
        //console.log(children + counter);
        if (!loaded){
            setLoaded(true);
            setPos(position+1);
        }
        
    }, [])

    const map = {
        'Bubble' : 'Bubble Sort',
        'Quick' : 'Quick Sort',
        'Swap' : 'Manual Sort',
    }


    function RenderText(){
        return map[type];
    }

    function Clicked(){
        if (!sorting){
        callback(type);
        setChosen(true);
        }
        else{
            callback("null");
        }
        
    }

    return (
        <OptionBackdrop type = {type} onClick={Clicked} chosen = {chosen} position={currentPos} closing={closing}>{RenderText()}</OptionBackdrop>
    )
}




const OptionBackdrop = styled.div`

    margin-left: 0.5rem;
    display: inline-flex;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    color: ${props => props.type == "Bubble" ? "darkblue" : props.type == "Quick" ? "darkred" : "darkgreen"};
    background-color: lightyellow;
    font-size: larger;
    font-weight: bold;

    left: ${props => props.closing ? '0rem' : (props.position * 8) + 'rem'};

    position: absolute;
    border-radius: 10%;
    user-select: none;

    opacity: ${props => props.chosen || (props.position && !props.closing) ? 1 : 0};

    &:hover{
        cursor: pointer;
    }

    transition: left 300ms linear, opacity 300ms linear;
`