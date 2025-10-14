import styles from './Button.module.css'

function Button({keyImg, keyRed}){
    return(
        <div className={styles.cell}>
            <div className={`${styles.keyDefault} ${keyRed ? styles.keyRed : ''}`} 
            style={{backgroundImage: `url(${keyImg})`}} />
        </div>
    );
}

export default Button
