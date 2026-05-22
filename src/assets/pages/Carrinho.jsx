import { Link } from "react-router-dom"
import {useCarrinho} from "../contexts/CarrinhoContext"

import styles from './Carrinho.module.css'

function Carrinho(){

    const {itens} = useCarrinho()

    if(itens.length === 0) {
        return (
        <>
            <h2>Seu carrinho está vazio</h2>
            <Link    to="/produtos"> Veja nossos produtos</Link>
        </>
    )} else {
        return (
        
        <>
            <h2>Seu carrinho:</h2>
            <div className={styles.grid}>

                
            </div>
        </>
        )
    }
}

export default Carrinho