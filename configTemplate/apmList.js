
const index = {
    baseDir: 'D:\haopengit\DeviceMonitor',
    dirName: 'ApmList', // 文件夹名称
    flowKey: 'apmList', // flowKey
    author: '刘洋',
    tableColumns: [
        // id
        {
            key: 'id',
            keyName: 'id',
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
        // 设备编号
        {
            key: 'deviceCode',
            keyName: '设备编号',
            isInTable: true,
            isInForm: true,
            isInSearch: true,
            type: 'input',
        },
        // 所属传感
        {
            key: 'ofSensor',
            keyName: '所属传感',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'select',
        },
        // 实时数据
        {
            key: 'imdata',
            keyName: '实时数据',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'input',
        },
        // 单位
        {
            key: 'unit',
            keyName: '单位',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'input',
        },
        // 更新时间
        {
            key: 'updateTime',
            keyName: '更新时间',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'input',
        },
    ]
};
module.exports = index;
