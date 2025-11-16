export function FactorialHandler({mantissa, degree}){
    if(mantissa % 1 != 0 || mantissa < 0){
        return NaN;
    }
    let val = mantissa * Math.pow(10, degree);
    if(val > 69 || val < 1){
        return NaN;
    }
    let res = 1;
    while(val > 1){
        res *= val;
        val -= 1;
    }
    return {mantissa: res, degree: 0};
}