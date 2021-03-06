import j from 'jscodeshift';
import moment from 'moment';
import { basename, dirname, join } from 'path';
import { statSync, readFileSync, existsSync } from 'fs';
import { getTemplate, getTemplateMustache, assert, writeFile, readFile, info, error, success } from './utils';
import { eslint } from './install';
const company = 'haopengit.com';
import Mustache from 'mustache';

class Generate {
    /**
     *  输出成功
     */
    printSuccess = (info) => {
        const { path, projectName, routerName } = info;
        success(`
            运行成功! 已在${path}/page目录创建 ${projectName}页面.
            
            路由信息: /${routerName}
            输入路由,F5刷新页面即可预览效果,若无mock数据,请检查mock代理配置,重启即可
            正在对生成的文件进行eslint校验...`
        );
    };
    generate = (program, { cwd, module }) => {
        try {
            const configPath = program.configPath;
            if (!configPath) {
                success('默认使用当前路径的index.js文件,指定配置文件路径用-c');
            }
            const config1 = require(configPath || `${cwd}/index.js`);

            const config = module;
            config.cwd = cwd;
            config.baseDir = module.baseDir;
            console.log(module);
            this.mockTpl(config);
            this.generateModel(config);
            this.generateApiConfig(config);
            this.generateUmiService(config);
            this.generateEditorView(config);
            this.genreateField(config);
            this.generateTableIndexView(config);
            this.generateSearchView(config);
            this.generateTableView(config);
            this.generatein(config);
            const { dirName, flowKey, author, baseDir } = config;
            const date = moment().format('YYYY-MM-DD HH:mm');
            const copies = ['Table.less', 'TableListView.less', 'SearchView.less'];
            copies.forEach((item) => {
                this.createFile({
                    ...config,
                    dirName,
                    flowKey,
                    author,
                    date,
                    company: company,
                    sourcePath: baseDir,
                    filePath: `/src/pages/${dirName}/Table/${item}`,
                    templatePath: `/umi/UIViews/Table/${item}`,
                });
            });
            this.generateDetail(config);
            this.generateEdit(config);

            // this.createRouter(payload);
            // this.createMenu(config);
            console.log('生成文件成功');
            const info = {
                path: baseDir,
                projectName: dirName,
                routerName: flowKey,
            };
            this.printSuccess(info);
        } catch (e) {
            error(e.stack);
        }
    };

    generateEditModel = (config) => {
        const { dirName, flowKey, author = 'kio', baseDir } = config;
        let initData = { page: 1, pageSize: 10 };
        const date = moment().format('YYYY-MM-DD HH:mm');
        this.createFile({
            ...config,
            dirName,
            flowKey: `${flowKey}Edit`,
            author,
            initData: this.decode(JSON.stringify(initData)),
            date,
            company: company,
            sourcePath: baseDir,
            filePath: `/src/pages/${dirName}Edit/models/${flowKey}Edit.js`,
            templatePath: '/umi/models/edit',
        });
    }

    /**
     * 增加选项
     * @param {*} config 
     */
    mockTplEdit = (config) => {
        const item = {};
        const { tableColumns, flowKey, dirName, baseDir } = config;
        const appendItems = [];
        const listItems = tableColumns && tableColumns.map((option) => {
            const field = option.key;
            const type = option.type;
            if(field) {
            if (field.includes('status') || field.includes('Status')) {
                return { key: type, create: '[0,1]', prop: `[\`\${Field.${field}}|+1\`]` }
            }
            if (field.includes('time') || field.includes('Time') || field.includes('date') || field.includes('Date')) {
                return { key: type, create: '@date', prop: `[\`\${Field.${field}}\`]` };

            }
            if (field.includes('Num') || field.includes('Price') || field.includes('num') || field.includes('id') || field.includes('Id') || field.includes('number') || field.includes('code') || field.includes('Code') || field.includes('Number') || field.includes('Amount')) {
                return { key: type, create: 1, prop: `[\`\${Field.${field}|+1}\`]` }
            }
        }
        if(!field) {
            return { key: type, create: '@cname', prop: `dddd` }
        }
            return { key: type, create: '@cname', prop: `[\`\${Field.${field}}\`]` }
        });
        this.createFile({
            ...config,
            dirName,
            flowKey: `${flowKey}Edit`,
            sourcePath: baseDir,
            filePath: `/mock/${flowKey}Edit.mock.js`,
            templatePath: 'umi/mocktpl',
            listItems,
        });
    }

    generateApiConfigEdit = (config) => {
        const { dirName, flowKey, author, baseDir } = config;
        const { apiUrl = `${flowKey}Edit/list`,deleteUrl = `${flowKey}Edit/list`,detailUrl,editUrl } = config;
        const date = moment().format('YYYY-MM-DD HH:mm');
        this.createFile({
            ...config,
            dirName,
            flowKey: `${flowKey}Edit`,
            author,
            date,
            apiUrl: apiUrl,
            deleteUrl,
            detailUrl,
            editUrl,
            company: company,
            sourcePath: baseDir,
            filePath: `/src/services/${dirName}Edit/apiConfig.js`,
            templatePath: '/umi/Service/edit/apiConfig',
        });
    }

