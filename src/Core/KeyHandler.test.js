import { KeyHandler } from "./KeyHandler.js";
import { ResetRegister } from "./Register.js";

test.each([
    {inputSequence: ['.', '6', '7', '1', '5', '4'], expected: {...ResetRegister(), mantissa: 0.67154}, 
        comment: "Example 1: Enter number 0.67154"},
    {inputSequence: ['6', '.', '2', '8', '3', '1', '/-/'], expected: {...ResetRegister(), mantissa: -6.2831}, 
        comment: "Example 2: Enter number -6.2831"},
    {inputSequence: ['1', '.', '3', '8', '/-/', 'vp', '1', '1', '/-/'], expected: {...ResetRegister(), mantissa: -1.38, degree: -11}, 
        comment: "Example 3: Enter number -0." + '0'.repeat(10)+'138 = -1.38 * 10 ^ -11'},
])("$comment", ({inputSequence, expected}) => {
    let prev = ResetRegister();
    for(key of inputSequence){
        prev = KeyHandler({prev, key}) ?? prev;
    };
    expect(prev.mantissa).toEqual(expected.mantissa);
    expect(prev.degree).toEqual(expected.degree);
});