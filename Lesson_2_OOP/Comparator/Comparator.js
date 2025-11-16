const { ComparatorAbstract } = require('./ComparatorAbstract');
const { ArrayComparator } = require('./ArrayComparator');
const { PrimitiveComparator } = require('./PrimitiveComparator');
const { ObjectComparator } = require('./ObjectComparator');

class Comparator extends ComparatorAbstract {
    #comparators = null;
    constructor()
    {
        super();
        // в идеале по 5 принципу solid (инверсия зависимостей) конкретика/зависимости должны спускаться сверху,
        // в данном случае я решил не захламлять начальный файл, а проинициировать конкретику тут.
        this.#comparators = [
            new PrimitiveComparator(),
            new ObjectComparator(this),
            new ArrayComparator(this)
        ];
        this.comparatorA = null;
        this.comparatorB = null;
    }

    #getHandle(value) {
        return this.#comparators.find((comp) => comp.canHandle(value));
    }

    canHandle(value) {
        return this.#getHandle(value) != null;
    }

    compare(a, b) {
        let comparatorA = this.#getHandle(a);
        let comparatorB = this.#getHandle(b);

        if (comparatorA != null && comparatorB != null && comparatorA.constructor.name == comparatorA.constructor.name) {
            return comparatorA.compare(a, b);
        }
        return false;
    }
}

module.exports = {
    ComparatorAbstract, ArrayComparator, PrimitiveComparator, ObjectComparator, Comparator
};