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
            M: ResetRegister(),
            PrevOperation: null,
        }
    )
}

export function CloneRS(prev) {
  return {
    ...prev,
    X: { ...prev.X },
    Y: { ...prev.Y },
    A: { ...prev.A },
    B: { ...prev.B },
    M: { ...prev.M },
  };
}