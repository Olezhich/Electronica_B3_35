// export function DisplayString(DisplayRegister, MemoryRegister, SelfState){
//     if(SelfState.OverFlow){
//         return('.0'.repeat(8) + '..0.0.');
//     }
//     let mem = (MemoryRegister.mStr === '') ? false : true;
//     let displayStr = ((DisplayRegister.mantissa < 0) ? '' : ' ') + 
//         preciseFloatToString(DisplayRegister.mantissa) + 
//         (preciseFloatToString(DisplayRegister.mantissa).includes('.') ? '' : '.');
//     const currentLen = displayStr.length;
//     displayStr += ' '.repeat(10 - currentLen);
//     let degreeStr = ((DisplayRegister.degree < 0) ? '' : ' ') + 
//         ((DisplayRegister.degree > 1  || DisplayRegister.degree < 0) ? 
//             String(DisplayRegister.degree) : (DisplayRegister.inputDegree && DisplayRegister.dStr ? String(DisplayRegister.degree) : ''));
//     console.log(displayStr + degreeStr);
//     return (displayStr + degreeStr);
// }

export function DisplayString(DisplayRegister, MemoryRegister, SelfState) {
    if (SelfState.OverFlow) {
        return '.0'.repeat(8) + '..0.0.';
    }

    const mem = MemoryRegister.mStr !== '';
    let displayStr = ((DisplayRegister.mantissa < 0) ? '' : ' ') +
        preciseFloatToString(DisplayRegister.mantissa) +
        (preciseFloatToString(DisplayRegister.mantissa).includes('.') ? '' : '.');
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
    if (mem) {
        const sign = DisplayRegister.degree < 0 ? '-' : ' ';
        if (degreeValue !== null) {
            // Степень не ноль — показываем модуль после 'm'
            degreeStr = sign + 'm' + Math.abs(DisplayRegister.degree);
        } else {
            // Степень 0 — только 'm'
            degreeStr = sign + 'm';
        }
    } else if (degreeValue !== null) {
        // Без 'm' — как было
        degreeStr = (DisplayRegister.degree < 0) ? String(DisplayRegister.degree) : ' ' + String(DisplayRegister.degree);
    }

    return displayStr + degreeStr;
}

function preciseFloatToString(num) {
    if (num === 0) return '0';

    const str = num.toString();

    // Если в строке есть 'e', то это экспонента — парсим вручную
    if (str.includes('e')) {
        const [mantissa, exp] = str.split('e');
        const m = parseFloat(mantissa);
        const e = parseInt(exp, 10);

        // Преобразуем в строку с нужным сдвигом
        let s = mantissa.replace('.', '');
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
        return s;
    }

    // Если не экспонента — просто убираем хвостовые нули
    if (str.includes('.')) {
        return str.replace(/\.?0+$/, '');
    }

    return str;
}