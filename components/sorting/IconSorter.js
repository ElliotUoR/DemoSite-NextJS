import styled from "styled-components";
import { sleep } from "../common";
import { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux'


const RenderBars = ({ array, theme }) => {
    let renderArray = array.slice(0);
    let itemList = [];
    let themeType = theme;
    //console.log(theme);
    //console.log(renderArray);
    let count = 0;
    for (const item of renderArray) {
        itemList.push(<Bar key={count} theme={themeType} id={item.id} position={item.position} height={item.value} finished={item.finished} />)
        count++;
    }

    return (
        <>
            {itemList}
        </>
    )
}

export default function IconSorter() {

    const theme = useSelector((state) => state.counter.theme);

    const [bars, setBars] = useState([]);

    const reference = useRef();
    reference.current = bars;

    useEffect(() => {

        GenerateBars4();
        //GenerateBars2();

    }, [])




    async function GenerateBars4() {

        let nums = [];

        for (let i = 0; i < 7; i++) {
            nums.push({ value: Math.floor(Math.random() * 8) + 1, id: i });
        }
        let sortNums = nums.slice(0).sort(function (a, b) { return a.value - b.value });


        let numObjArr = [];
        for (let i = 0; i < 7; i++) {
            numObjArr.push({ value: nums[i].value, position: i, id: i, realPosition: findObjectIndex(i, sortNums), finished: false });
        }

        setBars(numObjArr);

        Solve2();


    }

    function findObjectIndex(id, sortedArr) {
        for (let i = 0; i < sortedArr.length; i++) {
            if (sortedArr[i].id === id) {
                return i;
            }
        }
        return -1;

    }

    async function Solve() {
        let tempobj;
        await sleep(200);
        console.log(reference.current);
        for (const obj of reference.current) {
            await sleep(100);
            console.log(reference.current);
            if (obj.position == obj.realPosition) {
                console.log(obj.id + " in place");
            }
            else {
                await sleep(500);
                tempobj = findObjAtPosition(reference.current, obj.realPosition);
                if (tempobj.position == tempobj.realPosition) {
                    //fail safe no movement
                    console.log("fs")
                }
                else {
                    swapNumbers(obj, tempobj);
                    console.log("Swapping: " + obj.id + " with pos:" + obj.position + " actual of: " + obj.realPosition);
                    console.log("Swapped with: " + tempobj.id + " with pos:" + tempobj.position + " actual of: " + tempobj.realPosition);
                }
            }

        }
        console.log(reference.current);
    }

    async function Solve2() {
        let tempobj;
        await sleep(200);
        let workingArray = reference.current.slice(0);
        let tempPos;
        //console.log(reference.current);
        //console.log(workingArray);
        //console.log("abc");
        for (const obj of workingArray) {
            await sleep(100);
            //console.log(workingArray);
            if (obj.position == obj.realPosition) {
                //console.log(obj.id + " in place");
            }
            else {
                await sleep(500);
                tempobj = findObjAtPosition(workingArray, obj.realPosition);
                if (tempobj.position == tempobj.realPosition) {
                    //fail safe no movement
                    //console.log("fs")
                }
                else {
                    tempPos = obj.position;
                    obj.position = tempobj.position;
                    tempobj.position = tempPos;
                    //swapNumbers(obj, tempobj);
                    //console.log("Swapping: " + obj.id + " with pos:" + obj.position + " actual of: " + obj.realPosition);
                    //console.log("Swapped with: " + tempobj.id + " with pos:" + tempobj.position + " actual of: " + tempobj.realPosition);
                    //console.log(workingArray);
                }
                updateArr(workingArray);
            }

        }
        //console.log(workingArray);
        await sleep(400);
        updateArrFinished();
        await sleep(1000);
        GenerateBars4();
    }

    function findIndexAtPosition(arr, pos) {
        console.log(arr);
        console.log(pos);
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].position == pos) {
                console.log(i);
                return i;
            }
        }
        return -1;
    }

    function findObjAtPosition(arr, pos) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].position == pos) {
                return arr[i];
            }
        }
        return -1;
    }

    function updateArr(newArr) {
        let count = 0;
        const newState = reference.current.map(obj => {
            return { ...obj, position: newArr[count++].position }
        })
        setBars(newState);
    }

    function updateArrFinished() {
        const newState = reference.current.map(obj => {
            return { ...obj, finished: true }
        })
        setBars(newState);
    }

    function swapNumbers(indexFirst, indexSecond) {
        const newState = reference.current.map(obj => {
            if (obj === indexFirst) {
                return { ...obj, position: indexSecond.position }
            }
            if (obj === indexSecond) {
                return { ...obj, position: indexFirst.position }
            }
            return obj;
        });
        setBars(newState);
    }

    function moveNumber(object, newPosition) {

        let oldPosition = object.position;
        if (oldPosition == newPosition) {
            return;
        }
        let movement = 0 >= (oldPosition - newPosition);
        const newState = bars.map(obj => {

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
        setBars(newState);
    }

    function compare(a, b) {
        if (a.height < b.height) {
            return -1;
        }
        if (a.height > b.height) {
            return 1;
        }
        return 0;
    }

    function GetRandom(length) {
        return Math.floor(Math.random() * length);
    }




    return (

        <Container>
            <RenderBars theme={theme} array={reference.current}></RenderBars>
        </Container>

    )

}


const Container = styled.div`

    margin-top: 10rem;
    position: relative;
    display: flex;
    align-items: flex-end;

    width: 10rem;
    top: -30%;
`


const Bar = styled.div`

    position: absolute;
    width: 0.8rem;

    box-shadow: ${props => props.finished ? '1px 1px 7px #DEC721' : ''};

    background-color: 	${props => props.finished ? '#d5b824' : ((props.theme == 1) ? '#c15b5b' :'rgb(250, 249, 246)'  )};

    height: ${props => (props.height * 0.5) + 'rem'};
    
    left: ${props => (props.position * 1.1) + 'rem'};

    transition: left 500ms linear, height 500ms linear, background-color 500ms linear;



`



const getColor = ({finished, theme}) => {
    if (finished){
        return 'gold';
    }
    else{
        return 'rgb(250, 249, 246)'; 
    }
    //background-color: 	${props => props.finished ? 'gold' : (props.theme ? 'rgb(250, 249, 246)' : 'green')};
}