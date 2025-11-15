const { ComparatorAbstract } = require('./ComparatorAbstract');

// Сравнение примитивных типов
class PrimitiveComparator extends ComparatorAbstract {
    canHandle(value) {
        return value == null || typeof value !== "object";
    }

    compare(a, b) {
        return a === b;
    }
}

module.exports = {
    PrimitiveComparator
};