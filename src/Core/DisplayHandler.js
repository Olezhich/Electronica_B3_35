export function DisplayString(DisplayRegister){
    let displayStr = ((DisplayRegister.mantissa < 0) ? '' : ' ') + 
        String(DisplayRegister.mantissa) + 
        (String(DisplayRegister.mantissa).includes('.') ? '' : '.');
    const currentLen = displayStr.length;
    displayStr += ' '.repeat(10 - currentLen);
    let degreeStr = ((DisplayRegister.degree < 0) ? '' : ' ') + 
        ((DisplayRegister.degree > 1  || DisplayRegister.degree < 0) ? 
            String(DisplayRegister.degree) : '');
    return (displayStr + degreeStr);
}