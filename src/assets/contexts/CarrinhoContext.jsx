import { createContext, useContext, useEffect, useState } from "react";


const CarrinhoContext = createContext()

export function CarrinhoProvider({children}){
    const [itens, setItens] = useState( () => {
        const saved = localStorage.getItem("fakeshop:carrinho")
        return saved ? JSON.parse(saved) : []
    })

    useEffect( () => {
        localStorage.setItem("fakeshop:carrinho", JSON.stringify(itens))
    }, [itens])

    const adicionarCarrinho = (produto) => {
        setItens( prev => {
            const existe = prev.find( item => item.id === produto.id)

            if(existe){
                return prev.map( item => item.id === produto.id ? {...item, quantidade: item.quantidade + 1} : item)
            }
            return [...prev, {...produto, quantidade: 1}]
        })
    }

    const removerCarrinho = (id) => {
        setItens(prev => prev.filter( item => item.id !== id))
    }

    const atualizarCarrinho= (id, novaQuantidade) => {
        setItens(prev => prev.map( item => {
            return item.id === id ? {...item, quantidade: novaQuantidade} : item
        }))
    }

    const valorTotal = itens.reduce( (acc, item) => acc + (item.price * item.quantidade), 0)

    const totalItens = itens.reduce( (acc, item) => acc + item.quantidade, 0)

    return <CarrinhoContext.Provider value={{adicionarCarrinho, removerCarrinho, atualizarCarrinho, valorTotal, totalItens, itens}}>
                {children}
           </CarrinhoContext.Provider>

}

export const useCarrinho = () => useContext(CarrinhoContext)