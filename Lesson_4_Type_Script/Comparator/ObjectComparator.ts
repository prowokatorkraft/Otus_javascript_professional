import { IComparator } from './IComparator';

type Type = any;

// Сравнение объектов
export class ObjectComparator implements IComparator<Type> {
    private context: IComparator<any>;
    constructor(context: IComparator<any>) {
        this.context = context;
    }

    canHandle(value: Type): boolean {
        return value != null && typeof value === "object" && !Array.isArray(value);
    }

    compare(a: Type, b: Type): boolean {
        if (this.canHandle(a) && this.canHandle(b)) {
            const keysA = Object.keys(a);
            const keysB = Object.keys(b);

            if (keysA.length !== keysB.length) {
                return false;
            }

            for (var i in keysA) {
                if (!this.context.compare(a[keysA[i]], b[keysB[i]])) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
}