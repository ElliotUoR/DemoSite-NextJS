import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";


export default function Socials() {


    return (
        <Container>

            
                <a href="https://www.linkedin.com/in/elliot-jordan-482a9312a/" target="_blank" rel="noopener noreferrer" >
                <WhiteBackground>
                    <Image
                        priority
                        src="/DemoSite-NextJS/images/icons/linked.png"
                        height={34}
                        width={34}
                        alt={"LinkedIn Icon"}
                    />
                    </WhiteBackground>
                </a>
            


            <a href="https://github.com/ElliotUoR?tab=repositories" target="_blank" rel="noopener noreferrer" >
                <WhiteBackground>

                    <Image
                        priority
                        src="/DemoSite-NextJS/images/icons/github.png"
                        height={34}
                        width={34}
                        alt={"Github Icon"}
                    />
                </WhiteBackground>
            </a>
        </Container>
    )
}


const WhiteBackground = styled.div`

    border-radius: 10%;
    display: flex;
    text-align: center;
    background-color: white;
    width: 34px;
    height: 34px;
    &:hover {
        cursor: pointer;
    }
    
    margin-right: 1rem;

    @media screen and (max-width: 550px) {
        width: 2.1vh;
        height: 2.1vh;
    }

`

const Container = styled.div`
    display: flex;
    align-items: flex-end;

`


