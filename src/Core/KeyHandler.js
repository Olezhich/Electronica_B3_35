import { IsOverflow, ResetRegister } from "./Register.js";

export function KeyHandler({prev, key, SelfState}){
    let res = {...prev};
    if('0123456789'.includes(key)){
        if(SelfState.FunctionalMode)
            FunctionHandler({prev, key, res});
        else
            NumberHandler({prev, key, res});
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
        return({register: ResetRegister(), state: {...SelfState, FunctionalMode: false}});
    }else if(key === 'pi'){
        res = {...ResetRegister(), mStr: '3.1415926'};
    }else if(key === 'F'){
        return ({register: null, state: {...SelfState, FunctionalMode: true}});;
    }
    res.mantissa = res.mStr === '' ? 0 : Number(res.mStr);
    res.dStr = (res.dStr === '0' || res.dStr === '-0' ? '' : res.dStr);
    res.degree = res.dStr === '' ? 0 : Number(res.dStr);
    res.mOverflow = IsOverflow(res.mantissa);
    console.log('KeyHandler: ',res.mStr, res.dStr);
    const state = {...SelfState, FunctionalMode: false};
    return({register: res, state});
}

function NumberHandler({prev, key, res}){
    if(prev.mOverflow && !prev.inputDegree)
        return null;
    else if(!prev.inputDegree)
        res.mStr = prev.mStr + key;
    else if(Math.abs(prev.degree) * 10 > 90){
        // if(key === '0')
        //     return null;
        res.dStr = (prev.dStr.startsWith('-') ? '-' : '') + key;
    }
    // else if(prev.dStr === '' && key === '0')
    //     return null;
    else{
        res.dStr = prev.dStr + key;
    }   
}

function FunctionHandler({prev, key, res}){
    let newMantissa;
    let newDegree;
    let degree = prev.degree;
    let mantissa = prev.mantissa;
    if(key === '6'){ //sqrt
        if(prev.degree%2 === 1){
            degree -= 1;
            mantissa *= 10;
        }
        newMantissa = Math.sqrt(mantissa);
        newDegree = degree / 2;
        console.log('SQRT func: ',newMantissa, newDegree);
        // while(newMantissa < 100_000_000 && newDegree > 0){
        //     newDegree -= 1;
        //     newMantissa *= 10;
        // }
        // while(String(newMantissa).startsWith('0')  && newDegree < 0){ 
        //     newDegree += 1;
        //     newMantissa /= 10;
        // }
        // while(String(newMantissa).length < 9){
        //     newDegree += 1;
        //     newMantissa /= 10;
        // }
        // if(String(newMantissa).length > 9){
        //     while(newMantissa > 10){
        //         newDegree += 1;
        //     newMantissa /= 10;
        //     }
        // }
        res.dStr = String(newDegree);
        newMantissa = String(newMantissa.toFixed(7));
        res.mStr = (newMantissa.includes('.')? newMantissa.slice(0,9):newMantissa.slice(0,8));
        
        console.log('SQRT func: ',newMantissa, newDegree, res.mStr, res.dStr);
        //res.dStr = String(prev.degree / 2);
    }
}