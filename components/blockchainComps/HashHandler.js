import styled from "styled-components";
import { hash } from "../../Rust/pkg/wasm_test";
import { sleep } from "../common";
import WasmHash from "../wasmComponents/WasmHash";
import { useState, useEffect, useRef, useImperativeHandle } from "react";
import OverlapWrapper from "../OverlapWrapper";
import HashHolder from "./HashHolder";
import { CapWord } from "../common";
import StaggeredText from "./StaggeredText";
import * as wasm from '../../Rust/pkg';
import HashUpdateText from "./HashUpdateText";
import HashrateChanger from "./HashrateChanger";

import { useSelector } from "react-redux";

const RenderHashes = ({ hashList, callback, solved }) => {

    
    let renderArray = hashList.slice(0);
    let itemList = [];
    {
        renderArray.forEach((item, index) => {
            if (item) {
                //console.log(item);
                if (!item.finshed && item.age + 1500 >= Date.now()) {
                    itemList.push(<WasmHash id={index} key={index} callback={callback} hashTarget={item.data} nonce={item.nonce} float={true} solveCallback = {solved} />)
                }
            }
        })
        //console.log(itemList);

    }
    return (
        <HashHolder>
            <OverlapWrapper>
                {itemList}
            </OverlapWrapper>
        </HashHolder>
    );

};


const RenderSolvedHashList = ({hashList}) => {

    let hashListReady = hashList.slice(0).reverse();
    let renderArray = [];
    /*
    hashListReady.forEach((item, index) => {
        renderArray.push(<StaggeredText key = {index} string={item}/>)

    })
    */ //old code for showing all
    for(let i = 0; (i < hashListReady.length && i < 5); i++ ){
        renderArray.push(<StaggeredText key = {i} string={hashListReady[i]}/>)
    }
    
    return (
        <SolvedHashWrapper>{renderArray}</SolvedHashWrapper>
    )
}

let mounted = false;
let hashAttempts = 0; //global variable only goes up and is read so can be here
let hashListSolved = [];
let nonce = 1;

let interval = 500;

let maxInterval = 1000;

let minInterval = 50; //intervals lower can cause lag

let hashEngineActive = false;
let hashEngineActiveString = ""; //it is possible that multiple instances of hashing engines are active at once
//this var ensures that the only instance that can access the page is the one from the currently mounted comp

