// id
// 一级菜单
// 二级菜单
// 操作人
// 操作内容
// 操作时间


const index = {
    baseDir: 'D:\\haopengit\\DeviceMonitor',
    dirName: 'LogList', // 文件夹名称
    flowKey: 'logList', // flowKey
    author: '刘洋',
    tableColumns: [
         // id
         {
            key: 'id',
            keyName: 'id',
            isInTable: true,
            isInForm: true,
            isInSearch: true,
            type: 'input',
        },
        // 一级菜单
        {
            key: 'first',
            keyName: '一级菜单',
            isInTable: true,
            isInForm: true,
            isInSearch: true,
            type: 'input',
        },
        // 二级菜单
        {
            key: 'second',
            keyName: '二级菜单',
            isInTable: true,
            isInForm: true,
            isInSearch: true,
            type: 'input',
        },
        // 操作人
        {
            key: 'operator',
            keyName: '操作人',
            isInTable: true,
            isInForm: true,
            isInSearch: true,
            type: 'input',
        },
        // 操作内容
        {
            key: 'content',
            keyName: '操作内容',
            isInTable: true,
            isInForm: true,
            isInSearch: true,
            type: 'input',
        },
        // 操作时间
        {
            key: 'operateTime',
            keyName: '操作时间',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'date',
        },
    ]
};
module.exports = index;
