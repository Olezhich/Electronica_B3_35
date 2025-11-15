export function SinHandler({prev: {mantissa, degree}, rad}){
    let val = mantissa * Math.pow(10, degree);
    if(Math.abs(val) > 24*360){
        return NaN;
    }
    if(!rad){
        val = mantissa/180 * Math.PI;
    }
    val = Math.sin(val);
    val = Number(val.toFixed(7));
    const res = {mantissa: val, degree: 0}
    return(res);
}

export function CosHandler({prev: {mantissa, degree}, rad}){
    let val = mantissa * Math.pow(10, degree);
    if(Math.abs(val) > 24*360){
        return NaN;
    }
    if(!rad){
        val = mantissa/180 * Math.PI;
    }
    val = Math.cos(val);
    val = Number(val.toFixed(7));
    const res = {mantissa: val, degree: 0}
    return(res);
}