export default function HashHandler({ active, limit, request }) {

    const [hashes, setHashes] = useState([]);
    const reference = useRef();
    reference.current = hashes;


    const [id, setID] = useState(0);

    const [started, setStarted] = useState(false);

    const [isActive, setActive] = useState(active);

    const [numberOfHashAttempts, setNumberOfHashAttempts] = useState(0);

    const activeRef = useRef();
    activeRef.current = isActive;

    const [cleanupStatus, setCleanupStatus] = useState(false);

    const [hashesSolved, setHashesSolved] = useState([]);

    const [listSolvedHashes, setListSolvedHashes] = useState(false);

    const solvedHashesRef = useRef();
    solvedHashesRef.current = hashesSolved;

    const intervalStore = useSelector((state) => state.counter.interval);

    useEffect(() => {

        interval = Math.max(minInterval,Math.min(intervalStore,maxInterval));
    }, [intervalStore])

    useEffect(() => {


        

        if (!started) {
            mounted = true;
            hashEngineActiveString = wasm.hashInputNonce(Date.now().toString(),true);
            //console.log("HEAS: "+hashEngineActiveString);
            HashEngine("abcd", nonce);
            //hashCounter();
            setStarted(true);
            //testEngine();
            setHashesSolved(hashListSolved);
            

        }
        return () => {
            setActive(false);
            mounted = false;
        };
    }, [])



    //format of hashes - { uniqueId: data: xxx, nonce: x, finished: false}

    async function testEngine() {
        await sleep(500);
        let newHash = { uniqueId: 1, data: "afbc", nonce: 0, finshed: false }
        setHashes(current => [...current, newHash])
        await sleep(500);
        newHash = { uniqueId: 1, data: "dd", nonce: 0, finshed: false }
        setHashes(current => [...current, newHash])
        await sleep(500);
        newHash = { uniqueId: 1, data: "adc", nonce: 0, finshed: false }
        setHashes(current => [...current, newHash])
        //reference.current = hashes;
        readHashes();
        console.log("done");

    }


    function removeFinished(id) {
        if (id) {

            setHashes(hashArray => {
                return hashArray.map(hash => {
                    if (hash) {
                        if (hash.uniqueId == id) {
                            console.log("removing id:" + id);
                            //removal by ommision
                        } else {
                            return hash
                        }
                    }
                })
            })
        }
        else {
            //console.log("callback - no id provided");
        }
    }

    function finished(id) {
        if (id) {

            //console.log("id prov:" + { id });
            setHashes(hashArray => {
                return hashArray.map(hash => {
                    if (hash.uniqueId == id) {
                        //console.log(hash);
                        return { ...hash, finshed: true }
                    } else {
                        return hash
                    }
                })
            })
        }
        else {
            //console.log("callback - no id provided");
        }
    }

    function toggleActive() {
        setActive(!isActive);
    }

    function toggleHashList(){
        setListSolvedHashes(!listSolvedHashes);
    }


    function readHashes() {
        reference.current.forEach((item) => {
            console.log(item);
        })
    }

    function newHashedSolved(hashData){
        setHashesSolved(current => [...current, hashData]);
    }

    function compareHashToHEAS(givenString){
        return givenString === hashEngineActiveString;
    }


    //for testing only
    async function hashCounter(){
        let temp = hashAttempts;
        let diff = 0;
        while (mounted){
            await sleep(1000);
            diff = hashAttempts-temp;
            temp = hashAttempts;
            console.log("Last Second: " + diff);
        }
    }

    async function HashEngine(stringData, startingNonce) {
        let internalHash = hashEngineActiveString; //each instance gets unique string
        let forever = limit == -1;
        let idTemp = id;
        let cleanup = false;
        let cleanupCount = 0;
        let newHash;
        let toggle = false;
        let hashEngineEverActive = false;
        while(hashEngineActive){
            await sleep(50);
        }
        if(compareHashToHEAS(internalHash)){
            hashEngineActive = true;
            hashEngineEverActive = true;
            setHashesSolved(hashListSolved);
            startingNonce = nonce;
        }
        while (mounted && compareHashToHEAS(internalHash)) {
            await sleep(10);
            //await sleep(Math.min(100,interval));
            while ((mounted && compareHashToHEAS(internalHash)) && activeRef.current && (forever || idTemp < limit) && (!cleanup)) {
                if (isActive) {
                    idTemp++;
                    newHash = { uniqueId: idTemp, data: stringData, nonce: startingNonce++, finshed: false, age: Date.now() }
                    setHashes(current => [...current, newHash])
                    hashAttempts++;
                    setNumberOfHashAttempts(amount => amount + 1);
                    cleanupCount++;
                    if (cleanupCount >= 250) {
                        cleanup = true;
                    }


                }
                toggle = true;
                await sleep(interval); //interval at the end
                
            }
            if (toggle) {
                setID(idTemp);
                //await sleep(Math.min(200,interval)); //for smoother animations
                setCleanupStatus(true);
                CleanupHashes(); //remove finished hashes from list
                if (cleanup) {
                    console.log("array cleanup");
                    //await sleep(interval);
                }
                else {
                    await sleep(interval);
                }
                setCleanupStatus(false);
                cleanup = false;
                cleanupCount = 0;
                //console.log(reference.current);
                toggle = false;
            }
        }
        if (hashEngineEverActive){
        console.log("component " + internalHash + " unmounted");
        hashListSolved = solvedHashesRef.current;
        //console.log(hashListSolved);
        nonce = startingNonce;
        }
        hashEngineActive = false;
    }

    function CleanupHashes() {
        setHashes(hashArray => {
            return hashArray.filter(data => data.finished);
        })
    }

    return (
        <>
            <RenderHashes hashList={reference.current} callback={finished} solved={newHashedSolved}/>
            <FlexWrapper>
                <button onClick={toggleActive}>Hashing Status: {CapWord(isActive.toString())}</button>
                <HashUpdateText interval = {interval} counter = {hashesSolved.length} fullUpdate = {true}>Hashes Solved: </HashUpdateText>
                <HashUpdateText interval = {interval} counter = {hashAttempts} fullUpdate={false}>Hash Attempts: </HashUpdateText>
                <HashUpdateText interval = {interval} counter = {numberOfHashAttempts} fullUpdate={false}>This Load:</HashUpdateText>
                
                {cleanupStatus ? <p>Cleanup in progress...</p> : null}
                
            </FlexWrapper>
            <ExtraWrapper>
            <button onClick={toggleHashList}>List Solved Hashes</button>
            
            <HashrateChanger><IntervalWrap>Interval: {(interval/1000).toFixed(2)}s</IntervalWrap></HashrateChanger>
            </ExtraWrapper>
            {listSolvedHashes ? <RenderSolvedHashList hashList={solvedHashesRef.current}/> : null}
            
        </>

    );

}


const IntervalWrap = styled.span`
    color: papayawhip;
    padding-top: 0.3rem;
    padding-left: 0.5em;
    padding-right:0.5em;
    user-select: none;
`

const FlexWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    gap: 1rem;
`

const SolvedHashWrapper = styled.div`
    background-color: black;
    border: 1px dotted green;
    gap: 0.5rem;
    flex-flow: column;
    top: 100px;
    bottom: 0;
    width: 100%;
    padding-left: 0.75rem;
`


const ExtraWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 1rem;
`


//<RenderHashes hashes={hashes} /> <RenderHashes hashList={reference.current} />

//<WasmHash hashTarget={hash.data} nonce={hash.nonce} float={true} />

/*

{[...hashList].map((x => x)(
                <WasmHash hashTarget="asd" nonce={0} float={true} />
            ))}
   

 <HashHolder>
            <OverlapWrapper>
                <RenderHashes hashList={reference.current} callback={finished} />
            </OverlapWrapper>
        </HashHolder>



*/