    generateUmiServiceEdit = (config) => {
        const { dirName, flowKey, author, baseDir,detailUrl,editUrl } = config;
        let initData = { page: 1, pageSize: 10 };
        const date = moment().format('YYYY-MM-DD HH:mm');
        this.createFile({
            ...config,
            dirName,
            flowKey: `${flowKey}Edit`,
            author,
            detailUrl,editUrl,
            initData: this.decode(JSON.stringify(initData)),
            date,
            sourcePath: baseDir,
            company: company,
            filePath: `/src/services/${dirName}Edit/index.js`,
            templatePath: '/umi/Service/edit/index',
        });
    }

    genreateFieldEdit = (config) => {
        const { tableColumns, dirName, baseDir } = config;
        this.createFile({
            ...config,
            dirName,
            sourcePath: baseDir,
            company: company,
            templatePath: 'umi/UIViews/edit/Table/Field',
            filePath: `/src/pages/${dirName}Edit/Table/Field.js`,
            tableColumns,
        });
    }
    generateTableIndexViewEdit = (config) => {
        const { dirName, author = 'kio', baseDir,flowKey,detailUrl,editUrl } = config;
        const date = moment().format('YYYY-MM-DD HH:mm');
        this.createFile({
            ...config,
            dirName,
            author,
            date,
            editUrl,
            detailUrl,
            flowKey: `${flowKey}Edit`,
            company: company,
            templatePath: 'umi/UIViews/edit/Table/index',
            sourcePath: baseDir,
            filePath: `/src/pages/${dirName}Edit/Table/index.js`,
        })
    }
    generateSearchViewEdit = (config) => {
        const { author = 'kio', dirName, baseDir, tableColumns, flowKey } = config;
        const date = moment().format('YYYY-MM-DD HH:mm');
        const searchItems = [];
        const responsiveField = [];
        tableColumns && tableColumns.forEach((item) => {
            if (item.isInSearch) {
                searchItems.push(item);
                responsiveField.push({name: item.keyName,offset:0,field: item.key});
            }
        });
        this.createFile({
            ...config,
            dirName,
            author,
            date,
            flowKey: `${flowKey}Edit`,
            company: company,
            responsiveField,
            typeFunc: function () {
                var type = this.type || 'input';
                var keyName = this.keyName;
                var result = '<Input />';
                switch (type) {
                    case 'input':
                        result = '<Input />';
                        break;
                    case 'datetime':
                        result = '<DatePicker style={{width: "100%"}} />';
                        break;
                    case 'select':
                        result = '<Select />';
                        break;
                    default:
                        result = '<Date />';
                }
                if(keyName.includes('单据状态')) {
                    result = '<BillstatusSelect />';
                }
                return result;
            },
            templatePath: 'umi/UIViews/edit/Table/SearchView',
            sourcePath: baseDir,
            filePath: `/src/pages/${dirName}Edit/Table/SearchView.js`,
            searchItems,
        });
    }
    generateTableViewEdit = (config) => {
        const { flowKey, tableColumns, author, dirName, baseDir } = config;
        const tableItems = [];
        tableColumns.forEach((item) => {
            if (item.isInTable) {
                tableItems.push(item);
            }
        })
        const date = moment().format('YYYY-MM-DD HH:mm');
        this.createFile({
            ...config,
            dirName,
            author,
            flowKey: `${flowKey}Edit`,
            url: flowKey,
            date,
            widthFunc: function () {
                const item = this;
                let minWidth = +item.keyName.length * 30 || 40;
                if (item.keyName.includes('日期') || item.keyName.includes('时间') || item.keyName.length < 3) {
                    if (minWidth < 80) {
                        minWidth = 120;
                    }
                }
                if (item.keyName.includes('单据编号')) {
                    minWidth = 180;
                }
                if(item.keyName.includes('备注')) {
                    minWidth = 200;
                }
                if(item.keyName.includes('配送')) {
                    minWidth = 200;
                }
                if(item.keyName.includes('名称')) {
                    minWidth = 250;
                }
                if (item.keyName.includes('单') && item.keyName.includes('号')) {
                    minWidth = 180;
                }
                if (item.keyName.includes('日')) {
                    minWidth = 120;
                }
                if (item.keyName.includes('时间')) {
                    minWidth = 180;
                }
                return minWidth;
            },
            fixFunc: function (index = 0) {
                // console.log()
                const item = this;
                let shouldFix = false;
                let countCol = tableColumns.length;
                if (tableColumns.length > 12) {
                    shouldFix = true;
                    countCol = countCol - 12;
                }
                let fixString = '';
                // if (shouldFix && index < countCol - 1) {
                //     fixString = 'fixed:\'left\',';
                // }
                return fixString;
            },
            renderFunc: function () {
                const item = this;
                if (item.keyName.includes('单据状态')) {
                    return '<BillStatus status={value} />';
                }
                if (item.keyName.includes('单据编号')) {
                    return `<Ellipsis title={transformZero(value)}>
                    <span style={{ fontWeight:'bold'}}>{transformZero(value)}</span>
                  </Ellipsis>`
                }

                if (item.keyName.includes('单') && item.keyName.includes('号')) {
                    return `<Ellipsis title={transformZero(value)}>
                    <span style={{ fontWeight:'bold'}}>{transformZero(value)}</span>
                  </Ellipsis>`
                }
                return `<Ellipsis title={transformZero(value)}>
                {transformZero(value)}
              </Ellipsis>`
            },
            company: company,
            templatePath: 'umi/UIViews/edit/Table/TableListView',
            sourcePath: baseDir,
            filePath: `/src/pages/${dirName}Edit/Table/TableListView.js`,
            tableItems,
        });
    }

