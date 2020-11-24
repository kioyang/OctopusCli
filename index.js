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
    baseDir: 'D:\\haopengit1\\DeviceMonitor',
    dirName: 'ApmDetail', // 文件夹名称
    flowKey: 'apmDetail', // flowKey
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
        // 线号
        {
            key: 'lineCode',
            keyName: '线号',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'input',
        },
        // 电压
        {
            key: 'dy',
            keyName: '电压',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'input',
        },
        // 电流 
        {
            key: 'dl',
            keyName: '电流',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'input',
        },
        // 开关 
        {
            key: 'switcher',
            keyName: '开关',
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
