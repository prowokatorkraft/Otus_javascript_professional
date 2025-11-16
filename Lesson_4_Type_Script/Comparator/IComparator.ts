// Интерфейс для сравнения
export interface IComparator<T> {
    // Проверка на возможность обработки
    canHandle(value: T): boolean;
    // Сравнение
    compare(a: T, b: T): boolean;
}