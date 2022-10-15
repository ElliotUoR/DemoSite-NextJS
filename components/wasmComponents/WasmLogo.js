import styled, { useTheme } from "styled-components";
import { useState, useEffect, useRef } from "react";
import { sleep } from "../common";

import { useSelector, useDispatch } from 'react-redux'


const BindLinesToText = ({ children, theme }) => {

    let renderList = [];
    let temp = children.slice(0);
    let count = 0;
    for (const obj of temp){
        //console.log(obj);
        renderList.push(<Line key = {count} theme = {theme} lineNumber = {obj.lineNum}>{obj.lineNum + ": " + obj.content}</Line>)
        count++;
    }
    return (
        <>
            {renderList}
        </>
    )



}

let mounted = false;
export default function WasmLogo() {

    const [lineList, setLines] = useState([]);

    const reference = useRef();
    reference.current = lineList;

    const theme = useSelector((state) => state.counter.theme);

    const [started, setStarted] = useState(false);

    const [active, setActive] = useState(true);

    useEffect(() => {

        if (!started) {
            setStarted(true);
            //generated initial 5 lines
            GenerateAssembly();
            
        }

        return () => {
            setActive(false);
            mounted = false;
        };
    }, [])

    async function GenerateAssembly() {
        let buffer = [];
        mounted = true;
        let newLine;
        let skipNext = false;
        let count = 0;
        let intDupeCheck = false;
        while (buffer.length < 5) {
            if (skipNext) {
                skipNext = false;
                intDupeCheck = true;
                buffer.push({content: " ", lineNum: ++count});
            }
            else {
                newLine = LineGen(intDupeCheck);
                if (newLine.substring(0, 3) == 'int') {
                    skipNext = true;

                }
                intDupeCheck = false;
                buffer.push({content: newLine, lineNum: ++count});
            }

        }
        setLines(buffer);
        //console.log(reference.current);
        //bind result to line state var
        
        while (active && mounted) {

            await sleep(RandomSleep());
            if (skipNext) {
                skipNext = false;
                intDupeCheck = true;
                buffer.push({content: " ", lineNum: ++count});
            }
            else {
                newLine = LineGen(intDupeCheck);
                if (newLine.substring(0, 3) == 'int') {
                    skipNext = true;
                }
                intDupeCheck = false;
                buffer.push({content: newLine, lineNum: ++count});
                
            }
            buffer.shift(); //remove first element
            //bind
            updateArr(buffer);
            //console.log(reference.current);
        }
        console.log("unmounting");
    }

    const updateLineList = (arr) => {
        //const arrayValue = [...arrayValue];
        //arrayValue.push(arr);
        setLines(arr);
    }

    function updateArr(newArr) {
        let count = 0;
        const newState = reference.current.map(obj => {
            return { ...obj, content: newArr[count].content, lineNum: newArr[count++].lineNum}
        })
        setLines(newState);
    }



    return (
        <Wrapper>
            <BindLinesToText theme={theme}>{lineList}</BindLinesToText>
        </Wrapper>
    )

}







const start = ['global _start']

const commandList = ['movb', 'movw', 'mov', 'movl', 'pop', 'push', 'add', 'sub', 'inc', 'dec', 'imul', 'and', 'xor', 'or', 'jmp', 'cmp', 'neg']

const secondLine = ['edx', 'ecx', 'ebx', 'eax']

const movingLine = ['dx', 'cx', 'bx', 'ah']

const reserveStartList = 'num';

const reserveList = ['resb', 'resw', 'resd', 'resq', 'rest']

const stringList = ['msg', 'len', 'wor', 'rep', 'prt', 'stp', 'abc', 'ret', 'web', 'rct', 'nxt', 'jsx', 'cvs', 'reg'];

const callKernal = 'int';

const KernalLocs = ['0x21', '0x80', '80h']




function LineGen(dupeCheck) {
    let roll = RollDie();

    if (roll > 33) {
        return GenerateCommand();
    }
    else if (roll > 15 || dupeCheck) {
        return GenerateReserve();
    }
    else {
        return GenerateKernalCall();
    }
}

function GenerateCommand() {

    let cmd = PickRandomFromList(commandList);
    let roll;
    if (cmd.substring(0,3) === 'mov') {
        //roll for moving line / hex / secondLine
        roll = RollDie();

        if (roll < 20) {
            //hex
            cmd += " " + RollHex();
        }
        else if (roll < 60) {
            //moving line
            cmd += " " + PickRandomFromList(movingLine);
        }
        else {
            //second line
            cmd += " " + PickRandomFromList(secondLine);
        }
    }
    else {
        //roll for secondline or hex
        roll = RollDie();
        if (roll < 50) {
            //hex
            cmd += " " + RollHex();
        }
        else if (roll < 98) {
            //moving line
            cmd += " " + PickRandomFromList(movingLine);
        }
    }

    //finally roll for stringList or hex or number
    roll = RollDie();
    if (roll < 30) {
        cmd += " " + PickRandomFromList(stringList);
        //string list
    }
    else if (roll < 75) {
        //hex
        cmd += " " + RollHex();
    }
    else {
        //number
        cmd += " " + RollDie();
    }


    return cmd;
}


function GenerateReserve() {
    let res = reserveStartList;

    res += " " + PickRandomFromList(reserveList);

    res += " " + Roll64Int();

    return res;
}


function GenerateKernalCall() {

    let string = callKernal;

    //roll for kernalLocs
    string += " " + PickRandomFromList(KernalLocs);

    //next line should be gap

    return string;
}




function PickRandomFromList(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}


function Capatalize(str) {
    return str.toUpperCase();
}

function RandomSleep() {
    return Math.floor(Math.random() * 1900) + 100;
}

function RollDie() {
    return Math.floor(Math.random() * 100);
}

function RollHex() {
    let num = Math.floor(Math.random() * 255);
    return "0x" + num.toString(16);
}

function Roll64Int() {
    let roll = RollDie();
    if (roll < 12) {
        return 1;
    }
    return (Math.floor(Math.random() * 7) + 1) * 8;
}



const Line = styled.div.attrs(
    ({theme}) => ({

    style:{
        color: (theme == 1 ) ? 'red' : '#74FF34',
        textShadow: (theme == 1) ? '1px 1px 10px red' : '1px 1px 10px #6BEE2E, 1px 1px 10px #74FF34'
    }
})
)`

    white-space: nowrap;
    
    text-shadow:1px 1px 10px #6BEE2E, 1px 1px 10px #74FF34;
    font-size:0.7em;
    text-align:left;
    
    height: 1em;

    transition: color 500ms linear;
    user-select: none;


`

const Wrapper = styled.div`
    display: inline-block;
    word-wrap: break-word;

    width: 7rem;

    @media screen and (max-width: 550px) {
        width: 11rem !important;
    }

`