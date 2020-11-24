const index = {
    baseDir: 'D:\\haopengit\\DeviceMonitor',
    dirName: 'PortManage', // 文件夹名称
    flowKey: 'portManage', // flowKey
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
            key: 'deviceCount',
            keyName: '设备编号',
            isInTable: true,
            isInForm: true,
            isInSearch: true,
            type: 'input',
        },
        {
            key: 'deviceGroupCount',
            keyName: '设备分组编号',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'input',
        },
        {
            key: 'portNum',
            keyName: '端口数',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'input',
        },

    ]
};
module.exports = index;
