//проверка переполнения для строк

export function IsOverflow(mantissa) {
    const ms = String(mantissa);
    let len = ms.length;
    len = (ms.includes('-') ? len - 1 : len);
    len = (ms.includes('.') ? len - 1 : len);
    return (len >= 8);
}

//проверка переполнения для чисел

export function CheckOverflow({mantissa, degree}) {
    let m = mantissa;
    let d = degree;

    if (m === 0) {
        return false; // 0 не переполняется
    }

    // Нормализуем мантиссу к [1, 10) или (-10, -1]
    while (Math.abs(m) >= 10) {
        m /= 10;
        d += 1;
    }
    while (Math.abs(m) > 0 && Math.abs(m) < 1) {
        m *= 10;
        d -= 1;
    }

    return Math.abs(d) > 99;
}