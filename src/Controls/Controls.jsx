import Buttons from './Buttons/Buttons';
import Switches from './Switches/Switches';

import styles from './Controls.module.css'


function Controls({PowerSwitch, ButtonHandler}){
    return (
        <div className={styles.controlsContainer}>
            <Switches PowerSwitch={PowerSwitch}/>
            <Buttons ButtonHandler={ButtonHandler}/>
        </div>
    );
}

export default Controls