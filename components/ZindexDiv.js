
import styled from "styled-components";

export default function ZindexDiv({children}){

    return(
        <SpecialDiv>{children}</SpecialDiv>
    )

}


const SpecialDiv = styled.div`

    z-index: 40 !important;
`