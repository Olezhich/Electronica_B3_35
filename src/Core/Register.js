export function ResetRegister() {
    return (
        {
            mStr: '',
            dStr: '',
            mantissa: 0,
            degree: 0,
            mOverflow: false,
            inputDegree: false,
        }
    );
}

export function IsOverflow(mantissa) {
    const ms = String(mantissa);
    let len = ms.length;
    len = (ms.includes('-') ? len - 1 : len);
    len = (ms.includes('.') ? len - 1 : len);
    return (len >= 8);
}

export function ExtractSignificantDigits(num) {
    if (num === 0) {
        return { digits: 0, shift: 0 };
    }

    const sign = Math.sign(num);
    num = Math.abs(num);

    let shift = 0;

    while (num % 1 !== 0) {
        num *= 10;
        shift--;
    }
    console.log(num, shift);
    while (num >= 100_000_000) {
        num = Math.trunc(num/10);
        shift++;
    }
    
    const str_num = String(num);
    const digits = Number(str_num.substring(0,8)) * sign;

    return { digits, shift };
}

export function NormalizeRegister({mantissa, degree}) {

    if (mantissa === 0) {
        return { mantissa: 0, degree: 0 };
    }

    const res = ExtractSignificantDigits(mantissa);
    mantissa = res.digits;
    degree += res.shift;

    // console.log(mantissa);

    m_len = String(Math.abs(mantissa)).length
    if(degree < 0){
        if(Math.max(m_len, Math.abs(degree) + 1) <= 8){
            //число можно представить без степени
            while(degree < 0){
                mantissa /=10;
                degree++;
            }
        }else{
            //число нельзя представить без степени, оно будет представлено как мантисса и порядок
            while(mantissa > 10){
                mantissa /= 10;
                degree++;
            }
        }
    }else if(degree > 0){
        if(m_len + degree <= 8){
            //число можно представить без степени
            while(degree > 0){
                mantissa *= 10;
                degree--;
            }
        }else{
            //число нельзя представить без степени, оно будет представлено как мантисса и порядок
            while(mantissa > 10){
                mantissa /= 10;
                degree++;
            }
        }
    }
    const round_val = 10 ** m_len;
    mantissa = Math.round(mantissa * round_val) / round_val;
    
    return { mantissa: mantissa, degree: degree};
}