    generateindetail = (config) => {
        const { dirName, flowKey, author, baseDir } = config;
        const date = moment().format('YYYY-MM-DD HH:mm');
        this.createFile({
            ...config,
            dirName,
            flowKey,
            author,
            date,
            company: company,
            sourcePath: baseDir,
            filePath: `/src/pages/${dirName}Detail/index.js`,
            templatePath: '/umi/UIViews/detail/index',
        });
    }

    generateinedit = (config) => {
        const { dirName, flowKey, author = 'kio', baseDir } = config;
        console.log(flowKey,'flowKey')
        const date = moment().format('YYYY-MM-DD HH:mm');
        this.createFile({
            ...config,
            dirName,
            flowKey: `${flowKey}Edit`,
            author,
            date,
            company: company,
            sourcePath: baseDir,
            filePath: `/src/pages/${dirName}Edit/index.js`,
            templatePath: '/umi/UIViews/edit/index',
        });
    }

    generateEdit = (res) => {
        const { dirName, flowKey, author, baseDir,editColumns = [],apiUrl,editUrl,detailUrl, parentRoute,detailColumns = []} = res;
        const config = { dirName, flowKey, author, baseDir,tableColumns: editColumns,apiUrl,detailUrl,editUrl,parentRoute,detailColumns};
        this.generateEditModel(config);
        this.mockTplEdit(config);
        this.generateApiConfigEdit(config);
        this.generateUmiServiceEdit(config);
        this.genreateFieldEdit(config);
        this.generateTableIndexViewEdit(config);
        this.generateSearchViewEdit(config);
        this.generateTableViewEdit(config);
        this.generateinedit(config);
        const date = moment().format('YYYY-MM-DD HH:mm');
        const copies = [ 'TableListView.less', 'SearchView.less','OOMap'];
        copies.forEach((item) => {
            this.createFile({
                ...config,
                dirName,
                flowKey,
                author,
                date,
                company: company,
                sourcePath: baseDir,
                filePath: `/src/pages/${dirName}Edit/Table/${item}`,
                templatePath: `/umi/UIViews/edit/Table/${item}`,
            });
        });
        const formColumns = [];
        const tColumns = [];
        const tableColumns = editColumns;
        for(let i = 0; i < tableColumns.length; i++) {
            const item = tableColumns[i];
            if(item.isInSearch) {
                formColumns.push(item);
            }
            if(item.isInTable) {
                tColumns.push(item)
            }
        }
        const copie = ['ExpirationTimeField.js','index.js', 'index.less','ProductionTimeField.js','RemoteSelect.less','ScodeRemoteSelect.js','SnameRemoteSelect.js'];
        copie.forEach((item) => {
            this.createFile({
                ...config,
                dirName,
                flowKey,
                author,
                date,
                tableColumns: tColumns,
                formColumns,
                company: company,
                sourcePath: baseDir,
                filePath: `/src/pages/${dirName}Edit/Editables/${item}`,
                templatePath: `/umi/UIViews/edit/Editables/${item}`,
            });
        });
    }

    generateDetail = (res) => {
        const { dirName, flowKey, author, baseDir,detailColumns = [],detailUrl,editUrl,apiUrl,parentRoute } = res;
        const config = { dirName, flowKey, author, baseDir,tableColumns: detailColumns,apiUrl,detailUrl,editUrl,parentRoute};
        const date = moment().format('YYYY-MM-DD HH:mm');
        this.generateDetailModel(config);
        this.mockTplDetail(config);
        this.generateApiConfigDetail(config);
        this.generateUmiServiceDetail(config);
        this.genreateFieldDetail(config);
        this.generateTableIndexViewDetail(config);
        this.generateSearchViewDetail(config);
        this.generateTableViewDetail(config);
        this.generateindetail(config);
        const copies = ['TableListView.less', 'SearchView.less','OOMap.js'];
        const formColumns = [];
        const tColumns = [];
        const tableColumns = detailColumns;
        for(let i = 0; i < tableColumns.length; i++) {
            const item = tableColumns[i];
            if(item.isInSearch) {
                formColumns.push(item);
            }
            if(item.isInTable) {
                tColumns.push(item)
            }
        }
        copies.forEach((item) => {
            this.createFile({
                ...config,
                dirName,
                flowKey,
                author,
                date,
                tableColumns: tColumns,
                formColumns,
                company: company,
                sourcePath: baseDir,
                filePath: `/src/pages/${dirName}Detail/Table/${item}`,
                templatePath: `/umi/UIViews/detail/Table/${item}`,
            });
        });
    }

