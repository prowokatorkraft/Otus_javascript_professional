const { ComparatorAbstract } = require('./ComparatorAbstract');

// Сравнение массивов
class ArrayComparator extends ComparatorAbstract {
    constructor(context) {
        super();
        this.context = context;
    }

    canHandle(value) {
        return Array.isArray(value);
    }

    compare(a, b) {
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

module.exports = {
    ArrayComparator
};