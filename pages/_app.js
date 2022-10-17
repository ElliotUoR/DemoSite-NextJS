import '../styles/global.css'
import BackgroundObjects from '../components/backgroundComps/BackgroundObjects'
import '../styles/transition.css'
import 'highlight.js/styles/atom-one-dark-reasonable.css';
import Transition from '../components/transitions/Transition'
import { motion, AnimatedPresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { ThemeProvider } from 'styled-components'


import LayoutHeader from '../components/LayoutHeader'

import Store from '../components/redux/Store'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }) {
    return (
        <>
        
        <Provider store={Store}>
            <BackgroundObjects />
            <LayoutHeader/>
            <Transition>
                <Component {...pageProps} />
            </Transition>
            </Provider>
        </>
    )
}