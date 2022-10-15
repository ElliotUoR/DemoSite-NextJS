import Layout from "../../components/layout";
import FloatingText from "../../components/blockchainComps/FloatingText";
import TextAnimation from "../../components/blockchainComps/TextAnimation";
import style from "../../components/blockchainComps/blockchain.module.css";
import dynamic from "next/dynamic";
import styled from "styled-components";

import StaggeredText from "../../components/blockchainComps/StaggeredText";


export default function blockchain() {



    return (
        <Layout pageName="Blockchain 1">
            <div className={style.newLineContainer}>
                <FloatingText type = {true} infinite = {true}>74234E98AFE7498FB5DAF1F36AC2D78ACC339464F950703B8C019892F982B90B</FloatingText>
                <TextAnimation>Brokd</TextAnimation>
            </div>
            <Wrapper>
                <StaggeredText string="234E98AFE7498FB5DAF1F36AC2D78ACC339464F950703B8C019892F982B"></StaggeredText>
                <StaggeredText string="234E98AFE7498FB5DAF1F36AC2D78ACC339464F950703B8C019892F982B"></StaggeredText>
                <StaggeredText string="234E98AFE7498FB5DAF1F36AC2D78ACC339464F950703B8C019892F982B234E98AFE7498FB5DAF1F36AC2D78ACC339464F950703B8C019892F982B"></StaggeredText>
            </Wrapper>
        </Layout>

    )
}


const Wrapper = styled.div`
    background-color: black;
    border: 1px dotted green;
    gap: 0.5rem;
    flex-flow: column;
    top: 100px;
    bottom: 0;
    width: 100%;
`

//<TextAnimation>React</TextAnimation> <NoSSRTextAni>React</NoSSRTextAni>
//




/*
    
    


    const NoSSRFloatingText = dynamic(
        () => import('../../components/blockchainComps/FloatingText'),
        {ssr: false}
    )

    const NoSSRTextAni = dynamic(
        () => import('../../components/blockchainComps/TextAnimation'),
        {ssr: false}
    )

*/