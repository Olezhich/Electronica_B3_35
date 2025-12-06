
//Используется для нормализации мантиссы и порядка после математических функций




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
    // console.log(num, shift);
    while (num >= 100_000_000) {
        num = Math.trunc(num/10);
        shift++;
    }
    
    const str_num = String(num);
    let digits = Number(str_num.substring(0,8)) * sign;

    return { digits, shift };
}



export function CalculateMeanZeros(mantissa) {
  let mean_zeros = 0;

  if (Math.abs(mantissa) < 1) {
    const str = mantissa.toFixed(7);
    let started = false;
    for (let i of str) {
      if (i === '-' || i === '.') {
        continue;
      }
      if (i === '0' && !started) {
        mean_zeros++;
      } else {
        started = true;
      }
    }
  } else {
    const str = String(mantissa);
    for (let i = str.length - 1; i >= 0; i--) {
      if (str[i] === '0') {
        mean_zeros++;
      } else {
        break;
      }
    }
  }
  return mean_zeros;
}

export function NormalizeRegister({mantissa, degree}) {

    if (mantissa == 0) {
        return { mantissa: 0, degree: 0 };
    }

    if (degree == -0){
        degree = 0;
    }

    const res = ExtractSignificantDigits(mantissa);
    mantissa = res.digits;
    degree += res.shift;

    let mean_zeros = 0;

    // console.log(mantissa);

    const m_len = String(Math.abs(mantissa)).length
    if(degree < 0){
        if(Math.max(m_len, Math.abs(degree) + 1) <= 8){
            //число можно представить без степени
            while(degree < 0){
                mantissa /=10;
                degree++;
            }

        }else{
            //число нельзя представить без степени, оно будет представлено как мантисса и порядок
            while(Math.abs(mantissa) > 10){
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
            mean_zeros = true;
        }else{
            //число нельзя представить без степени, оно будет представлено как мантисса и порядок
            while(Math.abs(mantissa) > 10){
                mantissa /= 10;
                degree++;
            }
        }
    }

    const round_val = 10 ** (m_len + CalculateMeanZeros(mantissa));
    mantissa = Math.round(mantissa * round_val) / round_val;

    //mantissa = Number(mantissa.toFixed(m_len + CalculateMeanZeros(mantissa)));
    // console.log('NR', m_len, round_val, mantissa, degree);
    return { mantissa: mantissa, degree: degree};
}