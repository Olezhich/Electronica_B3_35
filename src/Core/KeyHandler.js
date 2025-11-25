import { ArcSinHandler, ArcCosHandler, ArcTanHandler, CosHandler, DegreesToRadians, FactorialHandler, RadiansToDegrees, SinHandler, TanHandler } from "./MathFunctions";
import { IsOverflow, ResetRegister, NormalizeRegister, CheckOverflow, ResetRS, CloneRS} from "./Register";

export function KeyHandler({prev, key, SelfState}){
    let res = CloneRS(prev);
    let error = false;
    let rad = SelfState.RadianMode;
    let bin_operation_flag = false;

    if(SelfState.OverFlow){
        if(key === 'C'){
            return({register: ResetRS(), state: {...SelfState, FunctionalMode: false, ArcMode: false, OverFlow: false}});
        }else{
            return({register: res, state: SelfState});
        }
    }

    let X_prev = prev.X;
    let X_res = res.X;

    if('0123456789'.includes(key)){
        if(SelfState.FunctionalMode)
            error = error | FunctionHandler({prev: X_prev, key, res: X_res, rad});
        else if(SelfState.ArcMode)
            error = error | ArcHandler({prev: X_prev, key, res: X_res, rad});
        else
            NumberHandler({prev: X_prev, key, res: X_res});
    }else if(key === '/-/'){
        if(SelfState.FunctionalMode)
            error = error | FunctionHandler({prev: X_prev, key, res: X_res, rad});
        else if(X_prev.inputDegree){
            if(X_prev.dStr !== '')
                X_res.dStr = X_prev.dStr.startsWith('-') ? X_prev.dStr.slice(1) : '-' + X_prev.dStr;
        }else{
            if(X_prev.mStr !== '')
                X_res.mStr = X_prev.mStr.startsWith('-') ? X_prev.mStr.slice(1) : '-' + X_prev.mStr;
        }
    }else if(key === '.'){
        if(SelfState.FunctionalMode)
            error = error | FunctionHandler({prev: X_prev, key, res: X_res, rad});
        else{
            X_res.mStr = X_prev.mStr.includes('.') ? X_prev.mStr : X_prev.mStr + '.';
        }
    }else if(key === 'vp'){
        X_res.inputDegree = true;
    }else if(key === 'C'){
        return({register: ResetRS(), state: {...SelfState, FunctionalMode: false, ArcMode: false}});
    }else if(key === 'pi'){
        if(SelfState.FunctionalMode)
            error = error | FunctionHandler({prev: X_prev, key, res: X_res, rad});
        else{
            X_res = {...ResetRegister(), mStr: '3.1415926'};
        }
    }else if(key === 'F'){
        return ({register: null, state: {...SelfState, FunctionalMode: true}});
    }else if(key === 'arc'){
        return ({register: null, state: {...SelfState, ArcMode: true}});
    }
    res.X.mantissa = X_res.mStr === '' ? 0 : Number(X_res.mStr);
    res.X.dStr = (X_res.dStr === '0' || X_res.dStr === '-0' ? '' : X_res.dStr);
    res.X.degree = X_res.dStr === '' ? 0 : Number(X_res.dStr);
    res.X.mOverflow = IsOverflow(X_res.mantissa);

    if(!bin_operation_flag)
        res.X.operation = null;
    //console.log('KeyHandler: ',res.mStr, res.dStr);
    let state = {...SelfState, FunctionalMode: false, ArcMode: false};
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
        if(Number.isNaN(foo)){
            return true;
        }
        newMantissa = foo.mantissa;
        newDegree = foo.degree;
    }else if(key == '2'){ //cos
        let foo = CosHandler({prev, rad});
        if(Number.isNaN(foo)){
            return true;
        }
        newMantissa = foo.mantissa;
        newDegree = foo.degree;
    }else if(key == '3'){ //tan
        let foo = TanHandler({prev, rad});
        if(Number.isNaN(foo)){
            return true;
        }
        newMantissa = foo.mantissa;
        newDegree = foo.degree;
    }else if(key == 'pi'){ //n!
        let foo = FactorialHandler(prev);
        if(Number.isNaN(foo)){
            return true;
        }
        newMantissa = foo.mantissa;
        newDegree = foo.degree;
    }else{
        return false;
    }

    const processed = NormalizeRegister({mantissa: newMantissa, degree: newDegree});

    res.mStr = String(processed.mantissa);
    res.dStr = String(processed.degree);
}

function ArcHandler({prev, key, res, rad}){
    let newMantissa;
    let newDegree;

    if(key == '1'){ //arcsin
        let foo = ArcSinHandler({prev,rad});
        if(Number.isNaN(foo)){
            return true;
        }
        newMantissa = foo.mantissa;
        newDegree = foo.degree;
    }else if(key == '2'){ //arccos
        let foo = ArcCosHandler({prev,rad});
        if(Number.isNaN(foo)){
            return true;
        }
        newMantissa = foo.mantissa;
        newDegree = foo.degree;
    }else if(key == '3'){ //arctan
        let foo = ArcTanHandler({prev,rad});
        if(Number.isNaN(foo)){
            return true;
        }
        newMantissa = foo.mantissa;
        newDegree = foo.degree;
    }else{
        return false;
    }

    const processed = NormalizeRegister({mantissa: newMantissa, degree: newDegree});

    res.mStr = String(processed.mantissa);
    res.dStr = String(processed.degree);
}


