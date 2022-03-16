// expain closure
const closureFunc = top => middle => bottom =>{ return `${top}, ${middle}, ${bottom}`};
// console.log(closureFunc(1)(2)(3) );

// explain encapsulation 
// means hiding inner objects from outside scope
const encapFunc = () => {
    let ppl = [];
    const setName = name => ppl.push(name);
    const getNmae = i => ppl[i];
    return { setName, getNmae };
};

const data = encapFunc();
data.setName('Lu');
//ppl not available


function memoAddTo10() {
    let cache ={};
    return function(n){
        if(n in cache) {
            return cache.n
        } else {
            cache.n = n+10;
            return cache.n
        }
    }
}
// once the function is initial by a variable, objects are kept in this variable
// const memo = memoAddTo10();
// console.log('1.', memo(5))
// console.log('2.', memo(5)) // wont recalculate
// console.log('3.', memo(10))


// basic bind call apply
// function add(a,b) {
//     return a+b;
// }
// console.log( add.call(null, 1,2) )
// console.log( add.apply(null, [1,2]) )
// var add1 = add.bind(null,1);
// console.log( add1(2) )

var list = [1, 2, 3, 4];
function dynamicAdd(...num) {
    return num.reduce( (previousValue, currentValue) => previousValue + currentValue )
}
// console.log(dynamicAdd.apply(null,list) );

var list = [1, 5, 8];
function add(...num) {
    return num.reduce(function(sum, num) {
        return sum + num;
    });
}
// console.log(add.call(null, 1, 2));			// 3
// console.log(add.apply(null, list));	


//4 ways binding this

/**
 * TAKE THIS EXAMPLE 不要下面的
 */
//implicit (default) 
this.scope = 'out';
const some_module = {
    scope: 'in',
    getScope: function(){ 
        console.log(this.scope); //in
        return this.scope
     },
    getScope2: function(){ 
        return function(){console.log(this.scope); } // undefined
     },
    getScope3: function(){ 
        var that = this;
        return function(){console.log(that.scope); } //in
     },

    arrowFunc: () => { //一般函式在建立時是在 window 下，所以在 window 下使用箭頭函式自然會指向 window
        console.log(this.scope); 
    },
    arrowFunc2: function(){ //要確實將箭頭函式宣告在物件內部，這樣 this 才會指向該物件
        return () => {
            console.log(this); 
        }
     },
    arrowFuncWithVar: function(){ //跟上面差不多
        var func = () => console.log(this);  //建立一個物件 讓箭頭函式以此作為基準
        func()     
    },
      
}
// 傳統函式：依呼叫的方法而定
// 箭頭函式：綁定到其定義時所在的物件 
// some_module.getScope(); //方法在物件中被invoke
// some_module.getScope2()(); //在外面被invoke
// some_module.getScope3()(); //箭頭函式出現以前會另立變數綁定this位置

// some_module.arrowFunc(); 
// some_module.arrowFunc2()();
// some_module.arrowFuncWithVar();

// const invokeOutside = some_module.getScope; //方法被提取出來global建立一個物件
// console.log(invokeOutside());
// const boundScope = invokeOutside.bind(some_module);
// console.log(boundScope());

// RULES
// func(param) 等价于
// func.call(undefined, param)
// 但在物件底下的方法 this自動被把訂為方法所屬物件 也就是說每一層的函式的 this 都是父層物件
// obj.method(param) 等价于
// obj.method.call(obj, param)



//explicit

var strScope = 'on global',
innerObj = { log: logStr, strScope:'on inner' },
innerObj2 = { log: logStr, strScope: 'on obj'};
function logStr() {
    console.log(this.strScope)
}
// logStr()
// var bound = logStr.bind(innerObj)
// bound()
// bound.call(innerObj2)
// innerObj2.log = bound;
// innerObj2.log();


//arrow
var myString = 'hi global',
    obj = {};
function scope() {
    this.myString = 'hi outer';
    return () => {
        this.myString = 'hi arrow function';
    }
}

// var arrowFunc = scope.call(obj);
// console.log(obj.myString);
// arrowFunc();
// console.log(obj.myString);

//new
function Person(name, age) {
    this.name = name;
    this.age = age;
    // console.log(this);
}
const person1 = new Person('lu',30);





let a = 1;
let b = a;
let test = {
    c:3,
    d:{e:12, f:13}
}

a = 1345;
// let test2 = test;
// test.c = 6;

// SHALLOW COPY
// 1. object.assign
// let test2 = Object.assign({}, test);
// test.d.e = 143524

// 2. spread operators
// let test2 = {...test};
// test.d.e = 143524;

// DEEP COPY
// 1. JSON.parse JSON.stringify
test2 = JSON.parse(JSON.stringify(test))
test.d.e = 143524;
console.log(test2);

// 2. lodash


