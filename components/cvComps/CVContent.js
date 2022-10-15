import styled from "styled-components";
import OverlayScreenButton from '../OverlayScreenButton';

export default function CVContent(){

    return(
        <>
        <Container>
        <Header>Profile: </Header>
        <p>Hi I am Elliot Jordan, a Computer Science BSc graduate with multiple years of industry experience. Recently I worked at the University of Reading as a Lead Research Engineer for a SaaS-inspired overhaul project for financial systems.</p>
        <p>Passionate about all things C#, Javascript, Python, and Machine Learning, aiming to pursue these further in industry. Have a total of 4 years of experience in industry with responsibilities ranging from software development, to full-stack dev, to fintech, performed independently and as part of a team.</p>

        <Header>Contact: </Header>
        <p>Email: Elliotjordan@fastmail.fm</p>
        <OverlayScreenButton></OverlayScreenButton>
        
        
        <Header>Experience</Header>
        <ul>
        <li>University of Reading, Lead Research Engineer - August 2019 – July 2022</li>

        
        <li> Veritas, Developer in Test - June 2017 - 2018</li>
        </ul>
        </Container>
        
        </>
    )
}


const Container = styled.div`

    

`

const Header = styled.div`

font-size: x-large;

`

const Text = styled.div`






`