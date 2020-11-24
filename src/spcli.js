import j from 'jscodeshift';
import moment from 'moment';
import { basename, dirname, join } from 'path';
import { statSync, readFileSync, existsSync } from 'fs';
import { getTemplate, assert, writeFile, readFile, info, error, success } from './utils';
import { eslint } from './install';

const company = 'haopengit.com';

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
    generate = (program, { cwd }) => {
        try {
            const configPath = program.configPath;
            if (!configPath) {
                success('默认使用当前路径的index.js文件,指定配置文件路径用-c');
            }
            const config = require(configPath || `${cwd}/index.js`);
            config.cwd = cwd;
            this.mockTpl(config);
            this.generateModel(config);
            this.generateApiConfig(config);
            this.generateUmiService(config);
            // this.generateUmiFormConfig(config);
            // this.generateUmiSearchFormConfig(config);
            this.generateEditorView(config);
            // this.genreateField(config);
            this.generateTableIndexView(config);
            this.generateSearchView(config);
            this.generateTableView(config);
            // this.generatedata(config);
            // this.generatev(config);
            // this.generatefd(config);
            // this.generatefc(config);
            this.generatein(config);
            // this.generateright(config);
            // this.generateleft(config);
            // this.genreateField(config);
            const {dirName, flowKey, baseDir} = config;
            // this.createRouter(payload);
            // this.createMenu(payload);
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
    generateModel = (config) => {
        const {dirName, flowKey, author, baseDir} = config;
        let initData = {page: 1, pageSize: 10};
        const date = moment().format('YYYY-MM-DD HH:mm');
        this.createFile({
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
        const {dirName, flowKey, author, baseDir} = config;
        const date = moment().format('YYYY-MM-DD HH:mm');
        this.createFile({
            dirName,
            flowKey,
            author,
            date,
            company: company,
            sourcePath: baseDir,
            filePath: `/src/services/${dirName}/apiConfig.js`,
            templatePath: '/umi/Service/apiConfig',
        });
    }
    generateUmiService = (config) => {
        const {dirName, flowKey, author, baseDir} = config;
        let initData = {page: 1, pageSize: 10};
        const date = moment().format('YYYY-MM-DD HH:mm');
        this.createFile({
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
        const {author, dirName, baseDir} = config;
        const date = moment().format('YYYY-MM-DD HH:mm');
        const {tableColumns} = config;
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
        const {author, dirName, baseDir} = config;
        const date = moment().format('YYYY-MM-DD HH:mm');
        const {tableColumns} = config;
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
    mockTpl = (config) => {
        const item = {};
        const {tableColumns, flowKey, dirName, baseDir} = config;
        let appendMethods = '';
        tableColumns && tableColumns.map((option) => {
            const field = option.key;
            const type = option.type;
            let flag = true;
            item[`[\`id|+1\`]`] = 1;
            if (field.includes('status') || field.includes('Status')) {
                item[`[\`\${Field.${field}}|1\`]`] = '[0, 1]';
                flag = false;
            }
            if (field.includes('time') || field.includes('Time') || field.includes('date') || field.includes('Date')) {
                flag = false;
                item[`[\`\${Field.${field}}\`]`] = `&apos;@date&apos;`;
            }
            if (field.includes('Num') || field.includes('Price') || field.includes('num') || field.includes('id') || field.includes('Id') || field.includes('number') || field.includes('code') || field.includes('Code') || field.includes('Number') || field.includes('Amount')) {
                item[`[\`\${Field.${field}}|+1\`]`] = 1;
                flag = false;
            }
            if (flag) {
                item[`[\`\${Field.${field}}\`]`] = `&apos;@cname&apos;`;
            }
            if (type === 'select') {
                const appendItem = `<pre>
   [\`GET /${field}/list\`]: {
        code: 0,
        data: [{id: 1, title: \`选项1\`},{id: 2, title: \`选项2\`}],
    },
</pre>`;
                appendMethods += appendItem;
            }
        });
        this.createFile({
            dirName,
            flowKey,
            item: this.decode(JSON.stringify(item)).replace(/,/g, ',\n'),
            appendMethods,
            sourcePath: baseDir,
            filePath: `/mock/${flowKey}.mock.js`,
            templatePath: 'umi/mocktpl'
        });
    }
    generateEditorView = (config) => {
        const {dirName, author, tableColumns, baseDir} = config;
        const date = moment().format('YYYY-MM-DD HH:mm');
        let setFormData = '';
        tableColumns && tableColumns.map((item) => {
            if (item.isInForm) {
                setFormData += `[Field.${item.key}]: transformZero(data[Field.${item.key}]), // ${item.keyName}\n `;
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
            filePath:  `/src/pages/${dirName}/Table/EditorView.js`,
        });
    }
    genreateField = (config) => {
        const {tableColumns, dirName, baseDir} = config;
        let fields = '    ';
        tableColumns && tableColumns.map((item) => {
            fields += `${item.key}: &apos;${item.key}&apos;, `;
            fields += `${item.key}Name: &apos;${item.keyName}&apos;, `;
        });
        this.createFile({
            dirName,
            fields: this.decode(fields),
            sourcePath: baseDir,
            company: company,
            templatePath: 'umi/UIViews/Table/Field',
            filePath: `/src/pages/${dirName}/Table/Field.js`,
        });
    }
    generateTableIndexView = (config) => {
        const {dirName, author, baseDir} = config;
        const date = moment().format('YYYY-MM-DD HH:mm');
        this.createFile({
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
        const {author, dirName, baseDir} = config;
        const date = moment().format('YYYY-MM-DD HH:mm');
        this.createFile({
            dirName,
            author,
            date,
            company: company,
            templatePath: 'umi/UIViews/Table/SearchView',
            sourcePath: baseDir,
            filePath: `/src/pages/${dirName}/Table/SearchView.js`,
        });
    }
    generateTableView = (config) => {
        const {flowKey, tableColumns, author, dirName, baseDir} = config;
        let columns = '';
        let totalWidth = 0;
        tableColumns && tableColumns.map((item, index) => {
            let shouldFix = false;
            let countCol = tableColumns.length;
            if (tableColumns.length > 12) {
                shouldFix = true;
                countCol = countCol - 12;
            }
            let minWidth = +item.keyName.length * 30 || 40;
            if (item.keyName.includes('日期') || item.keyName.includes('时间')) {
                if (minWidth < 80) {
                    minWidth = 80;
                }
            }
            if (item.isInTable) {
                totalWidth += minWidth;
            }
            if (item.isInTable) {
                let fixString = '';
                if (shouldFix && index < countCol - 1) {
                    fixString = 'fixed:&apos;left&apos;,';
                }
                const column = `{
                // ${item.keyName}
                align:'center',
                title: Field.${item.key}Name,
                dataIndex: Field.${item.key},
                key: Field.${item.key},
                width: ${minWidth}, ${fixString}
                render: (text) =&gt; {
                    return (
                        &lt;Ellipsis&gt;
                            {transformZero(text)}&lt;/Ellipsis&gt;);
                },
            },`;
                columns += column;
            }
        });
        const operation = `{
                title: &apos;操作&apos;,
                dataIndex: &apos;operation&apos;,
                key: &apos;operation&apos;,
                fixed: &apos;right&apos;,
                width: 100,
                render: this.genOperations,
            },`;
        columns += operation;
        totalWidth += 100;
        if (totalWidth < 1200) {
            totalWidth = 1200;
        }
        totalWidth = `{{ x: ${totalWidth}}}`;
        const date = moment().format('YYYY-MM-DD HH:mm');
        this.createFile({
            dirName,
            author,
            columns: this.decode(columns),
            flowKey,
            date,
            totalWidth,
            company: company,
            templatePath: 'umi/UIViews/Table/TableListView',
            sourcePath: baseDir,
            filePath: `/src/pages/${dirName}/Table/TableListView.js`,
        });
    }
    generatedata = (config) => {
        const {dirName, flowKey, author, baseDir} = config;
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
        const {dirName, flowKey, author, baseDir} = config;
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
        const {dirName, flowKey, author, baseDir} = config;
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
        const {dirName, flowKey, author, baseDir} = config;
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
        const {dirName, flowKey, author, baseDir} = config;
        const date = moment().format('YYYY-MM-DD HH:mm');
        this.createFile({
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
        const {dirName, flowKey, author, baseDir} = config;
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
        const {dirName, flowKey, author, baseDir} = config;
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
        const template = getTemplate(payload.templatePath);
        let source = template(payload);
       source = this.decode(source);
        const filePath = join(payload.sourcePath, payload.filePath);
        writeFile(filePath, source, () => {
            eslint(payload.sourcePath, filePath);
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
        const routerPath = join(payload.sourcePath, `/src/config/MenuConfig.js`);
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
                                name: '${payload.componentName}',
                                key: '${payload.stateName}',
                                path: '/${payload.stateName}',
                            },
                        ]`).find(j.ObjectExpression).__paths[0].value);
                }
            }
            writeFile(routerPath, root.toSource(), () => {
                eslint(payload.sourcePath, 'src/config/MenuConfig.js');
            });
        }
    };
}

const generate = new Generate().generate;
export default generate;
