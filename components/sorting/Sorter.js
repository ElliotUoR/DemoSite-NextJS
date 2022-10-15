import { useState, useEffect } from "react";
import { render } from "react-dom";
import styled, { keyframes } from "styled-components";
import SorterDropdown from "./SorterDropdown";

import { sleep } from "../common";


const Bubble = styled.div`


`

const RenderNumbers = ({ data, solved, type, interval }) => {

    let renderArray = data.slice(0);
    let itemArray = [];
    {
        renderArray.forEach((item, index) => {
            if (item) {
                itemArray.push(<Number key={index} solved={solved} type={type} interval={interval} position={item.position}>{item.number}</Number>);
            }
        })
    }
    return (
        <>
            {itemArray}
        </>
    )

}

export default function Sorter({ type }) {


    useEffect(() => {
        
        
        
    }, [type])

    const [numberList, updateList] = useState([])

    const [currentId, setId] = useState(0);

    const [threadLock, setLock] = useState(false);

    const [total, setTotal] = useState(0);

    const [sorted, setSorted] = useState(false);

    const [sortingStarted, setSortingStatus] = useState(false);

    const [pointerPosition, setPosition] = useState(0);

    const [movement, setMovement] = useState(false);

    const SortText = type === "Bubble" ? "BubbleSort" : "QuickSort";

    const [interval, setInverval] = useState(100);

    const [leftPointerPosition, setLeftPointer] = useState(0); //used in quick sort

    const [rightPointerPosition, setRightPointer] = useState(0); //used in quick sort
    //assume 50 innerwidth = 1 num

    async function GenerateClick() {
        if (!threadLock && !sortingStarted) {
            let maxAmount = calcMaxAmount();
            //console.log(maxAmount);
            //console.log(window.innerWidth);
            setLock(true);
            setSorted(false);
            let count = 0;
            //reset list here
            updateList([]);
            while (count < maxAmount - 1) {
                await sleep(100);
                GenerateNewNumber(count);
                count++;
                setId(id => id + 1);

            }
            setTotal(count);
            setLock(false);
        }


    }

    function calcMaxAmount() {
        if (window.innerWidth <= 550) {
            return Math.max(3, Math.min(Math.floor(window.innerWidth / 36), 36));
        }
        return Math.max(3, Math.min(Math.floor(window.innerWidth / 50), 36));
    }

    //randomly swap positions of two numbers
    function randomSwitch() {
        if (!threadLock && numberList.length > 0) {
            let tempTotal = total;
            let first = Math.floor(Math.random() * tempTotal);
            let second = Math.floor(Math.random() * tempTotal);
            while (second === first) {
                second = Math.floor(Math.random() * tempTotal);
            }

            let indexFirst = numberList[first];
            let indexSecond = numberList[second];

            swapNumbers(indexFirst, indexSecond);

        }

    }

    function randomMove() {
        if (!threadLock && numberList.length > 0) {
            let tempTotal = total;
            let first = Math.floor(Math.random() * tempTotal);
            let second = Math.floor(Math.random() * tempTotal);
            while (second === first) {
                second = Math.floor(Math.random() * tempTotal);
            }

            let indexFirst = numberList[first];

            moveNumber(indexFirst, second);
        }
    }


    function swapNumbers(indexFirst, indexSecond) {
        const newState = numberList.map(obj => {
            if (obj === indexFirst) {
                return { ...obj, position: indexSecond.position }
            }
            if (obj === indexSecond) {
                return { ...obj, position: indexFirst.position }
            }
            return obj;
        });
        updateList(newState);
    }

    function moveNumber(object, newPosition) {

        let oldPosition = object.position;
        if (oldPosition == newPosition) {
            return;
        }
        let movement = 0 >= (oldPosition - newPosition);
        const newState = numberList.map(obj => {

            if (object === obj) {
                return { ...obj, position: newPosition }
            }

            if (movement) { //entails movement forward
                //move back objs between old and new
                if (obj.position >= oldPosition && obj.position <= newPosition) {
                    return { ...obj, position: obj.position - 1 }
                }
            }
            else { //entails movement backwards
                //move forward objs between new and old
                if (obj.position >= newPosition && obj.position <= oldPosition) {
                    return { ...obj, position: obj.position + 1 }
                }
            }
            return obj
        })
        updateList(newState);
    }

    function beginSort() {
        if (!threadLock && numberList.length > 0 && !sortingStarted && !sorted) {
            setSortingStatus(true);
            if (type === "Bubble") {
                bubbleSort();
            }
            else {
                quickSort();
            }
        }
    }

    async function quickSort() {
        const max = numberList.length;

        let tempArray = numberList.slice(0);

        let pivotPoint = tempArray[Math.ceil(max / 2)];

        let result = [];

        //console.log("Pivot is: " + pivotPoint.number);
        //console.log("Swapped with: " + tempArray[max - 1].number);
        //begin quicksort

        setLeftPointer(Math.ceil(max / 2));
        setRightPointer(max - 1);

        await sleep(interval * 3);
        [tempArray[Math.ceil(max / 2)], tempArray[max - 1]] = [tempArray[max - 1], tempArray[Math.ceil(max / 2)]];
        //render update
        let newPositionList = createPositionList(max, tempArray);
        moveToList(newPositionList);
        //USE RECURSION
        //readArrayNum(tempArray);

        await quickSortRecursion(tempArray, 0, max - 2, pivotPoint.number, true);

        //console.log("quick sort fin");
        if (ensureSorted(tempArray)) {
            setSorted(true);
            setSortingStatus(false);
        }

        setLeftPointer(0);
        setRightPointer(max - 1);

    }

    function spareCode() {
        /*

let pivotIndex = max - 1;

let startPoint = 0;
let endPoint = pivotIndex - 1;

let leftPivotFinished = false;
let leftPivot = 0;
let rightPivotFinished = false;
let rightPivot = 0;

//step left until value higher/equal to pivot found
while (leftPivot < rightPivot && !leftPivotFinished) {
    if (tempArray[leftPivot].number >= pivotStack[workingPivotPoint].number) {
        leftPivotFinished = true;
    }
    else {
        leftPivot++;
    }
}

//once found step right until value lower than pivot found
while (leftPivot < rightPivot && rightPivotFinished) {
    if (tempArray[rightPivot].number < pivotStack[workingPivotPoint].number){
        rightPivotFinished = true;
    }
    else{
        rightPivot--;
    }
}

*/
    }

    function ensureSorted(tempArray) {

        let sorted = true;

        let temp = null;

        //console.log(tempArray);

        tempArray.map(obj => {
            if (temp === null) {
                temp = obj.number;
                //console.log("once");
            }
            else {
                //console.log(temp + " vs " + obj.number);
                if (temp > obj.number) {
                    //console.log("fail");
                    sorted = false;
                    return;
                }
                else {
                    temp = obj.number;
                }
            }
        })

        //console.log(sorted ? "sorted" : "not sorted!!");
        return sorted;
    }

    async function quickSortRecursion(tempArray, start, finish, number, startingUp) {

        let newPositionList;
        let max = tempArray.length;
        if (!startingUp) {
            let halfMax = Math.ceil((finish - start) / 2) + start;
            let pivotPoint = tempArray[halfMax];
            number = pivotPoint.number;
            //console.log("Pivot is: " + pivotPoint.number);
            //console.log("Swapped with: " + tempArray[finish].number);
            //begin quicksort
            await sleep(interval * 3);

            setLeftPointer(halfMax);
            setRightPointer(finish);

            await sleep(interval * 2);
            swapPlaces(halfMax, (finish), tempArray);
            //render update
            newPositionList = createPositionList(max, tempArray);
            moveToList(newPositionList);



            finish--; //review this line
        }

        await sleep(interval * 3)

        let leftPoint = start;
        let leftFound = false;
        let rightPoint = finish;
        let rightFound = false;

        setLeftPointer(leftPoint);

        setRightPointer(rightPoint);

        await sleep(interval * 3);


        let done = false;

        while (!done) {
            leftFound = false;
            rightFound = false;

            //check for higher/equal
            while (leftPoint <= rightPoint && !leftFound) {
                await sleep(interval);
                if (tempArray[leftPoint].number >= number) {
                    leftFound = true;
                    //console.log("left found at: " + tempArray[leftPoint].number + " (" + leftPoint + ")");
                }
                else {

                    leftPoint++;
                    if (rightPoint >= leftPoint) {
                        setLeftPointer(leftPoint);
                    }

                }
            }

            //check for lower
            while (leftPoint <= rightPoint && !rightFound) {
                await sleep(interval);
                if (tempArray[rightPoint].number < number) {
                    rightFound = true;
                    //console.log("right found at: " + tempArray[rightPoint].number + " (" + rightPoint + ")");
                }
                else {

                    rightPoint--;
                    if (rightPoint >= leftPoint) {
                        setRightPointer(rightPoint);
                    }

                }
            }

            if (leftFound && rightFound) {
                await sleep(interval);
                swapPlaces(leftPoint, rightPoint, tempArray);
                newPositionList = createPositionList(max, tempArray);
                moveToList(newPositionList);
                //console.log("swap with: " + tempArray[leftPoint].number + " and " + tempArray[rightPoint].number + " (" + leftPoint + ")" + ", (" + rightPoint + ")");
            }

            if (leftPoint > rightPoint) {
                done = true;
                //check if rightfound or leftfound (one must be true)
                //console.log("done");
            }


        }

        //console.log(tempArray);
        //readArray(tempArray);
        //swap at right point with pivot
        //console.log("comment out: max " + max);
        await sleep(interval);
        //console.log("pivot swap with: " + tempArray[rightPoint + 1].number + " and " + tempArray[finish + 1].number + " (" + (rightPoint + 1) + ")" + ", (" + (finish + 1) + ")");
        swapPlaces((rightPoint + 1), (finish + 1), tempArray);
        newPositionList = createPositionList(max, tempArray);
        moveToList(newPositionList);
        //two new arrays start,right-1 and right+1, finish+1



        //readArrayNum(tempArray);

        if ((rightPoint) - start >= 1) {
            //console.log("creating new array 1 from: " + (start) + " to " + (rightPoint));
            await quickSortRecursion(tempArray, start, (rightPoint), tempArray[Math.ceil((rightPoint) / 2)], false);
        }


        //console.log("array 2 size would be - " + ((finish + 1) - (rightPoint + 2)));
        //console.log("(" + (finish + 1) + ") , (" + (rightPoint + 2) + ")");
        if ((finish + 1) - (rightPoint + 2) >= 1) {
            //console.log("creating new array 2 from: " + (rightPoint + 2) + " to " + (finish + 1));
            await quickSortRecursion(tempArray, (rightPoint + 2), (finish + 1), tempArray[Math.ceil((finish + 1) / 2)], false);
        }


        return tempArray;


    }

    function swapPlaces(index1, index2, tempArray) {
        //console.log(tempArray);
        [tempArray[index1], tempArray[index2]] = [tempArray[index2], tempArray[index1]];
    }

    function readArray(tempArray) {
        tempArray.map(obj => {
            console.log(obj);
        })
    }

    function readArrayNum(tempArray) {
        tempArray.map(obj => {
            console.log(obj.number);
        })
    }

    async function bubbleSort() {
        const max = numberList.length;

        let iterationSize = max;

        let newPositionList;

        let tempArray = numberList.slice(0);

        //logList(numberList);

        //do bubblesort

        let movedLast = true;
        let solveCheck = false;

        for (let i = 0; i < max; i++) {
            solveCheck = true;
            for (let j = 0; j < iterationSize - i - 1; j++) {
                if (movedLast) {
                    await sleep(interval);
                }
                else {
                    await sleep(interval / 2);
                }
                if (tempArray[j].number > tempArray[j + 1].number) {
                    [tempArray[j], tempArray[j + 1]] = [tempArray[j + 1], tempArray[j]];
                    movedLast = true;
                    solveCheck = false;
                }
                else {
                    movedLast = false;
                }
                newPositionList = createPositionList(max, tempArray);
                moveToList(newPositionList);
                setMovement(movedLast);
                setPosition(j);
                //logList(tempArray);
            }
            if (solveCheck) {
                break;
            }
        }
        setSorted(true);
        setSortingStatus(false);
        //console.log(newPositionList);
        //logList(tempArray);


    }

    function logList(tempArray) {
        tempArray.map(obj => {
            console.log(obj.uniqueId + ":  " + obj.position + ", " + obj.number);
        })
        console.log("end");
    }

    function createPositionList(max, tempArray) {
        //create position list
        let newPositionList = Array(max).fill(0);
        for (let i = 0; i < max; i++) {
            newPositionList[tempArray[i].uniqueId] = i;
        }
        return newPositionList;

    }



    function moveToList(newPositionList) {

        //arg is list of ints

        let count = -1;
        const newState = numberList.map(obj => {
            count++;
            return { ...obj, position: newPositionList[count] }
        })
        updateList(newState);
    }

    function GenerateNewNumber(id) {
        let ranNum = Math.floor(Math.random() * 1000);
        let newNumberObj = { uniqueId: id, position: id, number: ranNum }
        updateList(current => [...current, newNumberObj])
        //console.log(newNumberObj);
    }

    return (
        <>
            <Wrapper>
                <SorterDropdown type={type} sorting = {sortingStarted}/>
                <NumberContainer sorted={sorted} sortingStatus={sortingStarted}>
                    <RenderNumbers data={numberList} interval={interval} type={type} solved={sorted} />
                    {sortingStarted && type === "Bubble" ? <PointerLine moved={movement} position={pointerPosition} interval={interval}></PointerLine> : null}
                    {sortingStarted && type === "Quick" ? <><QuickSortLeftPointer position={leftPointerPosition} interval={interval} /><QuickSortRightPointer position={rightPointerPosition} interval={interval} leftPos={leftPointerPosition} /></> : null}
                </NumberContainer>
                <ButtonSort onClick={GenerateClick}>Generate Numbers</ButtonSort>

                {type === "Swap" ?
                    (<><ButtonSort onClick={randomSwitch}>Random Swap</ButtonSort>
                        <ButtonSort onClick={randomMove}>Random Move</ButtonSort> </>)
                    :
                    <ButtonSort onClick={beginSort}>{SortText}</ButtonSort>
                }
                <Buffer />
                
            </Wrapper>

            <Buffer />


        </>

    )
}

