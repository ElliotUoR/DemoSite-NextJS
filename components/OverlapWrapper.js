import styled from "styled-components";



export default function OverlapWrapper({children}){

    return(
        <Wrapper>{children}</Wrapper>
    )
}


const Wrapper = styled.div`

    position: relative;

    > * {
        position: absolute;
        margin-left: 0.5rem;
    }
`