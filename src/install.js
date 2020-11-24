import which from 'which';
import childProcess from 'child_process';
import path, { resolve } from 'path';

class Install {
    install = (program, { baseDir, type }) => {
        return new Promise((resolve) => {
            console.log(baseDir, 'baseDir')
            const npm = this.findNpm();
            const free = childProcess.spawn(which.sync(npm), ['install'], { cwd: baseDir });
            free.stdout.on('data', function (data) {
                console.log('标准输出：\n' + data);
            });
    
            // 捕获标准错误输出并将其打印到控制台
            free.stderr.on('data', function (data) {
                console.log('标准错误输出：\n' + data);
            });
    
            // 注册子进程关闭事件
            free.on('exit', function (code, signal) {
                console.log('子进程已退出，代码：' + code);
                resolve(code);
            });
            // this.runCmd(which.sync(npm), ['install'], function () {
            //     console.log(npm + ' install end');
            // });
        });
    };

    start = (program, { baseDir, type }) => {
        return new Promise((resolve) => {
            console.log(baseDir, 'baseDir')
            const npm = this.findNpm();
            const free = childProcess.spawn(which.sync(npm), ['start'], { cwd: baseDir });
            free.stdout.on('data', function (data) {
                console.log('标准输出：\n' + data);
                if (data.includes('App running at')) {
                    const url = data;
                    resolve(url);
                }
            });
    
            // 捕获标准错误输出并将其打印到控制台
            free.stderr.on('data', function (data) {
                console.log('标准错误输出：\n' + data);
            });
    
            // 注册子进程关闭事件
            free.on('exit', function (code, signal) {
                console.log('子进程已退出，代码：' + code);
            });
            // this.runCmd(which.sync(npm), ['install'], function () {
            //     console.log(npm + ' install end');
            // });
        });
    };


    eslint = (path1, path2) => {
        const es = process.platform === 'win32' ? '/eslint.cmd' : '/eslint';
        const runner = childProcess.spawn(`${path.join(path1, '/node_modules/.bin', es)}`, ['--fix', path2], {
            stdio: "inherit"
        });
        runner.on('error', function (code) {
            console.log(code);
            console.log('RouterConfig文件格式化错误');
        });
    };

    runCmd = (cmd, args, fn) => {
        args = args || [];
        const runner = childProcess.spawn(cmd, args, {
            // keep color
            stdio: "inherit"
        });
        runner.on('close', function (code) {
            if (fn) {
                fn(code);
            }
        });
    };

    findNpm = () => {
        const npms = process.platform === 'win32' ? ['tnpm.cmd', 'cnpm.cmd', 'npm.cmd'] : ['tnpm', 'cnpm', 'npm'];
        for (let i = 0; i < npms.length; i++) {
            try {
                which.sync(npms[i]);
                console.log('use npm: ' + which.sync(npms[i]));
                console.log('use npm: ' + npms[i]);
                console.log('正在安装依赖请稍后……');
                return npms[i];
            } catch (e) {
            }
        }
        throw new Error('please install npm');
    };
}

const install = new Install().install;
const eslint = new Install().eslint;
export default new Install();
// export { install, eslint};
