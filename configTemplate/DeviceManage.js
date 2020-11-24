const index = {
    baseDir: 'D:\\haopengit\\DeviceMonitor',
    dirName: 'DeviceManage', // 文件夹名称
    flowKey: 'deviceManage', // flowKey
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
            key: 'groupCount',
            keyName: '分组编号',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'input',
        },
        {
            key: 'groupName',
            keyName: '分组名称',
            isInTable: true,
            isInForm: true,
            isInSearch: true,
            type: 'input',
        },
        {
            key: 'groupAddress',
            keyName: '分组地址',
            isInTable: true,
            isInForm: true,
            isInSearch: true,
            type: 'input',
        },
        {
            key: 'manageName',
            keyName: '负责人姓名',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'input',
        },
        {
            key: 'phone',
            keyName: '负责人手机',
            isInTable: true,
            isInForm: true,
            isInSearch: true,
            type: 'input',
        },
        {
            key: 'mark',
            keyName: '备注',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'input',
        },
        {
            key: 'createTime',
            keyName: '创建时间',
            isInTable: true,
            isInForm: false,
            isInSearch: false,
            type: 'date',
        },
    ]
};
module.exports = index;
