// Абстрактный базовый класс для сравнения
class ComparatorAbstract {

    // Проверка на возможность обработки
    canHandle(value) {
        throw new Error("Метод canHandle должен быть переопределен");
    }

    // Сравнение
    compare(a, b) {
        throw new Error("Метод compare должен быть переопределен");
    }
}

module.exports = {
    ComparatorAbstract
};