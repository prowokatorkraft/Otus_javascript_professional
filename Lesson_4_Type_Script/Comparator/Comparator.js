var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Comparator_instances, _Comparator_comparators, _Comparator_getHandle;
import { ArrayComparator } from './ArrayComparator.js';
import { PrimitiveComparator } from './PrimitiveComparator.js';
import { ObjectComparator } from './ObjectComparator.js';
export class Comparator {
    constructor() {
        _Comparator_instances.add(this);
        _Comparator_comparators.set(this, void 0);
        // � ������ �� 5 �������� solid (�������� ������������) ����������/����������� ������ ���������� ������,
        // � ������ ������ � ����� �� ���������� ��������� ����, � ��������������� ���������� ���.
        __classPrivateFieldSet(this, _Comparator_comparators, [
            new PrimitiveComparator(),
            new ObjectComparator(this),
            new ArrayComparator(this)
        ], "f");
    }
    canHandle(value) {
        return __classPrivateFieldGet(this, _Comparator_instances, "m", _Comparator_getHandle).call(this, value) != null;
    }
    compare(a, b) {
        let comparatorA = __classPrivateFieldGet(this, _Comparator_instances, "m", _Comparator_getHandle).call(this, a);
        let comparatorB = __classPrivateFieldGet(this, _Comparator_instances, "m", _Comparator_getHandle).call(this, b);
        if (comparatorA != null && comparatorB != null && typeof comparatorA == typeof comparatorA) {
            return comparatorA.compare(a, b);
        }
        return false;
    }
}
_Comparator_comparators = new WeakMap(), _Comparator_instances = new WeakSet(), _Comparator_getHandle = function _Comparator_getHandle(value) {
    return __classPrivateFieldGet(this, _Comparator_comparators, "f").find((comp) => comp.canHandle(value));
};
