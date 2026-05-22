import { Suspense, use } from "react"
import { Link } from "react-router-dom"

import ProdutosSkeleton from '../components/produtosSkeleton/ProdutosSkeleton'

import styles from './Produtos.module.css'
import ErrorBoundary from "./ErrorBoundary"


const listaDeProdutos = fetch('https://fakestoreapi.com/products').then(res => {
    if(!res.ok) throw new Error(`Produto com a id ${id} não encontrado`)   
    return res.json()
})
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
            <ErrorBoundary fallback={<p>Não foi possível carregar o produto</p>}>
            <Suspense fallback={<ProdutosSkeleton />}>
                <ProdutoInfo/>
            </Suspense>
            </ErrorBoundary>
            
        </section>
    )
}

export default Produtos