import Buttons from './Buttons/Buttons';
import Switches from './Switches/Switches';

import styles from './Controls.module.css'


function Controls(){
    return (
        <div className={styles.controlsContainer}>
            <Switches />
            <Buttons />
        </div>
    );
}

export default Controls