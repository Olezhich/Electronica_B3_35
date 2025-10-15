import styles from './Switch.module.css'

import sw_img from '../../../assets/switch.png'

function Switch({offset}){
    console.log('style:', styles);
    return (
        <div className={styles.switchBody} style={{left: `${offset}`}}>
            <div className={styles.switch} style={{backgroundImage: `url(${sw_img})`}}/>
        </div>
    );
}

export default Switch