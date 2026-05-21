import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import styles from './Produtos.module.css'

function Produtos(){

    const [produtos, setProdutos] = useState([])
    const [carregando, setCarregando] = useState(false)
    let items = []

    useEffect( () => {

        async function fetchProdutos() {

            try {
                    const response = await fetch('https://fakestoreapi.com/products')
                    const data = await response.json()
                    setProdutos(data)

            } catch (err) {
                    console.log(err)
            } finally {
                setCarregando(false)
            }
            
        }

        fetchProdutos()
    }, [])

    return(
        <section>
            <h2>Nossos Produtos</h2>

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
        </section>
    )
}

export default Produtos