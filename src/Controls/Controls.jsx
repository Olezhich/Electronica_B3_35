import Buttons from './Buttons/Buttons';
import Switches from './Switches/Switches';

import styles from './Controls.module.css'


function Controls({PowerSwitch}){
    return (
        <div className={styles.controlsContainer}>
            <Switches PowerSwitch={PowerSwitch}/>
            <Buttons />
        </div>
    );
}

export default Controls