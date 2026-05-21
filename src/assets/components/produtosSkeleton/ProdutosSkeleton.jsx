import styles from './ProdutosSkeleton.module.css'

    const produtos = Array.from({length: 10})

function ProdutosSkeleton(){

    return(
        <div className={styles.grid}>
            {produtos.map( (_, i) => ( 
                <div key={i} className={styles.card}>
                    <div className={styles.imagePlaceholder}></div>
                    <div className={styles.titlePlaceHolder}></div>
                    <div className={styles.pricePlaceHolder}></div>
                    <div className={styles.buttonPlaceHolder}></div>
                </div> 
                ))}
        </div>
    )
}

export default ProdutosSkeleton