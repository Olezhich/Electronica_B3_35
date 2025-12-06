import { IsOverflow, CheckOverflow } from "./Overflow.js";


test.each([
    {input: '20.23456', expected: false},
    {input: '-20.23456', expected: false},
    {input: '201.234567', expected: true},
    {input: '-201.234567', expected: true}
])('IsOverflow($input) - test: $expected', ({input, expected}) => {
    expect(IsOverflow(input)).toBe(expected);
});



test.each([
    {input: {mantissa: 9.9999999, degree: 99}, expected: false},
    {input: {mantissa: 1, degree: -99}, expected: false},
    {input: {mantissa: 0.9, degree: -99}, expected: true},
    {input: {mantissa: 10, degree: 99}, expected: true},
])('CheckOverflow($input) - test: $expected', ({input, expected}) => {
    expect(CheckOverflow(input)).toBe(expected);
});

