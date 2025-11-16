import { IComparator } from './IComparator';

type Type = (number | string | boolean | null | undefined);

// Сравнение примитивных типов
export class PrimitiveComparator implements IComparator<Type> {
    canHandle<Type>(value: Type): boolean {
        return value == null || typeof value !== "object";
    }

    compare<Type>(a: Type, b: Type): boolean {
        return a === b;
    }
}