    generateDetailModel = (config) => {
        const { dirName, flowKey, author = 'kio', baseDir,parentRoute } = config;
        let initData = { page: 1, pageSize: 10 };
        const date = moment().format('YYYY-MM-DD HH:mm');
        this.createFile({
            ...config,
            dirName,
            flowKey,
            author,
            initData: this.decode(JSON.stringify(initData)),
            date,
            company: company,
            sourcePath: baseDir,
            filePath: `/src/pages/${dirName}Detail/models/${flowKey}Detail.js`,
            templatePath: '/umi/models/detail',
        });
    }

    /**
     * 增加选项
     * @param {*} config 
     */
    mockTplDetail = (config) => {
        const item = {};
        const { tableColumns, flowKey, dirName, baseDir } = config;
        const appendItems = [];
        const listItems = tableColumns && tableColumns.map((option) => {
            const field = option.key;
            const type = option.type;
            if(field) {
            if (field.includes('status') || field.includes('Status')) {
                return { key: type, create: '[0,1]', prop: `[\`\${Field.${field}}|+1\`]` }
            }
            if (field.includes('time') || field.includes('Time') || field.includes('date') || field.includes('Date')) {
                return { key: type, create: '@date', prop: `[\`\${Field.${field}}\`]` };

            }
            if (field.includes('Num') || field.includes('Price') || field.includes('num') || field.includes('id') || field.includes('Id') || field.includes('number') || field.includes('code') || field.includes('Code') || field.includes('Number') || field.includes('Amount')) {
                return { key: type, create: 1, prop: `[\`\${Field.${field}|+1}\`]` }
            }
        }
        if(!field) {
            return { key: type, create: '@cname', prop: `dddd` }
        }
            return { key: type, create: '@cname', prop: `[\`\${Field.${field}}\`]` }
        });
        this.createFile({
            ...config,
            dirName: `${dirName}`,
            flowKey: `${flowKey}Detail`,
            sourcePath: baseDir,
            filePath: `/mock/${flowKey}Detail.mock.js`,
            templatePath: 'umi/mocktpl',
            listItems,
        });
    }

    generateApiConfigDetail = (config) => {
        const { dirName, flowKey, author, baseDir } = config;
        const { apiUrl = `${flowKey}Detail/list`,deleteUrl = `${flowKey}Detail/list`,detailUrl } = config;
        const date = moment().format('YYYY-MM-DD HH:mm');
        this.createFile({
            ...config,
            dirName,
            flowKey,
            author,
            date,
            apiUrl: apiUrl,
            deleteUrl,
            detailUrl,
            company: company,
            sourcePath: baseDir,
            filePath: `/src/services/${dirName}Detail/apiConfig.js`,
            templatePath: '/umi/Service/detail/apiConfig',
        });
    }

    generateUmiServiceDetail = (config) => {
        const { dirName, flowKey, author, baseDir } = config;
        let initData = { page: 1, pageSize: 10 };
        const date = moment().format('YYYY-MM-DD HH:mm');
        this.createFile({
            ...config,
            dirName,
            flowKey,
            author,
            initData: this.decode(JSON.stringify(initData)),
            date,
            sourcePath: baseDir,
            company: company,
            filePath: `/src/services/${dirName}Detail/index.js`,
            templatePath: '/umi/Service/detail/index',
        });
    }

