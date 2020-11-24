// id
// 传感器名称
// 报警对象
// 触发条件
// X值
// Y值
// 是否报警

const index = {
    baseDir: 'D:\\haopengit\\DeviceMonitor',
    dirName: 'WarnSetting', // 文件夹名称
    flowKey: 'warnSetting', // flowKey
    author: '刘洋',
    tableColumns: [
        // id
        {
            key: 'id',
            keyName: 'id',
            isInTable: false,
            isInForm: true,
            isInSearch: false,
            type: 'input',
        },
        // 传感器名称
        {
            key: 'sensorName',
            keyName: '传感器名称',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'input',
        },
        // 报警对象
        {
            key: 'warnObject',
            keyName: '报警对象',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'input',
        },
        // 触发条件
        {
            key: 'trigger',
            keyName: '触发条件',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'input',
        },
        // X值
        {
            key: 'xValue',
            keyName: 'X值',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'input',
        },
        // Y值
        {
            key: 'yValue',
            keyName: 'Y值',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'input',
        },
        // 是否报警
        {
            key: 'isWarned',
            keyName: '是否报警',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'input',
        },
         // 所属设备编号
         {
            key: 'ofDeviceCount',
            keyName: '所属设备编号',
            isInTable: false,
            isInForm: true,
            isInSearch: true,
            type: 'select',
        },
    ]
};
module.exports = index;