import styles from './alert.module.css';
import cn from 'classnames';
import {CapWord} from './common';

export default function Alert({children, type}){
    
    function getText(){
        if (type == 'default'){
            return '';
        }
        return CapWord(type);
        
    }
    
    return (
        <div
            className={cn({
                [styles.success]: type === 'success',
                [styles.error]: type === 'error',
            })}
        >   
            {children ? (children) : 
            (
                getText() 
            )
            }
        </div>

    );
}