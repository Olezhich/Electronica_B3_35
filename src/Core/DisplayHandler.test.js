import { DisplayString } from "./DisplayHandler.js";
import { ResetRegister } from "./Register.js"

test('Register to Display String', () => {
    let register = ResetRegister();
    //only the mantissa
    expect(DisplayString(register).trimEnd()).toBe(' 0.');
    register.mantissa = 27;
    expect(DisplayString(register).trimEnd()).toBe(' 27.');
    register.mantissa = -27;
    expect(DisplayString(register).trimEnd()).toBe('-27.');
    register.mantissa = 2.718;
    expect(DisplayString(register).trimEnd()).toBe(' 2.718');
    register.mantissa = -2.718;
    expect(DisplayString(register).trimEnd()).toBe('-2.718');
    //there are the int mantissa and the degree
    register.mantissa = 27;
    register.degree = 12;
    expect(DisplayString(register).trimEnd()).toBe(' 27.' + ' '.repeat(7) + '12');
    register.mantissa = -27;
    expect(DisplayString(register).trimEnd()).toBe('-27.' + ' '.repeat(7) + '12');
    register.mantissa = 27;
    register.degree = -12;
    expect(DisplayString(register).trimEnd()).toBe(' 27.' + ' '.repeat(6) + '-12');
    register.mantissa = -27;
    expect(DisplayString(register).trimEnd()).toBe('-27.' + ' '.repeat(6) + '-12');
    //there are the float mantissa and the degree
    register.mantissa = 2.718;
    register.degree = 12;
    expect(DisplayString(register).trimEnd()).toBe(' 2.718' + ' '.repeat(5) + '12');
    register.mantissa = -2.718;
    expect(DisplayString(register).trimEnd()).toBe('-2.718' + ' '.repeat(5) + '12');
    register.mantissa = 2.718;
    register.degree = -12;
    expect(DisplayString(register).trimEnd()).toBe(' 2.718' + ' '.repeat(4) + '-12');
    register.mantissa = -2.718;
    expect(DisplayString(register).trimEnd()).toBe('-2.718' + ' '.repeat(4) + '-12');
});