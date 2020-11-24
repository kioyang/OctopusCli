import j from 'jscodeshift';
import { basename, dirname, join } from 'path';
import { statSync, readFileSync, existsSync } from 'fs';
import { upperCamelCase, lowerCamelCase, getTemplate, assert, writeFile, readFile, info, error } from './utils';
import { eslint } from './install';

class Generate {
    generate = (program, { cwd }) => {
        const name = program.args[0];
        const { flow } = program;
        try {
            if (name) {
                (() => {
                    const componentName = upperCamelCase(name);
                    const stateName = lowerCamelCase(name);
                    const componentPath = `/src/pages/${componentName}/index.jsx`;
                    info('create', `ComponentPage ${componentPath}`);
                    this.createPage({
                        componentName,
                        stateName,
                        sourcePath: cwd,
                        filePath: componentPath,
                        flow
                    });
                })();
            } else {
                error(`  请输入组件名称  `);
            }
        } catch (e) {
            error(e.stack);
        }
    };

   createPage = (payload) => {
        if (!assert(payload.componentName, 'dash/page/create: payload should have componentName')) {
            return;
        }
        const template = getTemplate('page.create');
        const source = template(payload);
        const filePath = join(payload.sourcePath, payload.filePath);
        if (!assert(!existsSync(filePath), 'dash/page/create: file exists')) {
            return;
        }
        writeFile(filePath, source);
        info('create', `page ${payload.componentName} with ${filePath}`);
        this.createRouter(payload);
        this.createMenu(payload);
        if (payload.flow) {
            this.createFlowService(payload);
            this.createFlowService(payload, false);
        }
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

   createFlowService = (payload, isFlow = true) => {
        const params = isFlow ? 'flow' : 'service';
        if (!assert(payload.componentName, `dash/${params}/create: payload should have componentName`)) {
            return;
        }
        const template = getTemplate(`${params}.create`);
        const source = template(payload);
        const filePath = join(payload.sourcePath, `/src/${params}/${payload.componentName}/index.js`);
        if (!assert(!existsSync(filePath), `dash/${params}/create: file exists`)) {
            return
        }
       writeFile(filePath, source);
       info('create', `${params} ${payload.componentName} with ${filePath}`);
   };
}

const generate = new Generate().generate;
export default generate;
