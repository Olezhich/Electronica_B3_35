import Button from './Button/Button';
import styles from './Buttons.module.css'

import c_img from '../../assets/c.png'
import um_img from '../../assets/um.png'
import arc_img from '../../assets/arc.png'
import vp_img from '../../assets/vp.png'
import f_img from '../../assets/f.png'

import seven_img from '../../assets/7.png'
import eight_img from '../../assets/8.png'
import nine_img from '../../assets/9.png'
import op_img from '../../assets/op.png'
import cp_img from '../../assets/cp.png'

import four_img from '../../assets/4.png'
import five_img from '../../assets/5.png'
import six_img from '../../assets/6.png'
import m_img from '../../assets/m.png'
import d_img from '../../assets/d.png'

import one_img from '../../assets/1.png'
import two_img from '../../assets/2.png'
import three_img from '../../assets/3.png'
import p_img from '../../assets/p.png'
import dm_img from '../../assets/dm.png'

import zero_img from '../../assets/0.png'
import dot_img from '../../assets/dot.png'
import pi_img from '../../assets/pi.png'
import lr_img from '../../assets/lr.png'
import eq_img from '../../assets/eq.png'



function Buttons({ButtonHandler}){
    const key_images = [
        c_img, um_img, arc_img, vp_img,f_img,
        seven_img, eight_img, nine_img, op_img, cp_img,
        four_img, five_img, six_img, m_img, d_img,
        one_img, two_img, three_img, p_img, dm_img,
        zero_img, dot_img, pi_img, lr_img,eq_img,
    ];

    const key_values = [
        'C','/-/','','vp','F',
        '7', '8', '9', '','',
        '4', '5', '6','','',
        '1', '2', '3','','',
        '0','.','pi','','=',
    ];

    const keyContext = Array.from({length: 25}, (_, idx) => ({img: key_images[idx], val: key_values[idx]}))

    const buttonGen = (ctx, idx) => {
        return (<Button key={idx} 
                keyImg={ctx.img} 
                keyRed={idx == 0? true:false}
                keyVal={ctx.val}
                handler={ButtonHandler}/>);
    };

    const buttons = Array.from(keyContext, buttonGen);

    return (
        <div className={styles.buttonsContainer}>
            {buttons}
        </div>
    );
}

export default Buttons