    genreateFieldDetail = (config) => {
        const { tableColumns, dirName, baseDir } = config;
        this.createFile({
            ...config,
            dirName,
            sourcePath: baseDir,
            company: company,
            templatePath: 'umi/UIViews/detail/Table/Field',
            filePath: `/src/pages/${dirName}Detail/Table/Field.js`,
            tableColumns,
        });
    }
    generateTableIndexViewDetail = (config) => {
        const { dirName, author, baseDir } = config;
        const date = moment().format('YYYY-MM-DD HH:mm');
        this.createFile({
            ...config,
            dirName,
            author,
            date,
            company: company,
            templatePath: 'umi/UIViews/detail/Table/index',
            sourcePath: baseDir,
            filePath: `/src/pages/${dirName}Detail/Table/index.js`,
        })
    }
    generateSearchViewDetail = (config) => {
        const { author, dirName, baseDir, tableColumns, flowKey,detailUrl,editUrl } = config;
        const date = moment().format('YYYY-MM-DD HH:mm');
        const searchItems = [];
        const responsiveField = [];
        tableColumns && tableColumns.forEach((item) => {
            if (item.isInSearch) {
                searchItems.push(item);
                responsiveField.push({name: item.keyName,offset:0,field: item.key});
            }
        });
        this.createFile({
            ...config,
            dirName,
            author,
            date,
            flowKey,
            detailUrl,
            editUrl,
            company: company,
            responsiveField,
            typeFunc: function () {
                var type = this.type || 'input';
                var keyName = this.keyName;
                var result = '<Input disabled />';
                switch (type) {
                    case 'input':
                        result = '<Input disabled />';
                        break;
                    case 'datetime':
                        result = '<TimeField disabled />';
                        break;
                    case 'select':
                        result = '<Select disabled />';
                        break;
                    default:
                        result = '<Date disabled/>';
                }
                if(keyName.includes('单据状态')) {
                    result = '<BillstatusSelect />';
                }
                return '<Input disabled />';
            },
            templatePath: 'umi/UIViews/detail/Table/SearchView',
            sourcePath: baseDir,
            filePath: `/src/pages/${dirName}Detail/Table/SearchView.js`,
            searchItems,
        });
    }
    generateTableViewDetail = (config) => {
        const { flowKey, tableColumns, author, dirName, baseDir } = config;
        const tableItems = [];
        tableColumns.forEach((item) => {
            if (item.isInTable) {
                tableItems.push(item);
            }
        })
        const date = moment().format('YYYY-MM-DD HH:mm');
        this.createFile({
            ...config,
            dirName,
            author,
            flowKey,
            date,
            widthFunc: function () {
                const item = this;
                let minWidth = +item.keyName.length * 30 || 40;
                if (item.keyName.includes('日期') || item.keyName.includes('时间') || item.keyName.length < 3) {
                    if (minWidth < 80) {
                        minWidth = 120;
                    }
                }
                if (item.keyName.includes('单据编号')) {
                    minWidth = 180;
                }
                if(item.keyName.includes('备注')) {
                    minWidth = 200;
                }
                if(item.keyName.includes('名称')) {
                    minWidth = 250;
                }
                if(item.keyName.includes('配送')) {
                    minWidth = 200;
                }
                if (item.keyName.includes('单') && item.keyName.includes('号')) {
                    minWidth = 180;
                }
                if (item.keyName.includes('日')) {
                    minWidth = 120;
                }
                if (item.keyName.includes('时间')) {
                    minWidth = 180;
                }
                return minWidth;
            },
            fixFunc: function (index = 0) {
                // console.log()
                const item = this;
                let shouldFix = false;
                let countCol = tableColumns.length;
                if (tableColumns.length > 12) {
                    shouldFix = true;
                    countCol = countCol - 12;
                }
                let fixString = '';
                // if (shouldFix && index < countCol - 1) {
                //     fixString = 'fixed:\'left\',';
                // }
                return fixString;
            },
            renderFunc: function () {
                const item = this;
                if (item.keyName.includes('单据状态')) {
                    return '<BillStatus status={value} />';
                }
                if (item.keyName.includes('单据编号')) {
                    return `<Ellipsis title={transformZero(value)}>
                    <span style={{ fontWeight:'bold'}}>{transformZero(value)}</span>
                  </Ellipsis>`
                }
                if (item.keyName.includes('单') && item.keyName.includes('号')) {
                    return `<Ellipsis title={transformZero(value)}>
                    <span style={{ fontWeight:'bold'}}>{transformZero(value)}</span>
                  </Ellipsis>`
                }
                return `<Ellipsis title={transformZero(value)}>
                {transformZero(value)}
              </Ellipsis>`
            },
            company: company,
            templatePath: 'umi/UIViews/detail/Table/TableListView',
            sourcePath: baseDir,
            filePath: `/src/pages/${dirName}Detail/Table/TableListView.js`,
            tableItems,
        });
    }

