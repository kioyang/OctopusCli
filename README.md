# dash-cli

## Getting Started

If you want use this npm package,you need to set you npm registry to http://registry.npmp.dz11.com

```bash
# Install
$ cnpm install -g @douyu/dash-cli

# Create app
$ dash new myapp [options]

# Start app
$ cd myapp
$ npm start
```

#### options

* `-d --dashboard` -- 使用dashboard模板创建项目
* `-s --shoal` -- 使用shoal模板创建项目
* `-n --no-install` -- 项目创建完是否自动安装项目依赖，默认安装
* `-g --generate` -- 项目创建页面


## Commands

We have 3 commands: `new` 、`init` and `generate`.

### dash new <appName> [options]

Create app with new directory.

#### Usage Examples

```bash
$ dash new myapp -d
$ dash new myapp -s
$ dash new myapp -d -n
```

### dash init [options]

Create app in current directory. It's options is the same as `dash new`.

#### Usage Examples

```bash
$ dash init -d
$ dash init -s
$ dash init -d -n
```

### dash generate [options]

Create PageView in current project.
#### options
* `-f --no-flow` -- 是否创建对应的flow文件,默认创建flow和service

#### Usage Examples

```bash
$ dash g Test
$ dash g Test -f
```


### dash spcli [options]

   Create complete PageView with mock data in current project.
   #### options
   * `-c --configPath [configPath]` -- 指定配置文件路径 如不指定,则默认为当前执行命令目录下的index.js文件
   * 配置文件格式请参见 [http://doc.dz11.com/ddse/preview/space/14504?sid=36&pid=14398/](http://doc.dz11.com/ddse/preview/space/14504?sid=36&pid=14398/)

   #### Usage Examples

   ```bash
   $ dash sp
   $ dash sp -c E:\workspace\index.handlebars
   ```
