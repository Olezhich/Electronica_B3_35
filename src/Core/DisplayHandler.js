export function DisplayString(DisplayRegister, MemoryRegister, SelfState) {
    if (SelfState.OverFlow) {
        return '.0'.repeat(8) + '..0.0.';
    }

    const mem = MemoryRegister.mStr !== '';
    let displayStr = ((DisplayRegister.mantissa < 0) ? '' : ' ') +
        preciseFloatToString(DisplayRegister.mantissa, DisplayRegister.mStr) +
        (preciseFloatToString(DisplayRegister.mantissa, DisplayRegister.mStr).includes('.') ? '' : '.');
    const currentLen = displayStr.length;
    displayStr += ' '.repeat(10 - currentLen);

    // Определяем, нужно ли вообще выводить степень (как в оригинале)
    let degreeValue = null;
    if (DisplayRegister.degree > 1 || DisplayRegister.degree < 0) {
        degreeValue = String(DisplayRegister.degree);
    } else if (DisplayRegister.inputDegree && DisplayRegister.dStr) {
        degreeValue = String(DisplayRegister.degree);
    }

    let degreeStr = '';

    let deg_str = String(Math.abs(DisplayRegister.degree));
    if(deg_str.length === 1){
        deg_str = ' ' + deg_str;
    }

    if (mem) {
        const sign = DisplayRegister.degree < 0 ? '-' : ' ';
        if (degreeValue !== null) {
            // Степень не ноль — показываем модуль после 'm'
            degreeStr = sign + 'm' + deg_str;
        } else {
            // Степень 0 — только 'm'
            degreeStr = sign + 'm';
        }
    } else if (degreeValue !== null) {
        // Без 'm' — как было
        degreeStr = (DisplayRegister.degree < 0) ? '-' + deg_str : ' ' + deg_str;
    }

    return displayStr + degreeStr;
}

function preciseFloatToString(num, mStr) {
    //if (num === 0) return '0';

    const str = num.toString();
    let s = str;

    // Если в строке есть 'e', то это экспонента — парсим вручную
    if (str.includes('e')) {
        const [mantissa, exp] = str.split('e');
        const m = parseFloat(mantissa);
        const e = parseInt(exp, 10);

        // Преобразуем в строку с нужным сдвигом
        s = mantissa.replace('.', '');
        let dotPos = mantissa.indexOf('.') !== -1 ? mantissa.indexOf('.') : s.length;

        // Позиция точки после сдвига
        dotPos += e;

        if (dotPos <= 0) {
            // Точка слева от числа => добавляем нули
            s = '0.' + '0'.repeat(-dotPos) + s;
        } else if (dotPos >= s.length) {
            // Точка справа => добавляем нули
            s = s + '0'.repeat(dotPos - s.length);
        } else {
            // Вставляем точку
            s = s.slice(0, dotPos) + '.' + s.slice(dotPos);
        }

        // Убираем ведущие и хвостовые нули
        s = s.replace(/^(-?)0+(\d)/, '$1$2'); // убираем ведущие нули
        if (s.includes('.')) {
            s = s.replace(/\.?0+$/, ''); // убираем хвостовые нули
        }
        //return s;
    }

    // Если не экспонента — просто убираем хвостовые нули
    if (mStr.includes('.') || num === 0) {
        // return str.replace(/\.?0+$/, '');
        const trg = countTrailingZerosInFraction(mStr);
        const has = countTrailingZerosInFraction(s);
        const cur = 9 - (s.length - (s.includes('-')? 1:0));
        if(cur < 0){
            return s.slice(0, 9);
        }
        const add = Math.min(cur, (trg - has >0? trg - has: 0));
        if(add > 0){
            let final = str;
            if(s.length === 1)
                final += '.'
            return final + '0'.repeat(add);
        }
    }

    return s;
}

function countTrailingZerosInFraction(numberStr) {
  const match = numberStr.match(/\.(\d*?)0*$/);
  if (!match) return 0;
  
  const fractionPart = match[1] || '';
  const trailingZeros = match[0].match(/0*$/)[0];
  return trailingZeros.length;
}