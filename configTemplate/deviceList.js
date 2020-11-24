// id
// 设备编号
// 设备名称
// 所属分组
// 设备型号
// 通道数
// 设备温度
// 设备湿度
// 输出状态
// 设备状态
// 在线状态
// 操作

const index = {
    baseDir: 'D:\\haopengit\\DeviceMonitor',
    dirName: 'DeviceList', // 文件夹名称
    flowKey: 'deviceList', // flowKey
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
        // 设备编号
        {
            key: 'deviceCount',
            keyName: '设备编号',
            isInTable: true,
            isInForm: true,
            isInSearch: true,
            type: 'input',
        },
        // 设备名称
        {
            key: 'deviceName',
            keyName: '设备名称',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'input',
        },
        // 所属分组
        {
            key: 'ofGroup',
            keyName: '所属分组',
            isInTable: true,
            isInForm: true,
            isInSearch: true,
            type: 'select',
        },
        // 设备型号
        {
            key: 'deviceType',
            keyName: '设备型号',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'input',
        },
        // 通道数
        {
            key: 'channels',
            keyName: '通道数',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'input',
        },
        // 设备温度
        {
            key: 'deviceTemperature',
            keyName: '设备温度',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'input',
        },
        // 设备湿度
        {
            key: 'deviceWet',
            keyName: '设备湿度',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'input',
        },
        // 输出状态
        {
            key: 'outputStatus',
            keyName: '输出状态',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'select',
        },
        // 设备状态
        {
            key: 'deviceStatus',
            keyName: '设备状态',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'select',
        },
        // 在线状态
        {
            key: 'onlineStatus',
            keyName: '在线状态',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'select',
        },
    ]
};
module.exports = index;
