export function SinHandler({prev: {mantissa, degree}, rad}){
    let val = mantissa * Math.pow(10, degree);
    if(rad && Math.abs(val) > 24*360 || !rad && Math.abs(val) > 49 * Math.PI){
        return NaN;
    }
    if(!rad){
        val = mantissa/180 * Math.PI;
    }
    val = Math.sin(val);
    //val = Number(val.toFixed(7));
    const res = {mantissa: val, degree: 0}
    return(res);
}

export function CosHandler({prev: {mantissa, degree}, rad}){
    let val = mantissa * Math.pow(10, degree);
    if(rad && Math.abs(val) > 24*360 || !rad && Math.abs(val) > 49 * Math.PI){
        return NaN;
    }
    if(!rad){
        val = mantissa/180 * Math.PI;
    }
    val = Math.cos(val);
    //val = Number(val.toFixed(7));
    const res = {mantissa: val, degree: 0}
    return(res);
}

export function TanHandler({prev: {mantissa, degree}, rad}){
    let val = mantissa * Math.pow(10, degree);
    if(!rad){
        val = mantissa/180 * Math.PI;
    }
    if(Math.abs(val) > 49 * Math.PI && !CheckTan(val)){
        return NaN;
    }
    val = Math.tan(val);
    //val = Number(val.toFixed(7));
    const res = {mantissa: val, degree: 0}
    return(res);
}

function CheckTan(val){
    val = Math.abs(val) - Math.PI /2;
    if(val > 1e-7 && val < Math.PI){
        return true;
    }else if(val <= 1e-7){
        return false;
    }
    while(val > 1e-7){
        val -= Math.PI;
    }
    if(val > 0){
        return false;
    }
    return true;
}