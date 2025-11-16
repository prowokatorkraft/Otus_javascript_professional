// ��������� ����������� �����
export class PrimitiveComparator {
    canHandle(value) {
        return value == null || typeof value !== "object";
    }
    compare(a, b) {
        return a === b;
    }
}