    generateModel = (config) => {
        const { dirName, flowKey, author, baseDir } = config;
        let initData = { page: 1, pageSize: 10 };
        const date = moment().format('YYYY-MM-DD HH:mm');
        this.createFile({
            ...config,
            dirName,
            flowKey,
            author,
            initData: this.decode(JSON.stringify(initData)),
            date,
            company: company,
            sourcePath: baseDir,
            filePath: `/src/pages/${dirName}/models/${flowKey}.js`,
            templatePath: '/umi/models/model',
        });
    }
    generateApiConfig = (config) => {
        const { dirName, flowKey, author, baseDir } = config;
        const { apiUrl = `${flowKey}/list`,deleteUrl = `${flowKey}/list` } = config;
        const date = moment().format('YYYY-MM-DD HH:mm');
        this.createFile({
            ...config,
            dirName,
            flowKey,
            author,
            date,
            apiUrl: apiUrl,
            deleteUrl,
            company: company,
            sourcePath: baseDir,
            filePath: `/src/services/${dirName}/apiConfig.js`,
            templatePath: '/umi/Service/apiConfig',
        });
    }
    generateUmiService = (config) => {
        const { dirName, flowKey, author, baseDir } = config;
        let initData = { page: 1, pageSize: 10 };
        const date = moment().format('YYYY-MM-DD HH:mm');
        this.createFile({
            ...config,
            dirName,
            flowKey,
            author,
            initData: this.decode(JSON.stringify(initData)),
            date,
            sourcePath: baseDir,
            company: company,
            filePath: `/src/services/${dirName}/index.js`,
            templatePath: '/umi/Service/index',
        });
    }
    generateUmiFormConfig = (config) => {
        const { author, dirName, baseDir } = config;
        const date = moment().format('YYYY-MM-DD HH:mm');
        const { tableColumns } = config;
        const fields = [];
        tableColumns && tableColumns.map((item) => {
            if (item.isInForm) {
                const field = {
                    name: `&apos;${item.keyName}&apos;`,
                    label: `Field.${item.key}Name`,
                    field: `Field.${item.key}`,
                    viewProps: {
                        placeholder: `&apos;请输入${item.keyName}&apos;`,
                    },
                    type: `&apos;${item.type}&apos;`,
                    responsive: 'responsiveTwo',
                    formItemLayout: 'formItemLayoutTwo',
                };
                if (item.type === 'select') {
                    item.options = [{
                        key: 1, value: '选项1'
                    }, {
                        key: 2, value: '选项2'
                    }]
                }
                fields.push(field);
            }
        });
        this.createFile({
            ...config,
            dirName,
            date,
            author,
            fields: this.decode(JSON.stringify(fields)),
            sourcePath: baseDir,
            company: company,
            templatePath: 'umi/UIViews/Table/FormConfig/formConfig',
            filePath: `/src/pages/${dirName}/Table/FormConfig/formConfig.js`,
        });
    }
    generateUmiSearchFormConfig = (config) => {
        const { author, dirName, baseDir } = config;
        const date = moment().format('YYYY-MM-DD HH:mm');
        const { tableColumns } = config;
        let fields = '[';
        tableColumns && tableColumns.map((item) => {
            if (item.isInSearch) {
                const minWidth = +item.keyName.length * 30 || 40;
                const field = `{
                // ${item.keyName}
                field: Field.${item.key},
                label: Field.${item.key}Name,
                type: &apos;${item.type}&apos;,
                 viewProps: {
                    placeholder: &apos;${item.keyName}&apos;,
                     style: { width: ${minWidth} },
                },
                formItemLayout,
                responsive,
            }, `;
                if (item.type === 'select') {
                    item.options = [{
                        key: 1, value: '选项1'
                    }, {
                        key: 2, value: '选项2'
                    }]
                }
                fields += field;
            }
        });
        const search = `{
                        field: 'search',
                        valid: {},
                        type: 'custom',
                        viewProps: {
                        },
                        formItemLayout: formItemLayoutButton,
                        view: (
                        &lt;div&gt;
                         &lt;Button
                                style={{ margin: '0 8px 0' }}
                                icon=&quot;search&quot;
                                type=&quot;primary&quot;
                                onClick={this.context.search}
                            &gt;
                                查询
                            &lt;/Button&gt;
                              &lt;Button
                               style={{ marginLeft: 0}}
                                 icon=&quot;reload&quot;
                                onClick={this.context.reset}
                            &gt;
                                重置
                            &lt;/Button&gt;
                        &lt;/div&gt;
                        ),
                    }, ]`;
        fields += search;
        this.createFile({
            dirName,
            date,
            author,
            company: company,
            fields: this.decode(fields),
            templatePath: 'umi/UIViews/Table/FormConfig/SearchFormConfig',
            sourcePath: baseDir,
            filePath: `/src/pages/${dirName}/Table/FormConfig/SearchFormConfig.js`,
        });
    }

