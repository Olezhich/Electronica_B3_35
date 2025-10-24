import styles from './Switch.module.css'

import sw_img from '../../../assets/switch.png'

function Switch({offset, SwitchHandler}){
    const handler = SwitchHandler?.Handler || (() => {});
    const state = SwitchHandler?.State ?? false;

    return (
        <div className={styles.switchBody} style={{left: `${offset}`}}  onClick={handler}>
            <div className={`${styles.switch} ${state ? styles.on : ''}`} style={{backgroundImage: `url(${sw_img})`}} />
        </div>
    );
}

export default Switch