  // reducer
  function objectSpread(obj1,obj2) {
    var obj = obj1;
    for(var x in obj1) {
        obj[x] = obj1[x];
    }
    for(var y in obj2) {
        obj[y] = obj2[y];
    }
    return obj;
}

// 是否是纯种对象 Object直接生出来的孩子
function isPlainObject(obj) {
    if (typeof obj !== 'object' || obj === null) return false

    var proto = obj
    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto)
    }
  
    return Object.getPrototypeOf(obj) === proto
}

function getLocationKey() {
    var str = location.host;
    return str;
}

function Class(config) {
    var storeType = config.storeType || 'sessionStorage';
    this.storage = window[storeType]; // 存储容器
    this.storeKey = config.key || getLocationKey(); // 存储键
    var initialState = config.initialState || {};
    this.state = objectSpread({}, initialState);
    var preState = JSON.parse(this.storage.getItem(this.storeKey));
    // 如果之前有存储的状态
    if(preState) {
        this.setState(objectSpread(preState, initialState));
    } {
        this.storage.setItem(this.storeKey, JSON.stringify(this.state));
    }
}
Class.prototype.dispatch = function(config) {
    var type = config.type;
    if(!isPlainObject(config.payload)) {
        throw new Error('状态对象不是一个纯种对象')
    }
    var reducer = this.reducers[type];
    var newState = {};
    if(reducer && typeof reducer === 'function') {
        newState = reducer(this.state,config.payload);
    }
    for(var i = 0; i < this.funcs.length;i++) {
        var func = this.funcs[i];
        if(typeof func === 'function') {
            func(this.state,newState);
        }
    }
    this.setState(newState);
}

Class.prototype.setState = function(newState) {
    this.state = objectSpread(this.state,newState);
    this.storage.setItem(this.storeKey, JSON.stringify(this.state));
}

function Redux(key) {
    this.key = key;
}

// 创建单一状态树
Redux.prototype.createStore = function(config) {
    var classInstance = new Class(config);
    this.classInstance = classInstance;
    this.classInstance.funcs = [];
    this.combineReducers(config.reducers);
    return classInstance;
}

Redux.prototype.combineReducers = function(reducersArr) {
    this.reducers = reducersArr || [];
    this.classInstance.reducers = reducersArr;
}
Redux.prototype.getState = function() {
    return this.classInstance.state;
}
Redux.prototype.connect = function(func) {
    if(typeof func === 'function') {
        this.classInstance.funcs.push(func);
    }
}

export default new Redux();