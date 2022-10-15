import Alert from './togglealert';
import Link from 'next/link';
import { Children, useState } from 'react';


export default function LimeButton({children}){

    const [alertState, setAlertState] = useState('default'); 



    function handleClick(){
        setAlertState(toggleState(alertState));
        console.log();
    }

    function toggleState(currentState){
        if (currentState == 'error'){
            return 'success';
        }
        return 'error';
    }

    return (
        <div>
            <button onClick={handleClick}>{children}</button>
            <Alert type = {alertState}></Alert>
         </div>
    )


}