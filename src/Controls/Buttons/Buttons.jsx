import Button from './Button/Button';
import styles from './Buttons.module.css'

function Buttons(){
    const buttons = Array.from({length: 25}, (_, idx) => (<Button key={idx}/>));

    return (
        <div className={styles.buttonsContainer}>
            {buttons}
        </div>
    );
}

export default Buttons