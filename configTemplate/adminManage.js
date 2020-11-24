const index = {
    baseDir: 'D:\\haopengit\\DeviceMonitor',
    dirName: 'AdminManage', // 文件夹名称
    flowKey: 'adminManage', // flowKey
    author: '刘洋',
    tableColumns: [
        // 序号 单位名称 类型 法人 联系人 联系电话
        {
            key: 'id',
            keyName: 'id',
            isInTable: false,
            isInForm: true,
            isInSearch: false,
            type: 'input',
        },
        {
            key: 'userName',
            keyName: '用户名',
            isInTable: true,
            isInForm: true,
            isInSearch: true,
            type: 'input',
        },
        {
            key: 'phone',
            keyName: '手机',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'input',
        },
        {
            key: 'accountType',
            keyName: '账号类型',
            isInTable: true,
            isInForm: false,
            isInSearch: false,
            type: 'select',
        },
        {
            key: 'ofGroup',
            keyName: '所属分组',
            isInTable: true,
            isInForm: false,
            isInSearch: true,
            type: 'select',
        },
        {
            key: 'endTime',
            keyName: '加入时间',
            isInTable: true,
            isInForm: false,
            isInSearch: false,
            type: 'date',
        },
        {
            key: 'accountStatus',
            keyName: '账号状态',
            isInTable: true,
            isInForm: false,
            isInSearch: false,
            type: 'select',
        },
        {
            key: 'initialPass',
            keyName: '初始密码',
            isInTable: false,
            isInForm: true,
            isInSearch: false,
            type: 'input',
        },
        {
            key: 'email',
            keyName: '邮箱',
            isInTable: false,
            isInForm: true,
            isInSearch: false,
            type: 'input',
        },
    ]
};
module.exports = index;
