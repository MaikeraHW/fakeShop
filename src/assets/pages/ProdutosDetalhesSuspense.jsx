import { use, Suspense } from 'react'
import { Link } from 'react-router-dom'
import styles from './ProdutosDetalhes.module.css'
import { useParams } from 'react-router-dom'

    
    

function ProdutoBody({produtoDetalhadoPromise}){
    
    const produto = use(produtoDetalhadoPromise)

    if(!produto) return <div>Produto não encontrado</div>

    return(
            
            
            <div className={styles.content}>
                <div className={styles.image}>
                    <img src={produto.image} alt={produto.title} />
                </div>
                <div className={styles.info}>
                    <span className={styles.category}>{produto.category}</span>
                    <h1 className={styles.title}>{produto.title}</h1>
                    <p className={styles.description}>{produto.description}</p>
                    <p className={styles.price}>R$ {produto.price.toFixed(2).replace(".",",")}</p>
                    <button className={styles.button}>Adicionar ao Carrinho</button>
                </div>
            </div>
    )
}

function ProdutosDetalhesSuspense(){

    const { id } = useParams()
    const produtoDetalhadoPromise = useMemo( () => {
        return ( fetch(`https://fakestoreapi.com/products/${id}`).then( res => res.json()) )
    })

    return(
        <article className={styles.container}>
            <Link to="/produtos" className={styles.backButton}> Voltar</Link>

        
        <Suspense fallback={<div><p>Loading Fallback</p></div>}>
            <ProdutoBody produtoDetalhadoPromise={produtoDetalhadoPromise}/>
        </Suspense>
        
        </article>
        
    )
}

export default ProdutosDetalhesSuspense