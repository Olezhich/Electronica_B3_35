export function DegreesToRadians({mantissa, degree}){
    const value = mantissa * Math.pow(10, degree);
    return({
        mantissa: value / 180 * Math.PI,
        degree: 0,
    });
}

export function RadiansToDegrees({mantissa, degree}){
    const value = mantissa * Math.pow(10, degree);
    return({
        mantissa: value / Math.PI * 180,
        degree: 0,
    });
}