    /**
     * 增加选项
     * @param {*} config 
     */
    mockTpl = (config) => {
        const item = {};
        const { tableColumns, flowKey, dirName, baseDir } = config;
        const appendItems = [];
        const listItems = tableColumns && tableColumns.map((option) => {
            const field = option.key;
            const type = option.type;
            if(field) {
            if (field.includes('status') || field.includes('Status')) {
                return { key: type, create: '[0,1]', prop: `[\`\${Field.${field}}|+1\`]` }
            }
            if (field.includes('time') || field.includes('Time') || field.includes('date') || field.includes('Date')) {
                return { key: type, create: '@date', prop: `[\`\${Field.${field}}\`]` };

            }
            if (field.includes('Num') || field.includes('Price') || field.includes('num') || field.includes('id') || field.includes('Id') || field.includes('number') || field.includes('code') || field.includes('Code') || field.includes('Number') || field.includes('Amount')) {
                return { key: type, create: 1, prop: `[\`\${Field.${field}|+1}\`]` }
            }
        }
        if(!field) {
            return { key: type, create: '@cname', prop: `dddd` }
        }
            return { key: type, create: '@cname', prop: `[\`\${Field.${field}}\`]` }
        });
        this.createFile({
            dirName,
            flowKey,
            sourcePath: baseDir,
            filePath: `/mock/${flowKey}.mock.js`,
            templatePath: 'umi/mocktpl',
            listItems,
        });
    }
    generateEditorView = (config) => {
        const { dirName, author, tableColumns, baseDir } = config;
        const date = moment().format('YYYY-MM-DD HH:mm');
        let setFormData = '';
        const formItems = [];
        tableColumns && tableColumns.map((item) => {
            if (item.isInForm) {
                setFormData += `[Field.${item.key}]: transformZero(data[Field.${item.key}]), // ${item.keyName}\n `;
                let input = '<Input />';
                if (item.type === 'select') {
                    input = '<Select><Select.Options value="1">选项1</Select.Options></Select>'
                }
                formItems.push({ key: item.key, label: item.keyName, input });
            }
        });
        this.createFile({
            dirName,
            date,
            author,
            company: company,
            setFormData: this.decode(setFormData),
            templatePath: 'umi/UIViews/Table/EditorView',
            sourcePath: baseDir,
            filePath: `/src/pages/${dirName}/Table/EditorView.js`,
            formItems,
        });
    }
    genreateField = (config) => {
        const { tableColumns, dirName, baseDir } = config;
        this.createFile({
            dirName,
            sourcePath: baseDir,
            company: company,
            templatePath: 'umi/UIViews/Table/Field',
            filePath: `/src/pages/${dirName}/Table/Field.js`,
            tableColumns,
        });
    }
    generateTableIndexView = (config) => {
        const { dirName, author, baseDir } = config;
        const date = moment().format('YYYY-MM-DD HH:mm');
        this.createFile({
            ...config,
            dirName,
            author,
            date,
            company: company,
            templatePath: 'umi/UIViews/Table/index',
            sourcePath: baseDir,
            filePath: `/src/pages/${dirName}/Table/index.js`,
        })
    }
    generateSearchView = (config) => {
        const { author, dirName, baseDir, tableColumns, flowKey } = config;
        const date = moment().format('YYYY-MM-DD HH:mm');
        const searchItems = [];
        const responsiveField = [];
        tableColumns && tableColumns.forEach((item) => {
            if (item.isInSearch) {
                searchItems.push(item);
                responsiveField.push({name: item.keyName,offset:0,field: item.key});
            }
        });
        this.createFile({
            ...config,
            dirName,
            author,
            date,
            flowKey,
            company: company,
            responsiveField,
            typeFunc: function () {
                var type = this.type || 'input';
                var keyName = this.keyName;
                var result = '<Input />';
                switch (type) {
                    case 'input':
                        result = '<Input />';
                        break;
                    case 'datetime':
                        result = '<DatePicker style={{width: "100%"}} />';
                        break;
                    case 'select':
                        result = '<Select />';
                        break;
                    default:
                        result = '<Date />';
                }
                if(keyName.includes('单据状态')) {
                    result = '<BillstatusSelect />';
                }
                return result;
            },
            templatePath: 'umi/UIViews/Table/SearchView',
            sourcePath: baseDir,
            filePath: `/src/pages/${dirName}/Table/SearchView.js`,
            searchItems,
        });
    }
    generateTableView = (config) => {
        const { flowKey, tableColumns, author, dirName, baseDir } = config;
        const tableItems = [];
        tableColumns.forEach((item) => {
            if (item.isInTable) {
                tableItems.push(item);
            }
        })
        const date = moment().format('YYYY-MM-DD HH:mm');
        this.createFile({
            ...config,
            dirName,
            author,
            flowKey,
            date,
            widthFunc: function () {
                const item = this;
                let minWidth = +item.keyName.length * 30 || 40;
                if (item.keyName.includes('日期') || item.keyName.includes('时间') || item.keyName.length < 3) {
                    if (minWidth < 80) {
                        minWidth = 120;
                    }
                }
                if (item.keyName.includes('单据编号')) {
                    minWidth = 180;
                }
                if(item.keyName.includes('备注')) {
                    minWidth = 200;
                }
                if(item.keyName.includes('配送')) {
                    minWidth = 200;
                }
                if(item.keyName.includes('名称')) {
                    minWidth = 250;
                }
                if (item.keyName.includes('单') && item.keyName.includes('号')) {
                    minWidth = 180;
                }
                if (item.keyName.includes('日')) {
                    minWidth = 120;
                }
                if (item.keyName.includes('时间')) {
                    minWidth = 180;
                }
                return minWidth;
            },
            fixFunc: function (index = 0) {
                // console.log()
                const item = this;
                let shouldFix = false;
                let countCol = tableColumns.length;
                if (tableColumns.length > 12) {
                    shouldFix = true;
                    countCol = countCol - 12;
                }
                let fixString = '';
                // if (shouldFix && index < countCol - 1) {
                //     fixString = 'fixed:\'left\',';
                // }
                return fixString;
            },
            renderFunc: function () {
                const item = this;
                if (item.keyName.includes('单据状态')) {
                    return '<BillStatus status={value} />';
                }
                if (item.keyName.includes('单据编号')) {
                    return `<Ellipsis title={transformZero(value)}>
                    <span style={{ fontWeight:'bold'}}>{transformZero(value)}</span>
                  </Ellipsis>`
                }
                if (item.keyName.includes('单') && item.keyName.includes('号')) {
                    return `<Ellipsis title={transformZero(value)}>
                    <span style={{ fontWeight:'bold'}}>{transformZero(value)}</span>
                  </Ellipsis>`
                }
                return `<Ellipsis title={transformZero(value)}>
                {transformZero(value)}
              </Ellipsis>`
            },
            company: company,
            templatePath: 'umi/UIViews/Table/TableListView',
            sourcePath: baseDir,
            filePath: `/src/pages/${dirName}/Table/TableListView.js`,
            tableItems,
        });
    }
    generatedata = (config) => {
        const { dirName, flowKey, author, baseDir } = config;
        const date = moment().format('YYYY-MM-DD HH:mm');
        this.createFile({
            dirName,
            flowKey,
            author,
            date,
            company: company,
            sourcePath: baseDir,
            filePath: `/src/pages/${dirName}/data.js`,
            templatePath: '/umi/UIViews/data',
        });
    }
    generatev = (config) => {
        const { dirName, flowKey, author, baseDir } = config;
        const date = moment().format('YYYY-MM-DD HH:mm');
        this.createFile({
            dirName,
            flowKey,
            author,
            date,
            company: company,
            sourcePath: baseDir,
            filePath: `/src/pages/${dirName}/EditorView.js`,
            templatePath: '/umi/UIViews/EditorView',
        });
    }
    generatefd = (config) => {
        const { dirName, flowKey, author, baseDir } = config;
        const date = moment().format('YYYY-MM-DD HH:mm');
        this.createFile({
            dirName,
            flowKey,
            author,
            date,
            company: company,
            sourcePath: baseDir,
            filePath: `/src/pages/${dirName}/Field.js`,
            templatePath: '/umi/UIViews/Field',
        });
    }
    generatefc = (config) => {
        const { dirName, flowKey, author, baseDir } = config;
        const date = moment().format('YYYY-MM-DD HH:mm');
        this.createFile({
            dirName,
            flowKey,
            author,
            date,
            company: company,
            sourcePath: baseDir,
            filePath: `/src/pages/${dirName}/formConfig.js`,
            templatePath: '/umi/UIViews/formConfig',
        });
    }
    generatein = (config) => {
        const { dirName, flowKey, author, baseDir } = config;
        const date = moment().format('YYYY-MM-DD HH:mm');
        this.createFile({
            ...config,
            dirName,
            flowKey,
            author,
            date,
            company: company,
            sourcePath: baseDir,
            filePath: `/src/pages/${dirName}/index.js`,
            templatePath: '/umi/UIViews/index',
        });
    }
    generateleft = (config) => {
        const { dirName, flowKey, author, baseDir } = config;
        const date = moment().format('YYYY-MM-DD HH:mm');
        this.createFile({
            dirName,
            flowKey,
            author,
            date,
            company: company,
            sourcePath: baseDir,
            filePath: `/src/pages/${dirName}/Left.js`,
            templatePath: '/umi/UIViews/Left',
        });
    }
    generateright = (config) => {
        const { dirName, flowKey, author, baseDir } = config;
        const date = moment().format('YYYY-MM-DD HH:mm');
        this.createFile({
            dirName,
            flowKey,
            author,
            date,
            company: company,
            sourcePath: baseDir,
            filePath: `/src/pages/${dirName}/Right.js`,
            templatePath: '/umi/UIViews/Right',
        });
    }
    decode = (string) => {
        let res = string || '';
        res = res.toString()
            .replace(/"/g, "")
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&apos;/g, "'")
            .replace(/<pre>/g, "")
            .replace(/<\/pre>/g, "\r")
            .replace(/&#x27;/g, "`")
            .replace(/&#x3D;/g, "=")
            .replace(/&#x60;/g, "`")
            .replace(/&amp;/g, '&');
        return res;
    }
    createFile = (payload) => {
        const template = getTemplateMustache(payload.templatePath);
        const source = Mustache.render(template, payload);
        const filePath = join(payload.sourcePath, payload.filePath);
        writeFile(filePath, source, () => {
            // eslint(payload.sourcePath, filePath);
        });
        info('create', `page ${payload.dirName} with ${filePath}`);
    };

    createRouter = (payload) => {
        const routerPath = join(payload.sourcePath, `/src/router/RouteConfig.js`);
        if (assert(existsSync(routerPath), 'dash/page/create: router file does not exists')) {
            const root = j(readFile(routerPath));
            const arrList = root.find(j.ArrayExpression).find(j.ObjectExpression);
            if (arrList && arrList.__paths) {
                if (arrList.find(j.Identifier, node => {
                    return node.path === payload.componentName;
                }).size() > 0) {
                    error(`regist router import failed, ${payload.componentName} import already exists in routerConfig.js`);
                } else {
                    j(arrList.__paths[arrList.__paths.length - 1]).insertAfter(
                        j(`[
                            {
                                path: '/${payload.stateName}',
                                page: import('../pages/${payload.componentName}'),
                            },
                        ]`).find(j.ObjectExpression).__paths[0].value);
                }
            }
            writeFile(routerPath, root.toSource(), () => {
                eslint(payload.sourcePath, 'src/router/RouteConfig.js');
            });
        }
    };
    createMenu = (payload) => {
        const routerPath = join(payload.baseDir, `/config/MenuConfig.js`);
        console.log(routerPath);

        if (assert(existsSync(routerPath), 'dash/page/create: MenuConfig file does not exists')) {
            const root = j(readFile(routerPath));
            const arrList = root.find(j.ArrayExpression).find(j.ObjectExpression);
            if (arrList && arrList.__paths) {
                if (arrList.find(j.Identifier, node => {
                    return node.name === payload.componentName;
                }).size() > 0) {
                    error(`regist MenuConfig import failed, ${payload.componentName} import already exists in MenuConfig.js`);
                } else {
                    j(arrList.__paths[0]).insertBefore(
                        j(`[
                            {
                                name: '${payload.dirName}',
                                key: '${payload.dirName}',
                                path: '/${payload.dirName}',
                                component: './${payload.dirName}',
                            },
                        ]`).find(j.ObjectExpression).__paths[0].value);
                }
            }
            writeFile(routerPath, root.toSource(), () => {
                // eslint(payload.sourcePath, '/config/MenuConfig.js');
            });
        }
    };
}

const generate = new Generate().generate;
export default generate;
