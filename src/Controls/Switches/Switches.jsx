import Switch from './Switch/Switch'
import styles from './Switches.module.css'

function Switches({PowerSwitch}){
    return(
        <div className={styles.switches}>
            <Switch offset={'3%'} SwitchHandler={PowerSwitch}/>
            <Switch offset={'79.5%'} />
        </div>
    );
}

export default Switches