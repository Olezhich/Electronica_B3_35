import Switch from './Switch/Switch'
import styles from './Switches.module.css'

function Switches(){
    return(
        <div className={styles.switches}>
            <Switch offset={'3%'} />
            <Switch offset={'79.5%'} />
        </div>
    );
}

export default Switches