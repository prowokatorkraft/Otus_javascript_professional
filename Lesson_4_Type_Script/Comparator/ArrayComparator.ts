import { IComparator } from './IComparator';

type Type = Array<any>;

// Сравнение массивов
export class ArrayComparator implements IComparator<Type> {
    private context: IComparator<any>;
    constructor(context: IComparator<any>) {
        this.context = context;
    }

    canHandle(value: Type): boolean {
        return Array.isArray(value);
    }

    compare(a: Type, b: Type): boolean {
        if (this.canHandle(a) && this.canHandle(b) && a.length == b.length) {
            for (var i in a) {
                if (!this.context.compare(a[i], b[i])) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
}