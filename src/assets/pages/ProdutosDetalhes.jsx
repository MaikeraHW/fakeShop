import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './ProdutosDetalhes.module.css'
import { useParams } from 'react-router-dom'


function ProdutosDetalhes(){

    const { id } = useParams()

    const [produto, setProduto] = useState(null)
    const [carregando, setCarregando] = useState(true)

    useEffect( () => {
    
            async function fetchProduto() {
    
                try {
                        const response = await fetch(`https://fakestoreapi.com/products/${id}`)
                        const data = await response.json()
                        setProduto(data)
    
                } catch (err) {
                        console.log(err)
                } finally {
                    setCarregando(false)
                }
                
            }
    
            fetchProduto()
        }, [id])

        if(carregando) {return <p> Carregando... </p>}


    return(
        <article className={styles.container}>
            <Link to="/produtos" className={styles.backButton}> Voltar</Link>

            <div className={styles.content}>
                <div className={styles.image}>
                    <img src={produto.image} alt={produto.title} />
                </div>
                <div className={styles.info}>
                    <span className={styles.category}>{produto.category}</span>
                    <h1 className={styles.title}>{produto.title}</h1>
                    <p className={styles.description}>{produto.description}</p>
                    <p className={styles.price}>{produto.price.toFixed(2).replace(".",",")}</p>
                    <button className={styles.button}>Adicionar ao Carrinho</button>
                </div>

            </div>
        </article>
    )
}

export default ProdutosDetalhes