import Handlebars from 'handlebars';
import { join } from 'path';
import { readFileSync, existsSync } from 'fs';
import { outputFile, removeSync } from 'fs-extra';
import leftPad from "left-pad/index";
import chalk from "chalk";

export default class Util {
    /**
     *  获取模版
     */
    getTemplate = (name) =>{
        const filePath = join(__dirname, `../template/${name}.handlebars`);
        console.log(filePath);
        if (!existsSync(filePath)) {
            console.log(`getTemplate: file ${name} not fould`)
            return;
        }
        const source = readFileSync(filePath, 'utf-8');
        return Handlebars.compile(source);
    };

    getTemplateMustache = (name) =>{
        const filePath = join(__dirname, `../template/${name}.handlebars`);
        console.log(filePath);
        if (!existsSync(filePath)) {
            console.log(`getTemplate: file ${name} not fould`)
            return;
        }
        const source = readFileSync(filePath, 'utf-8');
        return source;
    };
    /**
     *  读文件
     */
    readFile = (filePath) => {
        return readFileSync(filePath, 'utf-8');
    };
    /**
     *  写文件
     */
    writeFile = (filePath, source, cb) => {
        outputFile(filePath, source, function(err) {
            if (!err) {
                cb && cb();
            }
        });
    };
    /**
     *  移除文件
     */
    removeFile = (filePath) => {
        removeSync(filePath);
    };
    /**
     *  Class命名
     */
    upperCamelCase = (str) => {
        str = str
            .replace(/[-_](.)/, function ($1, $2) {
                return $2.toUpperCase();
            });
        str = str.charAt(0).toUpperCase() + str.slice(1);
        return str;
    };
    /**
     *  flowKey命名
     */
     lowerCamelCase = (str) => {
        str = str
            .replace(/[-_](.)/, function ($1, $2) {
                return $2.toUpperCase();
            });
        str = str.charAt(0).toLowerCase() + str.slice(1);
        return str;
    };
    /**
     *  条件判断
     */
    assert = (filter, message) => {
        if (filter)
            return true;
        else {
            this.error(message);
            return false
        }
    };
    /**
     *  信息提示
     */
    info = (type, message) => {
        console.log(`${chalk.green.bold(leftPad(type, 12))}  ${message}`);
    };
    /**
     *  错误提示
     */
    error = (message) => {
        console.error(`${chalk.red.bold(message)}`);
    };
    /**
     *  成功提示
     */
    success = (message) => {
        console.error(chalk.green(message));
    };
}

const fs=require('fs');
const stat=fs.stat;

const copy= (src,dst, resolve) => {
    console.log('拷贝文件中......', dst);
    //读取目录
      const paths = fs.readdirSync(src);
      paths.forEach(function(path, index){
        var _src=join(src,'/',path);
        var _dst=join(dst,'/',path);
        fs.mkdirSync(dst, { recursive: true});
        const st = fs.statSync(_src);
        if(st.isFile()){
            const data = fs.readFileSync(_src);
            fs.writeFileSync(_dst, data);
        }else if(st.isDirectory()){
            exists(_src,_dst,copy);
        }
    });
    if (resolve) {
        setTimeout(() => { resolve('success')}, 4000);
    }
}

var exists=function(src,dst,callback){
    //测试某个路径下文件是否存在
    fs.exists(dst,function(exists){
        if(exists){//不存在
            callback(src,dst);
        }else{//存在
            fs.mkdir(dst,function(){//创建目录
                callback(src,dst)
            })
        }
    })
}

const { getTemplate,getTemplateMustache, readFile, writeFile, removeFile, upperCamelCase, lowerCamelCase, assert, info, error, success } = new Util();
export { copy, getTemplate,getTemplateMustache, readFile, writeFile, removeFile, upperCamelCase, lowerCamelCase, assert, info, error, success };
