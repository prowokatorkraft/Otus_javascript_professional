import { IComparator } from './IComparator';
import { ArrayComparator } from './ArrayComparator.js';
import { PrimitiveComparator } from './PrimitiveComparator.js';
import { ObjectComparator } from './ObjectComparator.js';

type Type = any;

export class Comparator implements IComparator<Type> {
    #comparators: IComparator<Type>[];
    constructor() {
        // в идеале по 5 принципу solid (инверсия зависимостей) конкретика/зависимости должны спускаться сверху,
        // в данном случае я решил не захламлять начальный файл, а проинициировать конкретику тут.
        this.#comparators = [
            new PrimitiveComparator(),
            new ObjectComparator(this),
            new ArrayComparator(this)
        ];
    }

    #getHandle(value: Type): (IComparator<any> | undefined) {
        return this.#comparators.find((comp) => comp.canHandle(value));
    }

    canHandle(value: Type): boolean {
        return this.#getHandle(value) != null;
    }

    compare(a: Type, b: Type): boolean {
        let comparatorA = this.#getHandle(a);
        let comparatorB = this.#getHandle(b);

        if (comparatorA != null && comparatorB != null && typeof comparatorA == typeof comparatorA) {
            return comparatorA.compare(a, b);
        }
        return false;
    }
}