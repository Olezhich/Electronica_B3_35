import { KeyHandler } from "./KeyHandler.js";
import { ResetRegister, ResetRS } from "./Register";
import { ResetSelfState } from "./SelfState.js";

test.each([

    //___INPUT NUMBERS___
    {inputSequence: ['.', '6', '7', '1', '5', '4'], expected: {...ResetRegister(), mantissa: 0.67154}, 
        comment: "Example 1: Enter number 0.67154"},
    {inputSequence: ['6', '.', '2', '8', '3', '1', '/-/'], expected: {...ResetRegister(), mantissa: -6.2831}, 
        comment: "Example 2: Enter number -6.2831"},
    {inputSequence: ['1', '.', '3', '8', '/-/', 'vp', '1', '1', '/-/'], expected: {...ResetRegister(), mantissa: -1.38, degree: -11}, 
        comment: "Example 3: Enter number -0." + '0'.repeat(10)+'138 = -1.38 * 10 ^ -11'},
    {inputSequence: ['1', '.', '3', '8', '/-/', 'vp', '0', '1', '0', '/-/'], expected: {...ResetRegister(), mantissa: -1.38, degree: -10}, 
        comment: "Example 3: Enter number -0." + '0'.repeat(10)+'138 = -1.38 * 10 ^ -10'},
    {inputSequence: ['2', 'vp', '2', '3', '/-/', '3', '2', '/-/'], expected: {...ResetRegister(), mantissa: 2, degree: 32}, 
        comment: "Example 3: Enter number -0." + '0'.repeat(10)+'138 = -1.38 * 10 ^ -10'},
    //___MATH FUNCTIONS TESTS___
    //sqrt
    {inputSequence: ['7', '9', '.', '8', 'vp', '2', '6', '/-/', 'F', '6'], expected: {...ResetRegister(), mantissa: 8.9330845, degree: -13}, 
        comment: "Example 1: sqrt(79.8^{-26})"},
    //10^x
    {inputSequence: ['8', '5', '.', '4', '/-/', 'F', '8'], expected: {...ResetRegister(), mantissa: 3.9810717, degree: -86}, 
        comment: "Example 1: 10^{-85.4})"},
    {inputSequence: ['25', 'vp', '2', '4', '/-/', 'F', '8'], expected: {...ResetRegister(), mantissa: 1, degree: 0}, 
        comment: "Example 2: 10^{25^-24})"},
    // e^x
    {inputSequence: ['1', '9', '3', '.', '7', 'F', '7'], expected: {...ResetRegister(), mantissa: 1.32691, degree: 84}, 
        comment: "Example 1: e^{193.7})"},
    // ln(x)
    {inputSequence: ['1', '.', '3', '2', '6', '9', '1', 'vp', '8', '4', 'F', '4'], expected: {...ResetRegister(), mantissa: 193.7, degree: 0}, 
        comment: "Example 1: ln(1.32691)"},
    // lg(x)
    {inputSequence: ['3', '.', '9', '8', '1', '0', '7', 'vp', '8', '6', '/-/', 'F', '5'], expected: {...ResetRegister(), mantissa: -85.4, degree: 0}, 
        comment: "Example 1: lg(3.98107^{-86})"},
    // degrees to radians
    {inputSequence: ['1', '2', 'F', '.'], expected: {...ResetRegister(), mantissa: 2.0943951, degree: -1}, 
        comment: "Example 1: 12 deg to rad"},
    // sin(x)
    {inputSequence: ['3', '0', 'F', '1'], expected: {...ResetRegister(), mantissa: 0.5, degree: 0}, 
        comment: "Example 1: sin(30)"},
    // cos(x)
    {inputSequence: ['1', '2', '0', 'F', '2'], expected: {...ResetRegister(), mantissa: -0.5, degree: 0}, 
        comment: "Example 1: cos(120)"},
    // tan(x)
    {inputSequence: ['3', '1', '5', 'F', '3'], expected: {...ResetRegister(), mantissa: -1, degree: 0}, 
        comment: "Example 1: tan(315)"},
    // n!
    {inputSequence: ['2', '3', 'F', 'pi'], expected: {...ResetRegister(), mantissa: 2.5852016, degree: 22}, 
        comment: "Example 1: 23!"},
    // arcsin(x)
    {inputSequence: ['0', '.', '5', 'arc', '1'], expected: {...ResetRegister(), mantissa: 30, degree: 0}, 
        comment: "Example 1: arcsin(0.5)"},
    // arccos(x)
    {inputSequence: ['0', '.', '5', '/-/', 'arc', '2'], expected: {...ResetRegister(), mantissa: 120, degree: 0}, 
        comment: "Example 1: arccos(-0.5)"},
    // arctan(x)
    {inputSequence: ['1', '/-/', 'arc', '3'], expected: {...ResetRegister(), mantissa: -45, degree: 0}, 
        comment: "Example 1: arctan(-1)"},
    //___ARITHMETICS___
    // + - * /
    {inputSequence: ['6', '.', '3', '+', '5', '.', '6', '5', '='], expected: {...ResetRegister(), mantissa: 11.95, degree: 0}, 
        comment: "Example 1: 6.3+5.65"},
    {inputSequence: ['7', '5', 'vp', '3', '-', '8', 'vp', '3', '/-/', '='], expected: {...ResetRegister(), mantissa: 74999.992, degree: 0}, 
        comment: "Example 2: 75*10^3 - 8*10^-3"},
    {inputSequence: ['9', '.', '3', '1', 'vp', '3', '2', '/-/', '/', '5', 'vp', '7', '='], expected: {...ResetRegister(), mantissa: 1.8619999, degree: -39}, 
        comment: "Example 3: 9.31*10^-32 / 5*10^7"},
    {inputSequence: ['0', '.', '8', '2', '/-/', 'vp', '2', '7', '*',  '3', '.', '1',  'vp', '1', '3', '='], expected: {...ResetRegister(), mantissa: -25420000, degree: 33}, 
        comment: "Example 4: -0.82*10^27 * 3.1*10^13"},
    {inputSequence: ['4', '.', '3', '+', '(', '5', '.', '1', '*',  '4', 'vp', '2',  '/-/', ')', '-', '(',
        '(', '0', '.', '9', 'vp', '5', '+', '2', '3', ')', '/', '2', ')', '=',
    ], expected: {...ResetRegister(), mantissa: -45006.996, degree: 0}, 
        comment: "Example 5: () - [()/]"},




])("$comment", ({inputSequence, expected}) => {
    let prev = ResetRS();
    let SelfState = ResetSelfState();
    let PowerState = true;
    for(const key of inputSequence){
        res = KeyHandler({prev, key, SelfState, PowerState});
        prev = res.register ?? prev;
        SelfState = res.state;
    };
    expect(prev.X.mantissa).toEqual(expected.mantissa);
    expect(prev.X.degree).toEqual(expected.degree);
});
