import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import utilStyles from "../../components/first-post.module.css"

import Layout from '../../components/Layout';
import LimeButton from "../../components/limeButton";

export default function FirstPost(){
    return (
        <Layout pageName="First Page">
            <Head>
                <title>First Post</title>
                
            </Head>
                      
            <LimeButton>Toggle Test</LimeButton>

            <div className={utilStyles.postContainer}>
                <Image src = "/images/pet.PNG" width={350} height = {300}/>
                <h2>Look at this image</h2>        
            </div>

        </Layout>
    );
}


/*
<h1>First Post</h1>
            <h2> 
                <Link href = "/">
                    <a>Back to home</a>
                </Link>
            </h2>

*/