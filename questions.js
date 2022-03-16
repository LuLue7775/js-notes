/**
 * Implement curry
 * @param { (...args: any[]) => any } fn
 * @returns { (...args: any[]) => any }
 * 
 *  思路：需要動態決定輸入參數的數量，通常用遞迴
 * 
 */
    function curry(fn) {
        return function curryInner(...args) {
            if (args.length >= fn.length) return fn(...args); //直到全部攤平
            return (...args2) => curryInner(...args, ...args2); //若還有下一層 繼續攤開
            
        };
    }
    
    // const join = (a, b, c, d) => {
    //     return `${a}_${b}_${c}_${d}`
    //  }
    //  const curriedJoin = curry(join)
    // //  console.log(curriedJoin(1, 2, 3, 4)  )// '1_2_3'
    // console.log(curriedJoin(1)(2, 3)(4)) // '1_2_3'
    // // console.log(curriedJoin(1, 2)(3)) // '1_2_3'

/**
 * 思路：需要動態決定輸入參數的數量，通常用遞迴
 * 
 */
    function flat(arr) {
        let result = [];
        arr.forEach(innerItem => {
           if (Array.isArray(innerItem)) {
               result.push(...flat(innerItem))
           } 
           else result.push(innerItem);
        });

        return result;
    }



/**
 * 思路：需要動態決定輸入參數的數量，通常用遞迴
 * 應該返回什麼，才可以被外面使用，並且同時相容於遞迴所需的值
 *      返回函式就是使其能夠被 sum()()這樣用，如果只是返回primitive type 就只能sum()，不能再被呼叫；
 *      又因為要接受任意次數的呼叫，所以返回的函式中又要再叫自己
 *      另外這裡能被外面使用的部分，要能夠被==比較，因此在裡面自訂被轉型過的返回值
 */
    function sum(num) {
        const func = function(num2) {
            return num2 ? sum(num+num2) : num
        }

        // do our custom 'type coercion', 讓外面 sum1(2) == 3可直接比較 
        // 第一次會先來這存取num 因為是回傳func 直到下一個遞迴num才會被
        func.valueOf = () => num; 
        return func;
    }

    // console.log( sum(1)(3) == 4  )
    // const sum1 = sum(1)
    // console.log( sum1(3) == 4  )
    // console.log( sum(5)(-1)(2) == 6 )
    
    
/**
 * 18. Improve a function
 * 思路： 
 * some() every() 可以提早中斷迴圈
 */


    let items = [
        {color: 'red', type: 'tv', age: 18}, 
        {color: 'silver', type: 'phone', age: 20},
        {color: 'blue', type: 'book', age: 17}
    ] 
    // an exclude array made of key value pair
    const excludes = [ 
        {k: 'color', v: 'silver'}, 
        {k: 'type', v: 'tv'}, 
    ] 

    //  but The time complexity is not reduced in this solution.
    function excludeItems2(items, excludes) {
        return items.filter((item) =>
            excludes.every(({k, v}) => item[k] !== v)
        )
    }

    function excludeItems(items, excludes) { 
        let newItems = []
        let del = []
        excludes.forEach( pair => { 
            items.forEach( (item,i ) =>{
                if(item[pair.k] === pair.v) del.push(i);
            })
            newItems = items.filter( (item, i) => !del.includes(i) )
        })
        return newItems
      } 

     excludeItems(items, excludes)



    function excludeItems3(items, excludes) {
  
        // create excludesMap <k: string, v: new Set()>
        const excludesMap = excludes.reduce((map, {k, v}) => {
          if (!map.has(k)) map.set(k, new Set())
          map.get(k).add(v)
          return map
        }, new Map())
        
        return items.filter(item => {
          return !Object.keys(item).some(key => excludesMap.has(key) && excludesMap.get(key).has(item[key]))
        })
    }
/**
 * 148. create-a-counter-object
 * 思路： 大家用get綁定
 * 
 */

    function createCounter() {
        let counter = -1;
        
        const count = () => { counter++ ; return counter}
        return {
            count
        }
    }
      
    const counter = createCounter()
    // console.log(counter.count())
    // console.log(counter.count())

/**
 * 4 ways to Compare Arrays of Objects in Javascript
 * https://codezup.com/difference-compare-arrays-of-objects-in-javascript/
 */






/**
 * implement apply bind call
 * 
 * Call/apply call the function immediately, whereas bind returns a function that, 
 * when later executed, will have the correct context set for calling the original function. 
 * This way you can maintain context in async callbacks and events.
 * 思考重點: this是誰 context是誰 擷取需要的參數
 */

 Function.prototype.bind2 = function (context) {
    const callback = this;
                            // need .call() because arguments is just array-like 
    const currentArguments = Array.prototype.slice.call(arguments, 1); // Dont need the obj context
    return function () {
      const args = Array.prototype.slice.call(arguments);
      callback.apply(context, currentArguments.concat(args))  //柯里化實現
    }
  }

// 還有進階版本如：處理bind需要回傳new建構函數、或是es5-shim版


const person = {  
    name: "James Smith",
    hello: function(thing, t2) {
        console.log(this.name + " says hello " + thing +t2);
    }
}

const helloFunc = person.hello.bind2({ name: "Jim Smith s" });
helloFunc("world");  // output: Jim Smith says hello world"

// ***********************************************************************
// 1. detect if 'this' is a function 
// 2. get arguments after [1]
// 3. make a fn object
// 4. attach 'this' function to the obj newly binded, which is thisArg
// 5. invoke it right away with args got from arguments
Function.prototype.apply2 = function (context) { 
    if (typeof this !== 'function') {
        throw new TypeError('当前调用apply方法的不是函数！')
    }
    
    // 此处与call有区别
    const args = arguments[1]
    
    context = context || window
    
    const fn = Symbol('fn') 
    context[fn] = this //attach 'this' function to the obj newly binded, which is context
    
    const result = context[fn](...args)
    
    delete context[fn]
    
    return result
}

person.hello.apply2({name: "LU WEI"}, ['TAKE', ' ohoh ', 'THAN'] )

Function.prototype.call2 = function (context) { 
    // context是调用call的时候参数中的第一个参数，也就是Food的实例对象
    
    // 先判断当前的甲方是不是一个函数（this就是Product，判断Product是不是一个函数）
    if (typeof this !== 'function') {
        throw new TypeError('当前调用call方法的不是函数！')
    }
    
    // 保存甲方给的参数（args就是 ['cheese', 5]）
    const args = [...arguments].slice(1)
    
    // 确定乙方的类型，因为可以传null和undefined(context就是Food的实例对象)
    context = context || window
    
    // 将甲方的内容保存为乙方的一个属性,为了保证不与乙方中的key键名重复
    const fn = Symbol('fn')
    
    // 这个时候的context就是
    // {
    //    category: 'food',
    //    Symbol(fn): function() { this.name = name, this.price = price }    
    // }
    context[fn] = this //attach 'this' function to the obj newly binded, which is context
    
    // 执行保存的函数,这个时候作用域就是在乙方的对象的作用域下执行，改变的this的指向
    const result = context[fn](...args)
    
    // 执行完删除刚才新增的属性值
    delete context[fn]
    
    // 返回执行结果
    return result
}

/**
 * 
 */
