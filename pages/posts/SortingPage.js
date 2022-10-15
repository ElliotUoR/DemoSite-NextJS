import Layout from '../../components/Layout';
import Sorter from '../../components/sorting/Sorter';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import IconSorter from '../../components/sorting/IconSorter';

export default function SortingPage(){

    const chosen = useSelector((state) => state.counter.sorter);

    const [chosenType, setType] = useState("Bubble");

    useEffect(() => {
        
        
        setType(chosen == 0 ? "Bubble" : chosen);
        
        
    }, [chosen])

    return (
        <Layout pageName="Sorting Algorithms">
            <TextTemplate>This page demonstrates two sorting algorithms - Bubble sort and Quick sort. They are visualised using pointers to demonstrate what is occuring in the algorithm. Additionally a manual sort option is availible to play around with. Click the white sort button to change the selected algorithm. </TextTemplate>
            <Sorter type = {chosenType}></Sorter>
            
        </Layout>
    )
}


const TextTemplate = styled.div`


`