const Wrapper = styled.div`

    margin-top: 1rem;
    padding-top: 1rem;
    background-color: rgb(88,37,83,0.25);
`


const Buffer = styled.div`

    margin-bottom: 3rem;
`


const TextTemplate = styled.div`

    margin-left: 0.5rem;
    display: inline-flex;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    color: ${props => props.type == "Bubble" ? "darkblue" : "darkred"};
    background-color: lightyellow;
    font-size: larger;
    font-weight: bold;

    border-radius: 10%;

`


const NumberContainer = styled.div`

    overflow: hidden;

    margin-left: 1rem;
    margin-top: 0.5rem;
    margin-right: 1rem;
    border-color: ${props => props.sorted ? "green" : props => props.sortingStatus ? "orange" : "white"};
    border-width: thick;
    border-style: solid;
    border-radius:.5rem;
    padding-top: .5rem;
    padding-bottom:0.5rem;

    padding-left: 0.5rem;

    background-color: black;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    min-height: 3.25rem;

    transition: border-color 500ms linear;

`

const Appear = keyframes`

    0%{opacity: 0; color:white}
    25%{color:white}
    50%{opacity: 1}
    100%{color:lightcoral}

`
const Celebrate = keyframes`

    0%{color: lightcoral }
    75%{color: gold; transform: translateY(-5px)}
    100%{color:lightcoral}


`

