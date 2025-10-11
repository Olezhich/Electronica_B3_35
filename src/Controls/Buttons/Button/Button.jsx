import styles from './Button.module.css'

function Button({keyText}){
    return(
        <div className={styles.cell}>
            <button className={styles.keyDefault}>{keyText}</button>
        </div>
    );
}

export default Button
