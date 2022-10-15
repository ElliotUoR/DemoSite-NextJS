import FloatingText from "../../components/blockchainComps/FloatingText";
import blockchain from "./blockchain";
import Layout from "../../components/layout";
import HashHandler from "../../components/blockchainComps/HashHandler";
import { useRef, useState } from "react";
import HashHolder from "../../components/blockchainComps/HashHolder";
import OverlapWrapper from "../../components/OverlapWrapper";
import BlockchainLogo from "../../components/blockchainComps/BlockchainLogo";

export default function blockchain2() {




    return (
        <Layout pageName="Blockchain">
            <div>Blockchain - is a page that demonstrates hashing in Blockchain.
                When a successful hash occurs it will be highlighted green and float to the top.
                A failed hash is red and will disappear faster. Currently for a hash to be successful it must start with a &apos;0&apos;<br /><br /><br />&nbsp;</div>
            <div>
                <HashHandler active={true} limit={-1} />
            </div>
        </Layout>

    )

}

/*
<HashHolder>
                    <OverlapWrapper>
                        
                    </OverlapWrapper>
                </HashHolder>

    const [activeState, changeActiveState] = useState(true);
*/