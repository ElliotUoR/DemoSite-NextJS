import styled from "styled-components";
import Layout from "../../components/layout";
import RedirectButton from "../../components/RedirectButton";
import BlurOverlay from "../../components/BlurOverlay";

export default function chess() {
    return (

        <Layout pageName="Chess 1">
            <LargeContainer>hello</LargeContainer>
            <BlurOverlay>
                <RedirectButton home={true}>escape</RedirectButton>
            </BlurOverlay>

        </Layout>
    )
}




const LargeContainer = styled.div`
    background-color: blue;
    height: 90%;
    padding: 0.5rem;
    gap: 0.5rem;
    flex-flow: column;
    top: 100px;
    bottom: 0;
    width: 100%;
    height: 100%;
    
`
/*

<Layout pageName="Chess 1">
            <LargeContainer>hello</LargeContainer>
        </Layout>


*/