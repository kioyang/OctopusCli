import { join, basename } from 'path';
import fs from 'fs';
import { sync as emptyDir } from 'empty-dir';
import { info, error, success, copy } from './utils';
import startInstall from './install';

class Init {
    static URL = {
        antProReact: 'D:\\all\\workspace\\dash-cli\\pro',
        antProVue: 'https://github.com/ant-design/ant-design-pro.git'
    };

    /**
     *  项目初始化方法
     * @param program
     */
    init = (program, { baseDir, type, projectName}) => {
        const {dashboard, shoal, install} = program;
        console.log(`Creating a new app in ${baseDir}.`);
        return new Promise((resolve, reject)=> {
            copy(Init.URL[type], baseDir,resolve);
        }).then(() => {
            try {
                this.deleteAll(`${baseDir}/\.git`);
                this.modifyPackage(baseDir, projectName);
            } catch(e) {
                console.log(e);
            }
            if (install) {
                info('run', 'npm install');
                startInstall.install(program, { baseDir, type});
            } else {
                this.printSuccess(baseDir, install, type, projectName);
            }
        })
    };

    /**
     *  错误退出方法
     * @param messge
     */
    exitProcess = (program, messge) => {
        console.log();
        error(messge);
        program.help();
        process.exit(1);
    };

    /**
     *  输出成功
     */
    printSuccess = (dest, install, dashboard, projectName) => {
        success(`
            运行成功! 已在${dest}目录创建 ${projectName}项目.
            
            你可以运行以下命令启动项目:
              cd ${dest}
              ${install ? '' : 'npm install'}
              npm start
            
            Happy hacking!`
        );
    };

    /**
     * 删除文件夹以及文件夹下文件方法
     * @param path
     */
    deleteAll = (path) => {
        let files = [];
        if(fs.existsSync(path)) {
            files = fs.readdirSync(path);
            files.forEach((file, index) => {
                var curPath = path + "/" + file;
                if(fs.statSync(curPath).isDirectory()) {
                    this.deleteAll(curPath);
                } else {
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    };

    /**
     * 修改package.json的name和版本号
     * @param dest
     * @param projectName
     */
    modifyPackage = (dest, projectName) => {
        const packageData = require(`${dest}/package.json`);
        packageData.name = projectName;
        packageData.version = '0.0.1';
        fs.writeFileSync(`${dest}/package.json`, JSON.stringify(packageData, null, 2), (err) => {
            if(err) {
                error(err);
            } else {
                success('package.json写入成功');
            }
        });
    }
}

const init = new Init().init;
export default init;
