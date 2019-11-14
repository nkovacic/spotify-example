import { IMainState } from '../reducers';

export class BaseSelector{
    protected state : IMainState;

    constructor (state : IMainState) {
        this.state = state;
    }
}
