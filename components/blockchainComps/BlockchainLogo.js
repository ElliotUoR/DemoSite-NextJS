import styled from "styled-components";

import { useEffect, useState, useRef } from "react";
import { sleep } from "../common";


const RenderBlocks = ({ blocks }) => {
    //console.log(blocks);
    let renderArray = [];
    let temp = blocks.slice(0);
    let count = 0;
    //console.log(blocks[0]);
    for (const obj of temp) {
        //console.log(obj);
        if (obj) {
            renderArray.push(<Block2 key={obj.blockID} timestamp={obj.timestamp} lane={obj.lane} colour={obj.colour} alive={obj.alive} anim={obj.anim}/>)
        }
        else {
            renderArray.push(<Block2 key={count++} timestamp={Date.now()} lane={-1} colour={'#fff'} alive={false} />)
        }
    }

    return (
        <>
            {renderArray}
        </>
    )

}

let mounted = false;
export default function BlockchainLogo() {


    const [blockList, setBlocks] = useState([]);

    const reference = useRef();
    reference.current = blockList;

    const [started, setStarted] = useState(false);

    useEffect(() => {
        if (!started) {

            setStarted(true);
            GenerateBlocks();
        }

        return () => {

            mounted = false;
        };
    }, [])

    async function GenerateBlocks() {

        mounted = true;
        let internalBlocks = [];
        let internalCounter = 0;
        let lanes = [0, 0, 0, 0, 0, 0];
        //console.log(lanes);
        let obj;
        let chosenLane = -1;
        while (mounted) {

            if (internalBlocks.length < 5) {
                //generate new block
                chosenLane = chooseRandomLane(lanes);
                obj = NewBlock(++internalCounter, chosenLane);
                lanes[chosenLane] = 1;
                internalBlocks.push(obj);
                //console.log(obj);
                setBlocks(current => [...current, obj]);

            }
            else if (internalBlocks.length == 5) {
                //lane clear up
                lanes = LaneClearUp();
                //console.log(lanes);
                //console.log("checking")
                //console.log(reference.current);
                removeFromState(); //updates and rerenders array
                await sleep(100);
                obj = DeadAndRevive(lanes);
                if (obj) {
                    //console.log(obj)
                    reviveFromState(obj);
                }
            }
            //console.log(reference.current);
            await sleep(800);

        }

    }

    function NewBlock(id, chosenLane) {
        let anima = RandomAnimation();
        return { blockID: id, colour: randomHexColour(), lane: chosenLane, timestamp: Date.now(), alive: true, anim: anima };
    }

    function RandomAnimation(){
        let anims = 3;
        return Math.floor(Math.random()*anims)+1;
    }

    function LaneClearUp() {
        let cloneLanes = [0, 0, 0, 0, 0, 0];
        for (const block of reference.current) {
            cloneLanes[block.lane] = 1;
        }

        return cloneLanes;

    }

    function DeadAndRevive(lanes) {
        let newObj;
        let newLane;
        //console.log(lanes);
        for (const block of reference.current) {
            if (!block.alive) {
                lanes[block.lane] = 0;
                newLane = chooseRandomLane(lanes);
                lanes[newLane] = 1;
                newObj = NewBlock(block.blockID, newLane);
                return newObj
            }
        }
    }

    //asummes that object being removed is at start of list
    function removeBlock(lanes, obj, blocks) {

        let openLane = obj.lane;
        lanes[openLane] = 0;
        blocks.shift();
    }

    //assume removing first item
    function removeFromState() {
        //setBlocks({current: reference.current.slice(1)})

        setBlocks(blockArr => {
            return blockArr.map(block => {
                if (block) {
                    if (Date.now() - block.timestamp >= 4000 && block.alive) {
                        //console.log("killing id:" + block.blockID);
                        block.alive = false;
                        return block;
                    } else {
                        return block
                    }
                }
            })
        })
    }




    function reviveFromState(obj) {
        //setBlocks({current: reference.current.slice(1)})

        setBlocks(blockArr => {
            return blockArr.map(block => {
                if (block) {
                    if (obj.blockID == block.blockID) {
                        //console.log("reviving id:" + block.blockID);
                        block.alive = true;
                        block.timestamp = obj.timestamp;
                        block.colour = obj.colour;
                        block.lane = obj.lane;
                        block.anim = obj.anim;
                        return block;
                    } else {
                        return block
                    }
                }
            })
        })
    }



    function chooseRandomLane(lanes) {
        let chosen = -1;
        let temp = -1;
        //console.log(lanes);
        while (chosen == -1) {
            temp = Math.floor(Math.random() * 6);
            if (lanes[temp] == 0) {
                chosen = temp;
            }
        }
        //console.log(chosen);
        return chosen;
    }


    function randomHexColour() {
        let temp = Math.floor(Math.random() * 16777215).toString(16);
        if (temp.length < 6) {
            return temp + ((6 - temp.length) * '0');
        }
        return temp;

    }


    return (
        <Container>

            <RenderBlocks blocks={reference.current}></RenderBlocks>
        </Container>

    )
}


const Container = styled.div`
    position: relative;
    width: 10.5rem;
    height: 5rem;
    background-color: rgb(1,1,1,0.3);
    overflow: hidden;

`

const Block = styled.div`

    background-color: ${props => '#' + props.colour};
    position: absolute;
    width: 1.3rem;
    height: 1.3rem;

    box-shadow: ${props => '1px 1px 11px #' + props.colour} ;

    display: ${props => props.alive ? 'flex' : 'none'};

    top: ${props => (-2 + (Date.now() - props.timestamp) / 250) * 1 + 'rem'};

    left: ${props => (0.2 + (props.lane * 1.6)) + 'rem'};

    transition: top 1000ms linear;

    

`

const Block2 = styled.div.attrs(
    ({ lane, colour, timestamp, alive, anim }) => ({
        style: {
            backgroundColor: '#' + colour,
            boxShadow: '1px 1px 11px #' + colour,
            display: alive ? 'flex' : 'none',
            top: -2.1 + ((Date.now() - timestamp) / 250) * 1 + 'rem',
            left: 0.4 + (lane * 1.6) + 'rem',
            animation: anim == 3 ? 'colourChange 5s' : 'rotate' + anim + ' 4s'
        }
    })
)`

    position: absolute;
    width: 1.3rem;
    height: 1.3rem;

    transition: top 1000ms linear;

    

    @keyframes rotate1{
    0%{
        transform: rotate(0deg);
        
    
    }

    100%{
        transform: rotate(720deg);
        

    }
    }

    @keyframes rotate2{
    0%{
        transform: rotate(0deg);
        
    
    }

    100%{
        transform: rotate(-720deg);
        

    }
    }

    @keyframes colourChange{
    0%{
        filter: invert(0%);
        
    
    }

    25%{
        filter: invert(0%);
    }

    33%{
        filter: invert(100%);
    }

    66%{
        filter: invert(0%);
    }

    100%{
        filter: invert(100%);
        

    }
    }
   

`