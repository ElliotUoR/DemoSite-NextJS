import Image from 'next/image';
import utilStyles from '../styles/utils.module.css';
import React, {useState, useEffect} from 'react';

export default function ImageRandom({children, name}){

    const [target,setTarget] = useState('/images/randompp/build1.PNG');

    const [loaded, setLoaded] = useState(false);

    const imagePrefix = '/images/randompp/build';
    const imageSuffix = '.PNG';

    useEffect(() =>{
    ChooseRandomTarget();
    if (!loaded){
        setLoaded(true);
    }
    },[])
    return (
        <Image
                  priority
                  src={target}
                  className={utilStyles.borderCircle}
                  height={calcImageSize(loaded)}
                  width={calcImageSize(loaded)}
                  alt={name}
                  
                />
    )

    function calcImageSize(loaded){
        if (!loaded){
          return 144;
        
        }
        return window.innerWidth >= 551 ? 108 : 60;
      }


    function ChooseRandomTarget(){
        const num = 1 + (Math.round(Math.random() *5));
        setTarget(imagePrefix+num+imageSuffix);

    }
}