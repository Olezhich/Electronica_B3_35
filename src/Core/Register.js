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

// export function ExtractSignificantDigits(number) {
//     if (number === 0) return { digits: 0, shift: 0 };

//     const isNegative = number < 0;
//     const absNumber = Math.abs(number);
//     const str = absNumber.toString();

//     let integerPart = '';
//     let fractionalPart = '';

//     if (str.includes('.')) {
//         [integerPart, fractionalPart] = str.split('.');
//     } else {
//         integerPart = str;
//     }

//     const allDigits = (integerPart + fractionalPart).replace(/^0+/, '');
//     if (allDigits === '') return { digits: 0, shift: 0 };

//     const digitsStr = allDigits.substring(0, 8);
//     const digits = parseInt(digitsStr) * (isNegative ? -1 : 1);

//     let shift = 0;
//     if (absNumber >= 1) {
//         const originalIntegerDigits = integerPart.replace(/^0*/, '');
//         shift = originalIntegerDigits.length - digitsStr.length;
//     } else {
//         const leadingZeros = fractionalPart.match(/^0*/)[0].length;
//         shift = -(leadingZeros + digitsStr.length);
//     }

//     return { digits, shift };
// }

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
    while (num >= 100_000_000) {
        num = Math.trunc(num/10);
        shift++;
    }
    
    const str_num = String(num);
    const digits = Number(str_num.substring(0,8)) * sign;

    return { digits, shift };
}

export function NormalizeRegister(value) {
    let m = value.mantissa;
    let e = value.degree;

    if (m === 0) {
        return { mantissa: 0, degree: 0 };
    }

    // Приводим к формату, где 1 <= |m| < 10^8 и m имеет <= 8 значащих цифр
    // Сначала нормализуем m к 1 <= |m| < 10, корректируя e
    while (Math.abs(m) >= 10) {
        m /= 10;
        e += 1;
    }
    while (0 < Math.abs(m) && Math.abs(m) < 1) {
        m *= 10;
        e -= 1;
    }

    // Теперь 1 <= |m| < 10
    // Умножаем m на 10^k, чтобы получить 8 значащих цифр
    const k = 8 - (Math.floor(Math.log10(Math.abs(m))) + 1);
    m *= Math.pow(10, k);
    e -= k;

    // Обрезаем до 8 значащих цифр (округление вниз)
    m = Math.trunc(m);

    // Проверяем, не вылезли ли мы за 8 разрядов
    while (Math.abs(m) >= 100000000) {
        m = Math.trunc(m / 10);
        e += 1;
    }

    // Теперь нормализуем обратно, если m < 1
    while (0 < Math.abs(m) && Math.abs(m) < 1) {
        m *= 10;
        e -= 1;
    }

    return { mantissa: m, degree: e };
}