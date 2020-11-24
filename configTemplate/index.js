const index = {
    baseDir: 'D:\ReactPortal',
    dirName: 'StockIn', // 文件夹名称
    flowKey: 'stockIn', // flowKey
    author: '刘洋',
    tableColumns: [
        // 序号 单位名称 类型 法人 联系人 联系电话
        {
            key: 'snumber',
            keyName: '单据编号',
            isInTable: true,
            isInForm: true,
            isInSearch: true,
            type: 'input',
        },
        {
            key: 'storehousename',
            keyName: '库点名称',
            isInTable: true,
            isInForm: true,
            isInSearch: true,
            type: 'input',
        },
        {
            key: 'planoperationtime',
            keyName: '入库预约时间',
            isInTable: true,
            isInForm: true,
            isInSearch: true,
            type: 'date',
        },
        {
            key: 'packingmeasurement',
            keyName: '预约包装数',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'input',
        },
        {
            key: 'cargomeasurerment',
            keyName: '预约货物数',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'input',
        },
        {
            key: 'grossweight',
            keyName: '毛重(kg)',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'input',
        },
        {
            key: 'netweight',
            keyName: '净重(kg)',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'input',
        },
        {
            key: 'cargovalue',
            keyName: '货值',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'input',
        },
        {
            key: 'remarks',
            keyName: '备注',
            isInTable: true,
            isInForm: true,
            isInSearch: false,
            type: 'input',
        },
    ]
};
module.exports = index;
