import styles from './Button.module.css'

function Button({keyImg, keyRed, keyVal, handler}){
    return(
        <div className={styles.cell}>
            <div className={`${styles.keyDefault} ${keyRed ? styles.keyRed : ''}`} 
            style={{backgroundImage: `url(${keyImg})`}}
            onClick={() => handler(keyVal)} />
        </div>
    );
}

export default Button
