import { KeyHandler } from "./KeyHandler.js";
import { ResetRegister } from "./Register.js";
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
    {inputSequence: ['8', '5', '.', '4', '/-/', 'F', '8'], expected: {...ResetRegister(), mantissa: 10, degree: -85.4}, 
        comment: "Example 1: 10^{-85.4})"},
    // e^x
    {inputSequence: ['1', '9', '3', '.', '7', 'F', '7'], expected: {...ResetRegister(), mantissa: 1.326909, degree: 84}, 
        comment: "Example 1: e^{193.7})"},
    // ln(x)
    {inputSequence: ['1', '.', '3', '2', '6', '9', '1', 'vp', '8', '4', 'F', '4'], expected: {...ResetRegister(), mantissa: 193.7, degree: 0}, 
        comment: "Example 1: ln(1.32691)"},

])("$comment", ({inputSequence, expected}) => {
    let prev = ResetRegister();
    let SelfState = ResetSelfState();
    for(key of inputSequence){
        res = KeyHandler({prev, key, SelfState});
        prev = res.register ?? prev;
        SelfState = res.state ?? state;
    };
    expect(prev.mantissa).toEqual(expected.mantissa);
    expect(prev.degree).toEqual(expected.degree);
});