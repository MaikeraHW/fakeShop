import { Link } from "react-router-dom"
import {useCarrinho} from "../contexts/CarrinhoContext"

import styles from './Carrinho.module.css'
import { useState } from "react"

function Carrinho(){

    const {itens, atualizarCarrinho, removerCarrinho, valorTotal, limparCarrinho} = useCarrinho()

    const[idParaExcluir, setIdParaExcluir] = useState(null)
    const [itemParaConfirmar, setItemParaConfirmar] = useState(null)

    function iniciarExclusao(id){
        setIdParaExcluir(id)
        setItemParaConfirmar(null)
        setTimeout( () => {
            removerCarrinho(id)
            setIdParaExcluir(null)
        }, 500)
    }

    async function finalizarCompra(){

        const dadosParaEnvio = {
            userId: 5,
            date: new Date().getTime(),
            products: itens.map( item => ({
                productId: item.id,
                quantity: item.quantidade
            }))
        }

        try {

            const response = await fetch("https://fakestoreapi.com/carts", {
                method: "POST",
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(dadosParaEnvio)
            })

            if(response.ok){
                const resultado = await response.json()
                alert("Pedido enviado com sucesso")
                limparCarrinho()
            }

        } catch (err){
            console.error(err)
        } 
    }

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

            {itemParaConfirmar && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <p>Deseja realmente excluir o item <b>{itemParaConfirmar.title} ?</b></p>
                        <div className={styles.modalBtns}>
                            <button onClick={ () => setItemParaConfirmar(null)}>Cancelar</button>
                            <button onClick={ () => iniciarExclusao(itemParaConfirmar.id)} className={styles.confirmBtn}>Confirmar</button>
                        </div>
                    </div>
                </div>
            )}
            <div className={styles.grid}>
                <section className={styles.itemList}>
                    {itens.map( item => (
                        <div key={item.id} className={`${styles.item} ${idParaExcluir === item.id ? styles.itemSaindo : "" }`}>
                            <img src={item.image} alt={item.title} />
                            <div className={styles.details}>
                                <h3>{item.title}</h3>
                                <p>R$ {item.price.toFixed(2).replace("." , ",")}</p>
                                <div className={styles.controls}>
                                    <button onClick={() => atualizarCarrinho(item.id, item.quantidade - 1)}> - </button>
                                    <span>{item.quantidade}</span>
                                    <button onClick={() => atualizarCarrinho(item.id, item.quantidade + 1)}> + </button>
                                    <button className={styles.removeBtn} onClick={() => setItemParaConfirmar(item)}>Remover Item</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
                <section className={styles.totalValue}>
                    <h2>Resumo</h2>
                    <p>Total: <b>{valorTotal.toFixed(2).replace("." , ",")}</b></p>
                    <button className={styles.checkoutBtn} onClick={finalizarCompra}> Finalizar compra </button>
                </section>

            </div>
        </>
        )
    }
}

export default Carrinho