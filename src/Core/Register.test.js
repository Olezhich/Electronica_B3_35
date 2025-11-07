import { IsOverflow, NormalizeRegister, ExtractSignificantDigits } from "./Register.js";

test.each([
    {input: 20.23456, expected: false},
    {input: -20.23456, expected: false},
    {input: 201.234567, expected: true},
    {input: -201.234567, expected: true}
])('IsOverflow($input) - test: $expected', ({input, expected}) => {
    expect(IsOverflow(input)).toBe(expected);
});


test.each([
    {input: 12345678, expected: {digits: 12345678, shift: 0}},
    {input: 1234567890, expected: {digits: 12345678, shift: 2}},
    {input: 0.1234567, expected: {digits: 1234567, shift: -7}},
    {input: 0.123456789, expected: {digits: 12345678, shift: -8}},
    {input: 0.000123456789, expected: {digits: 12345678, shift: -11}},
    {input: 0.0_000_001, expected: {digits: 1, shift: -7}},
])('ExtractSignificantDigits($input) - test: $expected', ({input, expected}) => {
    expect(ExtractSignificantDigits(input)).toEqual(expected);
})

// test.each([
//     {input: {mantissa: 12345678, degree: 0}, expected: {mantissa: 12345678, degree: 0}},
//     {input: {mantissa: 1234567800, degree: 0}, expected: {mantissa: 12345678, degree: 2}},
//     {input: {mantissa: 123456789, degree: 0}, expected: {mantissa: 12345678, degree: 1}},
//     {input: {mantissa: 0.1234567, degree: 0}, expected: {mantissa: 0.1234567, degree: 0}},
//     {input: {mantissa: 0.12345678, degree: 0}, expected: {mantissa: 1.2345678, degree: -1}},
//     {input: {mantissa: 0.1234567, degree: 0}, expected: {mantissa: 0.1234567, degree: 0}},
//     {input: {mantissa: 0.000012345, degree: 0}, expected: {mantissa: 1.2345, degree: -5}},
//     {input: {mantissa: 0.25, degree: 2}, expected: {mantissa: 25, degree: 0}},
//     {input: {mantissa: 25, degree: -2}, expected: {mantissa: 0.25, degree: 0}},
// ])('NormalizeRegister($input.mantissa, $input.degree) - test: $expected.mantissa, $expected.degree', ({input, expected}) => {
//     expect(NormalizeRegister(input)).toEqual(expected);
// })


// test('Normalize register', () => {
//     expect(normalizeMantissaAndExponent(5,-7)).toEqual({ mantissa: 0.0000005, exponent: 0 })
// })