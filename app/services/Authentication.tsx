

class Authentication {
    login(email: string, password: string) {
        
    }

    isLoggedIn() {
        return false;
    }

    static register(phoneNumber: string): Promise<boolean>;
    static register(email: string, password: string): Promise<boolean>;
    static register(emailOrPhoneNumber: string, password?: string) {
        return new Promise(resolve => {
            resolve(true);
        });
    }
}

export default Authentication