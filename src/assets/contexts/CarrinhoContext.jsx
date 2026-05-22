import { createContext, useContext, useState } from "react";


const CarrinhoContext = createContext()

export function CarrinhoProvider({children}){
    const [itens, setItens] = useState([])

    const adicionarCarrinho = (produto) => {
        setItens( prev => {
            const existe = prev.find( item => item.id === produto.id)

            if(existe){
                return prev.map( item => item.id === produto.id ? {...item, quantidade: item.quantidade + 1} : item)
            }
            return [...prev, {...produto, quantidade: 1}]
        })
        alert(`O produto com Id ${produto.id} foi adicionado ao carrinho`)
    }

    const totalItens = itens.reduce( (acc, item) => acc + item.quantidade, 0)

    return <CarrinhoContext.Provider value={{adicionarCarrinho, totalItens, itens}}>
                {children}
           </CarrinhoContext.Provider>

}

export const useCarrinho = () => useContext(CarrinhoContext)