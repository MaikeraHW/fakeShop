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

    const totalItens = itens.reduce( (acc, item) => acc + item.quantidade, 0)

    return <CarrinhoContext.Provider value={{adicionarCarrinho, totalItens, itens}}>
                {children}
           </CarrinhoContext.Provider>

}

export const useCarrinho = () => useContext(CarrinhoContext)