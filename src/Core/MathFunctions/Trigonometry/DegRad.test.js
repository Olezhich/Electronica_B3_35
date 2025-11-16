import { DegreesToRadians } from "./DegRad";

test.each([
    {input: {mantissa: 180, degree: 0}, expected: {mantissa: Math.PI, degree: 0}},
])('DegreesToRadians($input) - test: $expected', ({input, expected}) => {
    expect(DegreesToRadians(input)).toEqual(expected);
});