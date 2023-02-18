export class ObjectHelper {
  public static equals(object1: any, object2: any) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) return false;
    for (const key of keys1) {
      const val1 = object1[key];
      const val2 = object2[key];
      const areObjects =
        ObjectHelper.isObject(val1) && ObjectHelper.isObject(val2);
      if (
        (areObjects && !ObjectHelper.equals(val1, val2)) ||
        (!areObjects && val1 !== val2)
      ) {
        return false;
      }
    }
    return true;
  }

  public static isObject(object: any) {
    return object != null && typeof object === 'object';
  }
}
