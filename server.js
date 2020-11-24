const http = require('http');
const util = require('util');
const querystring = require('querystring');
const fs=require('fs');
const { start } = require('repl');
const stat=fs.stat;

http.createServer(function (request, response) {

    // 发送 HTTP 头部 
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    console.log(request.method);
    if (request.method === 'POST') {
        // 定义了一个post变量，用于暂存请求体的信息
        var post = '';

        // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
        request.on('data', function (chunk) {
            post += chunk.toString('utf8');
        });

        // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
        request.on('end', function () {
            if (request.url.includes('/api/sp')) {
                createModule(JSON.parse(post)).then(() => {
                    console.log('响应数据');
                    response.writeHead(200, { 'Content-Type': 'text/plain' });
                    response.end(post);
                })
            }

            if (request.url.includes('/api/init')) {
                init(JSON.parse(post)).then((data) => {
                    console.log(data, 'd')
                    response.writeHead(200, { 'Content-Type': 'applicatin/json' });
                    response.end(data);
                })
            }

            if (request.url.includes('/api/install')) {
                install(JSON.parse(post)).then((data) => {
                    console.log(data, 'd')
                    response.writeHead(200, { 'Content-Type': 'applicatin/json' });
                    response.end(data);
                })
            }

            if (request.url.includes('/api/start')) {
                startRun(JSON.parse(post)).then((data) => {
                    console.log(data.toString('utf8'), 'd')
                    response.writeHead(200, { 'Content-Type': 'applicatin/json' });
                    response.end(data.toString('utf8'));
                })
            }

            if (request.url.includes('/api/directory')) {
                findDirectory(JSON.parse(post)).then((data) => {
                    console.log(data, 'directory');
                    response.writeHead(200, { 'Content-Type': 'text/plain' });
                    response.end(JSON.stringify(data));
                });
            }
        });
    }
    if (request.method === 'GET') {
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        // 发送响应数据 "Hello World"
        response.end('Hello World\n');
    }
}).listen(8888);

findDirectory = async (post) => {
    const { path = 'd:\\'} = post;
    const copy= (src,dst, resolve) => {
        console.log('拷贝文件中......', dst);
        //读取目录
          const paths = fs.readdirSync(src);
          return paths.filter((item) => !item.includes('.'));
    }
    return copy(path);
}

startRun = async (config) => {
    console.log('init project');
    console.log(config, 'config');
    const { projectType, projectName, projectDir } = config;
    const program = require('commander');
    program
        .option('-d --dashboard', '通过dashboard脚手架创建项目')
        .option('-s --shoal', '通过shoal脚手架创建项目')
        .option('-n --no-install', '设置是否自动安装依赖，默认自动安装')
        .parse(process.argv);

    const result = await require('./lib/install').start(program, {
        baseDir: `${projectDir}${projectName}`,
        type: projectType,
    });
    return result;
}

install = async (config) => {
    console.log('init project');
    console.log(config, 'config');
    const { projectType, projectName, projectDir } = config;
    const program = require('commander');
    program
        .option('-d --dashboard', '通过dashboard脚手架创建项目')
        .option('-s --shoal', '通过shoal脚手架创建项目')
        .option('-n --no-install', '设置是否自动安装依赖，默认自动安装')
        .parse(process.argv);

    const result = await require('./lib/install').install(program, {
        baseDir: `${projectDir}${projectName}`,
        type: projectType,
    });
    return result;
}

init = async (config) => {
    console.log('init project');
    console.log(config, 'config');
    const { projectType, projectName, projectDir } = config;
    const program = require('commander');
    program
        .option('-d --dashboard', '通过dashboard脚手架创建项目')
        .option('-s --shoal', '通过shoal脚手架创建项目')
        .option('-n --no-install', '设置是否自动安装依赖，默认自动安装')
        .parse(process.argv);

    const result = await require('./lib/init')(program, {
        baseDir: `${projectDir}${projectName}`,
        type: projectType,
    });
    return result;
}

createModule = async (post) => {
    console.log('create module:', post.code);
    const program = require('commander');
    program
        .option('-c --configPath [configPath]', '创建组件的项目根目录,默认当前执行环境目录下的index.js文件')
        .parse(process.argv);
        console.log(process.cwd(), 'process cwd');

    await require('./lib/sp')(program, {
        cwd: process.cwd(),
        module: post,
    });
}

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');