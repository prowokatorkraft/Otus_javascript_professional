// ��������� ��������
export class ObjectComparator {
    constructor(context) {
        this.context = context;
    }
    canHandle(value) {
        return value != null && typeof value === "object" && !Array.isArray(value);
    }
    compare(a, b) {
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
