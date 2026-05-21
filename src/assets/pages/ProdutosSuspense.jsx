import { Suspense, use } from "react"
import { Link } from "react-router-dom"

import styles from './Produtos.module.css'


const listaDeProdutos = fetch('https://fakestoreapi.com/products').then(res => res.json())

function ProdutoInfo(){

    const produtos = use(listaDeProdutos)
    return (
            <div className={styles.grid}>
                {produtos.map(item => (
                    <article key={item.id} className={styles.card}>
                        <div className={styles.image}>
                            <img src={item.image} alt={item.title} />
                        </div>
                        <h3>{item.title}</h3>
                        <p className={styles.price}>R$ {item.price.toFixed(2).replace(".", ",")}</p>
                        <Link to={`/produtos/${item.id}`} className={styles.button}> Ver detalhes</Link>
                    </article>
                ))}
            </div>
    )
}

function Produtos(){


    return(
        <section>
            <h2>Nossos Produtos</h2>
            <Suspense fallback={<p>Carregando...</p>}>
                <ProdutoInfo/>
            </Suspense>
            
        </section>
    )
}

export default Produtos