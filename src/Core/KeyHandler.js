import { ArcSinHandler, ArcCosHandler, ArcTanHandler, CosHandler, DegreesToRadians, FactorialHandler, RadiansToDegrees, SinHandler, TanHandler } from "./MathFunctions";
import { IsOverflow, ResetRegister, NormalizeRegister, CheckOverflow, ResetRS, CloneRS} from "./Register";

export function KeyHandler({prev, key, SelfState, PowerState}){
    if(!PowerState){
        return {register: null, state: SelfState};
    }
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
            if(key === '9'){
                res.X.operation = 'x^y';
                bin_operation_flag = true;
                res.Y = {...res.X};
                new_num_flag = true;
            }else{
                error = error | FunctionHandler({prev: prev.X, key, res: res.X, rad});
            }
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
        if(SelfState.FunctionalMode){
            ;
        }else if(prev.PrevOperation === 'C'){
            return({register: {...ResetRS(), M: {...prev.M}}, state: {...SelfState, FunctionalMode: false, ArcMode: false}});
        }else{
            return({register: {...prev, X: {...ResetRegister()}, PrevOperation: 'C'}, state: {...SelfState, FunctionalMode: false, ArcMode: false}});
        }
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
    }else if(key === '<->'){
        if(SelfState.FunctionalMode){
            res.M = {...prev.X, operation: prev.M.operation};
            res.X = {...prev.M, operation: prev.X.operation};
        }else{
            res.X = {...prev.Y, operation: prev.X.operation};
            res.Y = {...prev.X, operation: prev.Y.operation};
        }
        key = prev.PrevOperation;
    }else if('+-*/'.includes(key)){
        if(SelfState.FunctionalMode){
            let tmp = MemoryHandler(prev, key);
            if(tmp){
                res = tmp;
            }else{
                error = true;
            }
        }else{
            if(res.Y.mStr && res.X.operation != '='){ //сначала считаем промежуточный итог
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
        }
    }else if(key === '('){
        if(SelfState.FunctionalMode){
            let tmp = MemoryHandler(prev, key);
            if(tmp){
                res = tmp;
            }else{
                error = true;
            }
        }else{
            res = OpenBracketHandler(prev);
            new_num_flag = true;
        }
    }else if(key === ')'){
        if(SelfState.FunctionalMode){
            let tmp = MemoryHandler(prev, key);
            if(tmp){
                res = tmp;
            }else{
                error = true;
            }
        }else{
            let tmp = CloseBracketHandler(prev);
            if(tmp){
                res = tmp;

            }else{
                error = true;
            }
            bin_operation_flag = true;
        }
    }else if(key === '='){
        if(SelfState.FunctionalMode){
            res.X = {...prev.M, operation: prev.X.operation};
        }else{
            let tmp = EvalHandler(prev);
            if(tmp){
                res = tmp;

                new_num_flag = true;
                bin_operation_flag = true;
            }else{
                error = true;
            }
        }
    }

    res.X.mantissa = res.X.mStr === '' ? 0 : Number(res.X.mStr);
    res.X.dStr = (res.X.dStr === '0' || res.X.dStr === '-0' ? '' : res.X.dStr);
    res.X.degree = res.X.dStr === '' ? 0 : Number(res.X.dStr);
    res.X.mOverflow = IsOverflow(res.X.mStr);
    //res.X.mOverflow = IsOverflow(res.X.mantissa);

    res.Y.mantissa = res.Y.mStr === '' ? 0 : Number(res.Y.mStr);
    res.Y.dStr = (res.Y.dStr === '0' || res.Y.dStr === '-0' ? '' : res.Y.dStr);
    res.Y.degree = res.Y.dStr === '' ? 0 : Number(res.Y.dStr);
    res.PrevOperation = key;
    
    // if(!bin_operation_flag)
    //     res.X.operation = null;

    let state = {...SelfState, FunctionalMode: false, ArcMode: false, NewNumMode: new_num_flag};
    if(error || CheckOverflow(res.X)){
        state.OverFlow = true;
    }
    if(error || CheckOverflow(res.Y)){
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
        const x = prev.mantissa * Math.pow(10, prev.degree);

        if (x > 100) {
            return true;
        }
        if (x < -100) {
            return true;
        }

        const result = Math.pow(10, x);

        // Обработка нуля (на случай x → -Infinity, но у тебя уже проверка)
        if (result === 0) {
            newMantissa = 0;
            newDegree = 0;
        } else {
            // Нормализуем в научную запись: mantissa ∈ [1, 10)
            newDegree = Math.floor(Math.log10(result));
            newMantissa = result / Math.pow(10, newDegree);
        }
        // newMantissa = Math.pow(10, prev.mantissa * Math.pow(10, degree));
        // newDegree = 0;
        //newDegree = prev.mantissa * Math.pow(10, degree);
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
        console.log('TAN', newMantissa, newDegree);
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

    const processed_1 = NormalizeRegister({mantissa: newMantissa, degree: newDegree});

    let toFman = processed_1.mantissa;
    if('123457'.includes(key)){
        if(Math.abs(toFman) < 1){
            toFman *= 10;
            processed_1.degree -= 1;
        }
        const pmsm_1 = String(Math.abs(processed_1.mantissa));
        const num_dig_1 = pmsm_1.includes('.') ? pmsm_1.length - 1 : pmsm_1.length;
        if(processed_1.degree === 0 && Math.abs(processed_1.mantissa) < 1 && num_dig_1 >6){
            processed_1.mantissa *= 10;
            processed_1.degree -= 1;
        }
        toFman = Number(toFman.toFixed(5).slice(0,7));
    }
    const processed = NormalizeRegister({mantissa: toFman, degree: processed_1.degree});

    if('123457'.includes(key)){
        const pmsm = String(Math.abs(processed.mantissa));
        const num_dig = pmsm.includes('.') ? pmsm.length - 1 : pmsm.length;
        if(processed.degree === 0 && Math.abs(processed.mantissa) < 1 && num_dig >6){
            processed.mantissa *= 10;
            processed.degree -= 1;
        }
        if(Math.abs(processed.mantissa) > 1 && num_dig > 6){
            processed.degree += (8 - num_dig);
            console.log(num_dig, processed.degree);
        }
        processed.mantissa = Number(processed.mantissa.toFixed(5).slice(0,7));
    }

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

    const processed_1 = NormalizeRegister({mantissa: newMantissa, degree: newDegree});

    let toFman = processed_1.mantissa;
    if('123'.includes(key)){
        if(Math.abs(toFman) < 1){
            toFman *= 10;
            processed_1.degree -= 1;
        }
        const pmsm_1 = String(Math.abs(processed_1.mantissa));
        const num_dig_1 = pmsm_1.includes('.') ? pmsm_1.length - 1 : pmsm_1.length;
        if(processed_1.degree === 0 && Math.abs(processed_1.mantissa) < 1 && num_dig_1 >6){
            processed_1.mantissa *= 10;
            processed_1.degree -= 1;
        }
        toFman = Number(toFman.toFixed(5).slice(0,7));
    }
    const processed = NormalizeRegister({mantissa: toFman, degree: processed_1.degree});

    if('123'.includes(key)){
        const num_dig = String(Math.abs(processed.mantissa)).includes('.') ? String(Math.abs(processed.mantissa)).length - 1 : String(Math.abs(processed.mantissa)).length;
        if(processed.degree === 0 && Math.abs(processed.mantissa) < 1 && num_dig >6){
            processed.mantissa *= 10;
            processed.degree -= 1;
        }
        if(Math.abs(processed.mantissa) > 1  && num_dig > 6){
            processed.degree += 8 - num_dig;
        }
        processed.mantissa = Number(processed.mantissa.toFixed(5).slice(0,7));
    }


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
    }else if(CurrentOper === 'x^y'){
        const result = Math.pow(wr, dr);
        if(!isFinite(result)){
            return null;
        }
        const absResult = Math.abs(result);
        if (absResult === 0){
            return null;
        }
        const log10 = Math.log10(absResult);
        if (log10 < -100 || log10 > 100){
            return null;
        }
        newMantissa = result;

        const processed_1 = NormalizeRegister({mantissa: newMantissa, degree: 0});
        let toFman = processed_1.mantissa;
        if(Math.abs(toFman) < 1){
            toFman *= 10;
            processed_1.degree -= 1;
        }
        const num_dig_1 = String(Math.abs(processed_1.mantissa)).includes('.') ? String(Math.abs(processed_1.mantissa)).length - 1 : String(Math.abs(processed_1.mantissa)).length;
        if(processed_1.degree === 0 && Math.abs(processed_1.mantissa) < 1 && num_dig_1 >6){
            processed_1.mantissa *= 10;
            processed_1.degree -= 1;
        }
        toFman = Number(toFman.toFixed(5).slice(0,7));
        newMantissa = toFman * Math.pow(10, processed_1.degree);
    }else{
        return null;
    }

    const processed = NormalizeRegister({mantissa: newMantissa, degree: 0});
    if(CurrentOper === 'x^y'){
        const num_dig = String(Math.abs(processed.mantissa)).includes('.') ? String(Math.abs(processed.mantissa)).length - 1 : String(Math.abs(processed.mantissa)).length;
        if(processed.degree === 0 && Math.abs(processed.mantissa) < 1 && num_dig >6){
            processed.mantissa *= 10;
            processed.degree -= 1;
        }
        if(Math.abs(processed.mantissa) > 1  && num_dig > 6){
            processed.degree += 8 - num_dig;
        }
        processed.mantissa = Number(processed.mantissa.toFixed(5).slice(0,7));
    }

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

function MemoryHandler(prev, key){
    let mem_mantissa = prev.M.mantissa * Math.pow(10, prev.Y.degree);
    const dr = prev.X.mantissa * Math.pow(10, prev.X.degree);
    if(key ==='+'){
        mem_mantissa += dr;
    }else if(key === '-'){
        mem_mantissa -= dr;
    }else if(key === '*'){
        mem_mantissa *= dr;
    }else if(key === '/' && dr !== 0){
        mem_mantissa /= dr;
    }else if(key === ')'){
        mem_mantissa = 0;
    }else if(key === '('){
        mem_mantissa = dr;
    }else{
        return null;
    }

    const processed = NormalizeRegister({mantissa: mem_mantissa, degree: 0});
    const mstr = String(processed.mantissa);
    const dstr = String(processed.degree);

    const new_mstr = mstr === '0' || mstr === '-0' ? '' : mstr
    const new_dstr = dstr === '0' || dstr === '-0' ? '' : dstr

    return(
        {...prev, M: {...prev.M, mStr: new_mstr, dStr: new_dstr, mantissa: processed.mantissa, degree: processed.degree}}
    );

}


