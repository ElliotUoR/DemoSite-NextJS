import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router';

const Transition = ({ children }) => {

    const { asPath } = useRouter();

    return (
        <div className="effect-1">

            <AnimatePresence
                initial={false}
                exitBeforeEnter
            >
                <motion.div
                    key={asPath}
                    variants={variants}
                    animate="in"
                    initial="out"
                    exit="out"

                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </div>

    )

}

export default Transition;

/*
<div className="effect-1">
            <AnimatedPresence
                initial={false}
                exitBeforeEnter
            >
                <motion.div
                key={asPath}
                variants={variants}
                animate="in"
                initial="out"
                exit="out"

                >
                    {children}
                </motion.div>
            </AnimatedPresence>
        </div>
*/

/*
<motion.div
                key={asPath}
                variants={variants}
                animate="in"
                initial="out"
                exit="out"

            >
                {children}
            </motion.div>

*/




const variants = {
    out: {
        opacity: 0,
        y: 40,
        transition: {
            duration: 0.15
        }
    },
    in: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.15,
            delay: 0.5
        }
    }

};