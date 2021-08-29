import {isLoginValid } from './validation';

describe("login validations", () => {

    test('empty username with valid password', () => {

        const validation = isLoginValid('', 'password');
        expect(validation).toBeFalsy();
    });

    test('empty password with valid username', () => {
        const validation = isLoginValid('user@gmail.com', '');
        expect(validation).toBeFalsy();
    });

    test('invalid username with valid password', () => {
        const validation = isLoginValid('user', 'password');
        expect(validation).toBeFalsy();
    });

    test('valid username with valid password', () => {
        const validation = isLoginValid('user@gmail.com', 'Password123');
        expect(validation).toBeTruthy();
    });
});