const Number = styled.div`
    color: lightcoral;

    position: absolute;
    left: ${props => (props.position * 2.5) + 'rem'};
    padding-left: 0.5rem;
    animation-name: ${props => props.solved ? Celebrate : Appear};
    animation-duration: ${props => props.solved ? '1s' : '0.75s'};
    animation-delay: ${props => props.solved ? (props.position * 0.05) + 's' : '0s'};

    :hover{
        color: white;
        transform: translateY(-3px);
    }
    transition: ${props => props.type === "Bubble" ? "color 250ms linear, transform 200ms linear, left " + props.interval * 2 + "ms ease-in-out" : "color 250ms linear, transform 200ms linear, left " + props.interval * 3 + "ms ease-in-out"};


`



const ButtonSort = styled.button`

    margin-left: 1rem;

`

const PointerLine = styled.div`

    position: absolute;
    left: ${props => (props.position * 2.51) + 'rem'};
    margin-left: 0.5rem;
    height: 2px;
    width: 1.6rem;
    background-color: white;
    top: 2rem;

    transition: ${props => props.moved ? ("left " + props.interval + "ms linear") : ("left " + (props.interval / 2) + "ms linear")};

`

const QuickSortLeftPointer = styled.div`

    position: absolute;
    left: ${props => (props.position * 2.51) + 'rem'};
    margin-left: 0.5rem;
    height: 2px;
    width: 1.6rem;
    background-color: blue;
    top: 2rem;

    transition: left ${props => props.interval + 'ms'} linear;


`

const QuickSortRightPointer = styled.div`

    position: absolute;
    left: ${props => (props.position * 2.51) + 'rem'};
    margin-left: 0.5rem;
    height: 2px;
    width: 1.6rem;
    background-color: ${props => (props.position === props.leftPos) ? 'green' : 'red'};
    top: 2rem;

    transition: left ${props => props.interval + 'ms'} linear, background-color ${props => props.interval + 'ms'} linear;

`

//padding-left: ${props => (props.position * 2.5) + 'rem'};