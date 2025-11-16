import { SinHandler } from "./SinLike";

test.each([
    {input: {prev: {mantissa: 30, degree: 0}, rad: false}, expected: {mantissa: 0.5, degree: 0}},
    {input: {prev: {mantissa: -30, degree: 0}, rad: false}, expected: {mantissa: -0.5, degree: 0}},
    {input: {prev: {mantissa: 90, degree: 0}, rad: false}, expected: {mantissa: 1, degree: 0}},
])('Sin($input) - test: $expected', ({input, expected}) => {
    expect(SinHandler(input)).toEqual(expected);
});