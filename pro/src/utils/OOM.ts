/**
 * 对象对象映射
 */

const typeHandler = {
    Infinity: function (val: any) {
        return val;
    },
    NaN: function (val: any) {
        return 0;
    },
    Undefined: function (val: any) {
        return undefined;
    },
    Null: function (val: any) {
        return val || undefined;
    },
    Number: function (val: any) {
        return val || 0;
    },
    String: function(val:any) {
        return val || undefined;
    }
}
enum Type {
    Infinity = 'Infinity',
    NaN = 'NaN',
    Undefined = 'Undefined',
    Null = 'Null',
    Number = 'Number',
    String = 'String',
}

function seekType(val: any) {
    const typeString = Object.prototype.toString.call(val);
    let type = Type.Undefined;
    switch (typeString) {
        case '[object String]':
            type = Type.String;
            break;
        case '[object Number]':
            type = Type.Number;
            break;
        case '[object Undefined]':
            type = Type.Undefined;
            break;
        default:
            type = Type.Undefined;
    }
    return type;
}

export const OOMTransfer = (item: any = {}, map: any) => {
    const result = {};
    if(item) {
    for (let x in map) {
        const key = map[x];
        const val = item[key];
        const type = seekType(val);
        result[x] = typeHandler[type](val);
    }
}
    return result;
}