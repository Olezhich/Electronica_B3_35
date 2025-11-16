import { CosHandler, DegreesToRadians, FactorialHandler, RadiansToDegrees, SinHandler, TanHandler } from "./MathFunctions";
import { IsOverflow, ResetRegister, NormalizeRegister, CheckOverflow} from "./Register.js";

export function KeyHandler({prev, key, SelfState}){
    let res = {...prev};
    let error = false;
    let rad = SelfState.RadianMode;

    if(SelfState.OverFlow){
        if(key === 'C'){
            return({register: ResetRegister(), state: {...SelfState, FunctionalMode: false, OverFlow: false}});
        }else{
            return({register: res, state: SelfState});
        }
    }

    if('0123456789'.includes(key)){
        if(SelfState.FunctionalMode)
            error = error | FunctionHandler({prev, key, res, rad});
        else
            NumberHandler({prev, key, res});
    }else if(key === '/-/'){
        if(SelfState.FunctionalMode)
            error = error | FunctionHandler({prev, key, res, rad});
        else if(prev.inputDegree){
            if(prev.dStr !== '')
                res.dStr = prev.dStr.startsWith('-') ? prev.dStr.slice(1) : '-' + prev.dStr;
        }else{
            if(prev.mStr !== '')
                res.mStr = prev.mStr.startsWith('-') ? prev.mStr.slice(1) : '-' + prev.mStr;
        }
    }else if(key === '.'){
        if(SelfState.FunctionalMode)
            error = error | FunctionHandler({prev, key, res, rad});
        else{
            res.mStr = prev.mStr.includes('.') ? prev.mStr : prev.mStr + '.';
        }
    }else if(key === 'vp'){
        res.inputDegree = true;
    }else if(key === 'C'){
        return({register: ResetRegister(), state: {...SelfState, FunctionalMode: false}});
    }else if(key === 'pi'){
        if(SelfState.FunctionalMode)
            error = error | FunctionHandler({prev, key, res, rad});
        else{
            res = {...ResetRegister(), mStr: '3.1415926'};
        }
    }else if(key === 'F'){
        return ({register: null, state: {...SelfState, FunctionalMode: true}});;
    }
    res.mantissa = res.mStr === '' ? 0 : Number(res.mStr);
    res.dStr = (res.dStr === '0' || res.dStr === '-0' ? '' : res.dStr);
    res.degree = res.dStr === '' ? 0 : Number(res.dStr);
    res.mOverflow = IsOverflow(res.mantissa);
    //console.log('KeyHandler: ',res.mStr, res.dStr);
    let state = {...SelfState, FunctionalMode: false};
    if(error || CheckOverflow(res)){
        state.OverFlow = true;
    }
    return({register: res, state});
}

function NumberHandler({prev, key, res}){
    if(prev.mOverflow && !prev.inputDegree)
        return null;
    else if(!prev.inputDegree)
        res.mStr = prev.mStr + key;
    else if(Math.abs(prev.degree) * 10 > 90){
        res.dStr = (prev.dStr.startsWith('-') ? '-' : '') + key;
    }
    else{
        res.dStr = prev.dStr + key;
    }   
}

function FunctionHandler({prev, key, res, rad}){
    let newMantissa;
    let newDegree;
    let degree = prev.degree;
    let mantissa = prev.mantissa;

    if(key === '6'){ // sqrt
        if(prev.mantissa < 0){
            return true;
        }
        if(prev.degree%2 === 1){
            degree -= 1;
            mantissa *= 10;
        }
        newMantissa = Math.sqrt(mantissa);
        newDegree = degree / 2;
    }else if(key == '/-/'){ // 1/x
        if(prev.mantissa === 0){
            return true;
        }
        newMantissa = 1/prev.mantissa;
        newDegree = -prev.degree;
    }else if(key == '8'){ // 10^x
        newMantissa = 10;
        newDegree = prev.mantissa;
    }else if(key == '7'){ // e^x
        const maxExpValue = 230.258509; // ln(10^100)

        const xVal = prev.mantissa * Math.pow(10, prev.degree);

        if(Math.abs(xVal) > maxExpValue){
            return true;
        }
        newMantissa = Math.exp(xVal);
        newDegree = 0;
    }else if(key == '4'){ // ln(x)
        if(prev.mantissa <= 0){
            return true;
        }
        newMantissa = Math.log(prev.mantissa) + prev.degree * Math.LN10;
        newDegree = 0;
    }else if(key == '5'){ // lg(x)
        if(prev.mantissa <= 0){
            return true;
        }
        newMantissa = Math.log10(prev.mantissa) + prev.degree;
        newDegree = 0;
    }else if(key == '0'){ //rad -> deg
        let foo = RadiansToDegrees(prev);
        newMantissa = foo.mantissa;
        newDegree = foo.degree;
    }else if(key == '.'){ //deg -> rad
        let foo = DegreesToRadians(prev);
        newMantissa = foo.mantissa;
        newDegree = foo.degree;
    }else if(key == '1'){ //sin
        let foo = SinHandler({prev, rad});
        if(foo === NaN){
            return true;
        }
        newMantissa = foo.mantissa;
        newDegree = foo.degree;
    }else if(key == '2'){ //cos
        let foo = CosHandler({prev, rad});
        if(foo === NaN){
            return true;
        }
        newMantissa = foo.mantissa;
        newDegree = foo.degree;
    }else if(key == '3'){ //tan
        let foo = TanHandler({prev, rad});
        if(foo === NaN){
            return true;
        }
        newMantissa = foo.mantissa;
        newDegree = foo.degree;
    }else if(key == 'pi'){ //n!
        let foo = FactorialHandler(prev);
        if(foo === NaN){
            return true;
        }
        newMantissa = foo.mantissa;
        newDegree = foo.degree;
    }

    const processed = NormalizeRegister({mantissa: newMantissa, degree: newDegree});

    res.mStr = String(processed.mantissa);
    res.dStr = String(processed.degree);
}


