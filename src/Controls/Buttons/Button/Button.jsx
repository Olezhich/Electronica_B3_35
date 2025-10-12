import styles from './Button.module.css'
import f_img from '../../../assets/f.png'

function Button({keyText}){
    return(
        <div className={styles.cell}>
            <div className={styles.keyDefault} style={{backgroundImage: `url(${f_img})`}}>{keyText}</div>
        </div>
    );
}

export default Button
