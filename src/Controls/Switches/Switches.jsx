import Switch from './Switch/Switch'
import styles from './Switches.module.css'

function Switches({DegRadSwitch, PowerSwitch}){
    return(
        <div className={styles.switches}>
            <Switch offset={'3%'} SwitchHandler={PowerSwitch} test_id={'power_sw'}/>
            <Switch offset={'79.5%'} SwitchHandler={DegRadSwitch} test_id={'deg_red_sw'}/>
        </div>
    );
}

export default Switches