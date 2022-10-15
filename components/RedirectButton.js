import style from './RedirectButton.module.css'
import { useRouter } from 'next/router'
import cn from 'classnames';
import { useSelector } from 'react-redux';

export default function RedirectButton({ children, target, home }) {

    const router = useRouter();

    const path = home ? '/' : '../posts/' + target;

    const theme = useSelector((state) => state.counter.theme);

    return (
        <>
            <button className={cn({
                [style.rdbuttonLight]: theme && !home,
                [style.rdbuttonHomeLight]: theme && home,
                [style.rdbuttonHome]: home,
                [style.rdbutton]: !home,
                
            })}
                onClick={() => router.push(path)}>{children}</button>
        </>
    )
}

