import styles from './Button.module.css'


function NormalId(val){
    switch (val){
        case '+': return 'plus';
        case '-': return 'minus';
        default: return val;
    }

}

function Button({keyImg, keyRed, keyVal, handler}){
    return(
        <div className={styles.cell}>
            <div data-testid={keyVal} className={`${styles.keyDefault} ${keyRed ? styles.keyRed : ''}`} 
            style={{backgroundImage: `url(${keyImg})`}}
            onClick={() => handler(keyVal)} />
        </div>
    );
}

export default Button
