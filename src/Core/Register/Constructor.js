export function ResetRegister() {
    return (
        {
            mStr: '',
            dStr: '',
            mantissa: 0,
            degree: 0,
            mOverflow: false,
            inputDegree: false,
            operation: null,
        }
    );
}

export function ResetRS(){
    return (
        {
            X: ResetRegister(),
            Y: ResetRegister(),
            A: ResetRegister(),
            B: ResetRegister(),
        }
    )
}