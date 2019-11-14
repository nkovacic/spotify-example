class Random {
    static next(min = 0, max = 1) {
        return Math.random() * (max - min) + min;
    }

    static nextInteger(min = 0, max = 1) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static nextIntegerRange(min: number, max: number, numberOfItems: number) {
        let numbers: Array<number> = [];

        while (numbers.length < numberOfItems) {
            const randomNumber = Math.floor(Math.random() * max) + min;

            if (numbers.indexOf(randomNumber) > -1) {
                continue;
            }
            
            numbers.push(randomNumber);
        }

        return numbers;
    }
}

export default Random