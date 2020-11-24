// 报警记录管理
// id
// 设备编号
// 报警对象
// 所属分组
// 设备型号
// 报警内容
// 报警时间
// 处理人
// 处理时间
// 状态


const index = {
    baseDir: 'D:\haopengit\DeviceMonitor',
    dirName: 'WarnRecords', // 文件夹名称
    flowKey: 'warnRecords', // flowKey
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
        // 设备编号
        {
            key: 'deviceCode',
            keyName: '设备编号',
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
        // 所属分组
        {
            key: 'ofGroup',
            keyName: '所属分组',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'input',
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
        // 报警内容
        {
            key: 'warnContent',
            keyName: '报警内容',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'input',
        },
        // 报警时间
        {
            key: 'warnTime',
            keyName: '报警时间',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'input',
        },
        // 处理人
        {
            key: 'operator',
            keyName: '处理人',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'input',
        },
        // 处理时间
        {
            key: 'operateTime',
            keyName: '处理时间',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'date',
        },
        // 状态
        {
            key: 'status',
            keyName: '状态',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'select',
        },

          // 所属设备
          {
            key: 'ofDevice',
            keyName: '所属设备',
            isInTable: false,
            isInForm: true,
            isInSearch: true,
            type: 'select',
        },
          // 所属传感器
          {
            key: 'ofSensor',
            keyName: '所属传感器',
            isInTable: false,
            isInForm: true,
            isInSearch: true,
            type: 'select',
        },
    ]
};
module.exports = index;
