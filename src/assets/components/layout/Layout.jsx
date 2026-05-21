import { Outlet } from 'react-router-dom'

import Header from '../header/Header'
import Footer from '../footer/Footer'

import styles from './Layout.module.css'

function Layout(){
    
    return (
        <div className={styles.wrapper}>
            <Header/>
            <main> MAIN CONTENT
            <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout