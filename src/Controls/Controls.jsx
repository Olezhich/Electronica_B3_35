import Buttons from './Buttons/Buttons';
import Switches from './Switches/Switches';

import styles from './Controls.module.css'


function Controls({SW: {DegRadSwitch, PowerSwitch}, ButtonHandler}){
    return (
        <div className={styles.controlsContainer}>
            <Switches DegRadSwitch={DegRadSwitch}  PowerSwitch={PowerSwitch}/>
            <Buttons ButtonHandler={ButtonHandler}/>
        </div>
    );
}

export default Controls