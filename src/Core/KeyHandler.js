import { IsOverflow } from "./Register.js";

export function KeyHandler({prev, key}){
    let newMStr = prev.mStr;
    let newDStr = prev.dStr;
    let newMantissa;
    let newDegree;
    let newOverflow;
    let newInputDegree = prev.inputDegree;
    if('0123456789'.includes(key)){
        if(prev.mOverflow && !prev.inputDegree)
            return null;
        else if(!prev.inputDegree)
            newMStr = prev.mStr + key;
        else{
            if(Math.abs(prev.degree) * 10 > 90 || key === '0')
                return null;
            newDStr = prev.dStr + key;
        }
    }else if(key === '/-/'){
        if(prev.inputDegree){
            if(prev.dStr !== '')
                newDStr = prev.dStr.startsWith('-') ? prev.dStr.slice(1) : '-' + prev.dStr;
        }else{
            if(prev.mStr !== '')
                newMStr = prev.mStr.startsWith('-') ? prev.mStr.slice(1) : '-' + prev.mStr;
        }
    }else if(key === '.'){
        newMStr = prev.mStr.includes('.') ? prev.mStr : prev.mStr + '.';
    }else if(key === 'vp'){
        newInputDegree = true;
    }
    newMantissa = newMStr === '' ? 0 : Number(newMStr);
    newDegree = newDStr === '' ? 1 : Number(newDStr);
    newOverflow = IsOverflow(newMantissa);
    return ({...prev, 
        mantissa: newMantissa, 
        degree: newDegree,
        dStr: newDStr,
        mStr: newMStr, 
        mOverflow: newOverflow,
        inputDegree: newInputDegree,
    });
}