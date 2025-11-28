import { ArcSinHandler, ArcCosHandler, ArcTanHandler, CosHandler, DegreesToRadians, FactorialHandler, RadiansToDegrees, SinHandler, TanHandler } from "./MathFunctions";
import { IsOverflow, ResetRegister, NormalizeRegister, CheckOverflow, ResetRS, CloneRS} from "./Register";

export function KeyHandler({prev, key, SelfState}){
    let res = CloneRS(prev);
    let error = false;
    let rad = SelfState.RadianMode;
    let bin_operation_flag = false;

    if(SelfState.OverFlow){
        if(key === 'C'){
            return({register: {...ResetRS(), PrevOperation: 'C'}, state: {...SelfState, FunctionalMode: false, ArcMode: false, OverFlow: false}});
        }else{
            return({register: res, state: SelfState});
        }
    }

    let new_num_flag = SelfState.NewNumMode;

    if('0123456789'.includes(key)){
        if(SelfState.FunctionalMode)
            error = error | FunctionHandler({prev: prev.X, key, res: res.X, rad});
        else if(SelfState.ArcMode)
            error = error | ArcHandler({prev: prev.X, key, res: res.X, rad});
        else{
            if(new_num_flag){
                prev.X = ResetRegister();
                res.X = ResetRegister();
            }
            NumberHandler({prev: prev.X, key, res: res.X});
            new_num_flag = false;
            key = prev.PrevOperation;
        }
    }else if(key === '/-/'){
        if(SelfState.FunctionalMode)
            error = error | FunctionHandler({prev: prev.X, key, res: res.X, rad});
        else if(prev.X.inputDegree){
            if(prev.X.dStr !== '')
                res.X.dStr = prev.X.dStr.startsWith('-') ? prev.X.dStr.slice(1) : '-' + prev.X.dStr;
        }else{
            if(prev.X.mStr !== '')
                res.X.mStr = prev.X.mStr.startsWith('-') ? prev.X.mStr.slice(1) : '-' + prev.X.mStr;
        }
        key = prev.PrevOperation;
    }else if(key === '.'){
        if(SelfState.FunctionalMode)
            error = error | FunctionHandler({prev: prev.X, key, res: res.X, rad});
        else{
            res.X.mStr = prev.X.mStr.includes('.') ? prev.X.mStr : prev.X.mStr + '.';
        }
        key = prev.PrevOperation;
    }else if(key === 'vp'){
        res.X.inputDegree = true;
    }else if(key === 'C'){
        if(prev.PrevOperation === 'C'){
            return({register: ResetRS(), state: {...SelfState, FunctionalMode: false, ArcMode: false}});
        }
        return({register: {...prev, X: {...ResetRegister()}, PrevOperation: 'C'}, state: {...SelfState, FunctionalMode: false, ArcMode: false}});
    }else if(key === 'pi'){
        if(SelfState.FunctionalMode)
            error = error | FunctionHandler({prev: prev.X, key, res: res.X, rad});
        else{
            res.X = {...ResetRegister(), mStr: '3.1415926'};
        }
    }else if(key === 'F'){
        return ({register: null, state: {...SelfState, FunctionalMode: true}});
    }else if(key === 'arc'){
        return ({register: null, state: {...SelfState, ArcMode: true}});
    }else if('+-*/'.includes(key)){
        if(res.Y.mStr){ //сначала считаем промежуточный итог
            let tmp = EvalHandler(prev);
            if(tmp){
                res = tmp;
            }else{
                error = true;
            }
        }
        res.X.operation = key;
        bin_operation_flag = true;
        res.Y = {...res.X};
        new_num_flag = true;
    }else if(key === '('){
        res = OpenBracketHandler(prev);
        new_num_flag = true;
    }else if(key === ')'){
        let tmp = CloseBracketHandler(prev);
        if(tmp){
            res = tmp;
        }else{
            error = true;
        }
        bin_operation_flag = true;
    }else if(key === '='){
        let tmp = EvalHandler(prev);
        if(tmp){
            res = tmp;
            new_num_flag = true;
            bin_operation_flag = true;
        }else{
            error = true;
        }
    }


    res.X.mantissa = res.X.mStr === '' ? 0 : Number(res.X.mStr);
    res.X.dStr = (res.X.dStr === '0' || res.X.dStr === '-0' ? '' : res.X.dStr);
    res.X.degree = res.X.dStr === '' ? 0 : Number(res.X.dStr);
    res.X.mOverflow = IsOverflow(res.X.mantissa);

    res.Y.mantissa = res.Y.mStr === '' ? 0 : Number(res.Y.mStr);
    res.Y.dStr = (res.Y.dStr === '0' || res.Y.dStr === '-0' ? '' : res.Y.dStr);
    res.Y.degree = res.Y.dStr === '' ? 0 : Number(res.Y.dStr);
    res.PrevOperation = key;
    
    // if(!bin_operation_flag)
    //     res.X.operation = null;

    let state = {...SelfState, FunctionalMode: false, ArcMode: false, NewNumMode: new_num_flag};
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

function EvalHandler(prev){
    if(!prev.Y.mStr){
        return(
            {...prev, X: {...prev.X, operation: null}}
        );
    }
    const CurrentOper = prev.Y.operation;
    
    const wr = prev.Y.mantissa * Math.pow(10, prev.Y.degree);
    const dr = prev.X.mantissa * Math.pow(10, prev.X.degree);

    let newMantissa = 0;

    if(CurrentOper === '-'){
        if(prev.PrevOperation !== '=')
            newMantissa = wr - dr;
        else
            newMantissa = dr - wr;
    }else if(CurrentOper === '+'){
        newMantissa = wr + dr;
    }else if(CurrentOper === '*'){
        newMantissa = wr * dr;
    }else if(CurrentOper === '/' && dr != 0){
        if(prev.PrevOperation !== '=')
            newMantissa = wr / dr;
        else
            newMantissa = dr / wr;
            // newMantissa = wr / dr;
    }else{
        return null;
    }

    const processed = NormalizeRegister({mantissa: newMantissa, degree: 0});
    if(prev.PrevOperation !== '='){
        return( {...prev, X: {...ResetRegister(), mStr: String(processed.mantissa), dStr: String(processed.degree), operation: '='}, Y: {...prev.X, operation: prev.Y.operation}});
    }else{
        return( {...prev, X: {...ResetRegister(), mStr: String(processed.mantissa), dStr: String(processed.degree), operation: '='}, Y: {...prev.Y, operation: prev.Y.operation}});
    }
    
}

function OpenBracketHandler(prev){
    return(
        {...prev, Y: {...ResetRegister()}, B: {...prev.A}, A: {...prev.Y}}
    );
}


function CloseBracketHandler(prev){
    let xy_res = EvalHandler(prev);
    if(!xy_res){
        return null;
    }
    xy_res = {...xy_res, X: {...xy_res.X, operation: null}, Y: {...xy_res.A}, A: {...xy_res.B}, B: {...ResetRegister()}};

    if(xy_res.Y.mStr){
        xy_res.X.mantissa = xy_res.X.mStr === '' ? 0 : Number(xy_res.X.mStr);
        xy_res.X.degree = xy_res.X.dStr === '' ? 0 : Number(xy_res.X.dStr);

        xy_res.Y.mantissa = xy_res.Y.mStr === '' ? 0 : Number(xy_res.Y.mStr);
        xy_res.Y.degree = xy_res.Y.dStr === '' ? 0 : Number(xy_res.Y.dStr);

        xy_res = EvalHandler(xy_res);
        if(!xy_res){
            return null;
        }
        return (
        {...xy_res, X: {...xy_res.X, operation: null}, Y: {...xy_res.A}, A: {...xy_res.B}}
        );
    }
    return(
        {...xy_res, X: {...xy_res.X, operation: null}}
    );
    
}



