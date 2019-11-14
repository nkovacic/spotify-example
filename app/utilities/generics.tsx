export type AbstractConstructor<T> = Function & { prototype: T }

export interface IConstructor<T> {
    new (...args: any[]): T;
}