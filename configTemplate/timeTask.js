// id
// 定时任务名称
// 任务对象
// 任务内容
// 上次执行时间
// 下次执行时间
// 状态
// 操作者


const index = {
    baseDir: 'D:\\haopengit\\DeviceMonitor',
    dirName: 'TimeTask', // 文件夹名称
    flowKey: 'timeTask', // flowKey
    author: '刘洋',
    tableColumns: [
        // id
        {
            key: 'id',
            keyName: 'ID',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'input',
        },
        // 定时任务名称
        {
            key: 'taskName',
            keyName: '定时任务名称',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'input',
        },
        // 任务对象
        {
            key: 'taskObject',
            keyName: '任务对象',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'input',
        },
        // 任务内容
        {
            key: 'content',
            keyName: '任务内容',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'input',
        },
        // 上次执行时间
        {
            key: 'lastTime',
            keyName: '上次执行时间',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'date',
        },
        // 下次执行时间
        {
            key: 'nextTime',
            keyName: '下次执行时间',
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
        // 操作者
        {
            key: 'operator',
            keyName: '操作者',
            isInTable: true,
            isInForm: true,
            isInSearch: true,
            type: 'input',
        },
    ]
};
module.exports = index;
