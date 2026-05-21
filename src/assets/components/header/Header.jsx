import { NavLink } from "react-router-dom";
import styles from './Header.module.css'

function Header(){

    return(

        <header className={styles.header}>
                <h1 className={styles.logo}>Fake Shop</h1>
                <nav className={styles.nav}>
                    <ul>
                        <li>
                            <NavLink to="/" className={({isActive}) => isActive ? styles.active : ""}> Home </NavLink>
                        </li>
                        <li>
                            <NavLink to="/produtos" className={({isActive}) => isActive ? styles.active : ""}> Produtos </NavLink>
                        </li>
                    </ul>
                </nav>
        </header>
    )
}

export default Header