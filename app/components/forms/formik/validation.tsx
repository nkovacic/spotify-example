import * as Yup from 'yup';

const minNumberOfDigitsErrorMessage = '${path} has to have atleast ${numberOfDigits} digit!';

Yup.setLocale({
    mixed: {
        required: '${path} is required!'
    },
    string: {
        email: 'Email address is not valid!',
        minNumberOfDigits: minNumberOfDigitsErrorMessage
    } as any
});

Yup.addMethod(Yup.string, 'minNumberOfDigits', function (numberOfDigits: number) {
    return this.test({  
        message: minNumberOfDigitsErrorMessage,
        name: 'minNumberOfDigits',
        params: {
            numberOfDigits
        },
        test: function (value: string) {
            if (value) {
                const regex = new RegExp(`^\\D*(?:\\d\\D*){${numberOfDigits},}$`);
    
                return regex.test(value);
            }
    
            return true;
        }
    });
});