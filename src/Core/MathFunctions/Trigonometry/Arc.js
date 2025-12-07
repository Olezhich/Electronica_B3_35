export function ArcSinHandler({prev: {mantissa, degree}, rad}){
    let val = mantissa * Math.pow(10, degree);
    if(!(Math.abs(val) <= 1 && Math.abs(val) > 1e-9 || val === 0)){
        return NaN;
    }

    let result = Math.asin(val);
    if (!rad) {
        result = result * 180 / Math.PI;
    }
    //result = Number(result.toFixed(7));
    const res = {mantissa: result, degree: 0};
    return(res);
}

export function ArcCosHandler({prev: {mantissa, degree}, rad}){
    let val = mantissa * Math.pow(10, degree);
    if(!(Math.abs(val) <= 1 && Math.abs(val) > 1e-9 || val === 0)){
        return NaN;
    }

    let result = Math.acos(val);
    if (!rad) {
        result = result * 180 / Math.PI;
    }
    //result = Number(result.toFixed(7));
    const res = {mantissa: result, degree: 0};
    return(res);
}

export function ArcTanHandler({prev: {mantissa, degree}, rad}){
    let val = mantissa * Math.pow(10, degree);
    if(!(Math.abs(val) < 1e9 && Math.abs(val) > 1e-9)){
        return NaN;
    }

    let result = Math.atan(val);
    if (!rad) {
        result = result * 180 / Math.PI;
    }
    //result = Number(result.toFixed(7));
    const res = {mantissa: result, degree: 0};
    console.log('ARCTAN', res);
    return(res);
}