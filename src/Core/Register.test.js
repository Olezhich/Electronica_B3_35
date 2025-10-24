import { IsOverflow } from "./Register.js";

test.each([
    {input: 20.23456, expected: false},
    {input: -20.23456, expected: false},
    {input: 201.234567, expected: true},
    {input: -201.234567, expected: true}
])('IsOverflow($input) - test: $expected', ({input, expected}) => {
    expect(IsOverflow(input)).toBe(expected);
});
