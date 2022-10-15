import styled from "styled-components";

export default function HashHolder({children}){

    return(
        <Box>{children}</Box>
    )
}

const Box = styled.div`

    display: inline-block;
    flex-wrap: wrap;

    background-color: black;
    width: 100%;
    height: 2rem;
`
