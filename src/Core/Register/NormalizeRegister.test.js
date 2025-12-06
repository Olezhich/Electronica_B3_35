import { ExtractSignificantDigits, CalculateMeanZeros, NormalizeRegister } from "./NormalizeRegister.js";

test.each([
    {input: 12345678, expected: {digits: 12345678, shift: 0}},
    {input: 1234567890, expected: {digits: 12345678, shift: 2}},
    {input: 0.1234567, expected: {digits: 1234567, shift: -7}},
    {input: 0.123456789, expected: {digits: 12345678, shift: -8}},
    {input: 0.000123456789, expected: {digits: 12345678, shift: -11}},
    {input: 0.0_000_001, expected: {digits: 1, shift: -7}},
    {input: 1.2345, expected: {digits: 12345, shift: -4}},
])('ExtractSignificantDigits($input) - test: $expected', ({input, expected}) => {
    expect(ExtractSignificantDigits(input)).toEqual(expected);
});

test.each([
    {input: 0.005, expected: 3},
    {input: 0.0000005, expected: 7},
    {input: -0.0000005, expected: 7},
    {input: 500, expected: 2},
    {input: 500.000, expected: 2},
])('CalculateMeanZeros($input) - test: $expected', ({input, expected}) => {
    expect(CalculateMeanZeros(input)).toEqual(expected);
})

test.each([
    {input: {mantissa: 123456, degree: -6}, expected: {mantissa: 0.123456, degree: 0}},
    {input: {mantissa: 12345678, degree: -4}, expected: {mantissa: 1234.5678, degree: 0}},
    {input: {mantissa: 5, degree: -8}, expected: {mantissa: 5, degree: -8}},
    {input: {mantissa: 254, degree: -8}, expected: {mantissa: 2.54, degree: -6}},
    {input: {mantissa: 123456, degree: 2}, expected: {mantissa: 12345600, degree: 0}},
    {input: {mantissa: 1234, degree: 8}, expected: {mantissa: 1.234, degree: 11}},

    {input: {mantissa: 12345678, degree: 0}, expected: {mantissa: 12345678, degree: 0}},
    {input: {mantissa: 1234567800, degree: 0}, expected: {mantissa: 1.2345678, degree: 9}},
    {input: {mantissa: 123456789, degree: 0}, expected: {mantissa: 1.2345678, degree: 8}},
    {input: {mantissa: 0.1234567, degree: 0}, expected: {mantissa: 0.1234567, degree: 0}},
    {input: {mantissa: 0.12345678, degree: 0}, expected: {mantissa: 1.2345678, degree: -1}},
    {input: {mantissa: 0.1234567, degree: 0}, expected: {mantissa: 0.1234567, degree: 0}},
    {input: {mantissa: 0.000012345, degree: 0}, expected: {mantissa: 1.2344999, degree: -5}},
    {input: {mantissa: 0.25, degree: 2}, expected: {mantissa: 25, degree: 0}},
    {input: {mantissa: 25, degree: -2}, expected: {mantissa: 0.25, degree: 0}},
    {input: {mantissa: -538676560, degree: -10}, expected: {mantissa: -5.3867656, degree: -2}}
    
])('NormalizeRegister($input.mantissa, $input.degree) - test: $expected.mantissa, $expected.degree', ({input, expected}) => {
    expect(NormalizeRegister(input)).toEqual(expected);
});