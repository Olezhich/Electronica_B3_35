import { IsOverflow, ResetRegister } from "./Register.js";

export function KeyHandler({prev, key}){
    let res = {...prev}
    if('0123456789'.includes(key)){
        if(prev.mOverflow && !prev.inputDegree)
            return null;
        else if(!prev.inputDegree)
            res.mStr = prev.mStr + key;
        else if(Math.abs(prev.degree) * 10 > 90){
            if(key === '0')
                return null;
            res.dStr = (prev.dStr.startsWith('-') ? '-' : '') + key;
        }
        else if(prev.dStr === '' && key === '0')
            return null;
        else{
            res.dStr = prev.dStr + key;
        }
    }else if(key === '/-/'){
        if(prev.inputDegree){
            if(prev.dStr !== '')
                res.dStr = prev.dStr.startsWith('-') ? prev.dStr.slice(1) : '-' + prev.dStr;
        }else{
            if(prev.mStr !== '')
                res.mStr = prev.mStr.startsWith('-') ? prev.mStr.slice(1) : '-' + prev.mStr;
        }
    }else if(key === '.'){
        res.mStr = prev.mStr.includes('.') ? prev.mStr : prev.mStr + '.';
    }else if(key === 'vp'){
        res.inputDegree = true;
    }else if(key === 'C'){
        return(ResetRegister());
    }else if(key === 'pi'){
        res = {...ResetRegister(), mStr: '3.1415926'};
    }
    res.mantissa = res.mStr === '' ? 0 : Number(res.mStr);
    res.degree = res.dStr === '' ? 1 : Number(res.dStr);
    res.mOverflow = IsOverflow(res.mantissa);
    return(res);
}