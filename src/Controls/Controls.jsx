import Buttons from './Buttons/Buttons';
import styles from './Controls.module.css'

function Controls(){
    return (
        <div className={styles.controlsContainer}>
            <Buttons />
        </div>
    );
}

export default Controls