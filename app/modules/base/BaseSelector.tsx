import { IMainState } from '../state';

export abstract class BaseSelector{
    protected state : IMainState;

    constructor (state : IMainState) {
        this.state = state;
    }
}
