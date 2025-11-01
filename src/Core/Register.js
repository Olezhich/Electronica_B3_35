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
