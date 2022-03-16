
    
/**
 * Implement of Reduce 
 * Reduce is just an 'adder' for all types
 * 看作解維，accumulator看成扁平後的目標
 * @param {*} reduceFn todos for the elements we got. 
 * @param {*} accumulator a place to store sum outcome, return this for next level of recusion to use. 
 * @param {*} arr batch of data pending for todo.
 */

//naive version 
const reduce = ( reduceFn, accumulator, arr ) => {
    arr.forEach((item, i ) => {
        accumulator = reduceFn( accumulator, itemcode , i, arr ) // (i, arr) are not used in this case. but standard reduce func has that.
    })
    return accumulator;
}

const add = (acc, val) => acc+val;
console.log(reduce( add, 0, [1,2,3,4] ))

// console.log( ['hello', 'world'].reduce((acc, current)=> acc+current), '')


/**
 * Implement of map 
 * @param {*} fn todos for every elenents we got 
 * @param {*} arr if we'd like to make chainable map func, we'll need to retu
 * 
 * @param {*} arr 
 */
const filter = ( fn, arr ) => {
    arr.reduce((acc, currentVal, i, arr) => fn(currentVal) ? acc.concat(currentVal) : acc , [] )
}

/**
 * 
 * @param {*} arr 
 */
const concat = (arr1, arr2) => arr1.concat(arr2)
const flatten = arr => {
    // arr.reduce((acc, currentVal)=> concat(arr , currentVal) , []  )
    arr.reduce( concat , []  ) //跟上面一樣意思
}

/**
 * Not an optimal solution for palindrome 
 * str.split('') turns a str to an array.
 * Need two pointers, from head and back. head is the val itself, back is arr[arr.length - (1+i)]
 * 
 * @param {*} str 
 * @returns 
 */
const isPalindrome = str => 
    str
    .split('')
    .reduce((acc, val, i, arr) =>  acc && ( val === arr[arr.length - (1+i)] ) , true)

/**
 *  Implement groupBy
 */
const products = [
    { color:'blue', type:'tie'},
    { color:'blue', type:'pants'},
    { color:'red', type:'tie'},    
]
const productsByColor = {
    'blue': [ { color:'blue', type:'tie'}, { color:'blue', type:'pants'},], 
    'red': [ { color:'red', type:'tie'}, ]
}

const groupBy = ( key, arr ) => arr.reduce((acc, product) => 
        ({ ...acc, [product[key]]:
            [product[key]] in acc // check if key exist in cache
            ? acc[ [product[key]] ].concat( product ) 
            : [product] }) 
        , {})

/**
 * Implement Pipeline: sync(normal chain) or async(.then chain)
 * this HOF(asyncPipe) takes dynamic numbers of functions and turn it into one big chain of function
 *        will turn into .then().then().then()
 */

const asyncPipe = (...asyncFns) => x => 
            asyncFns.reduce(
                (acc, currentAsyncFn) => acc.then(currentAsyncFn), 
                Promise.resolve(x)
            )
// const sendInvoiceForUser = asyncPipe(getUser, getOrderForUser, sendInvoices);

/**
 * Optimizing Iteration using reduce 
 */

const isEven = () => {};
const isOdd = () => {};
const addOne = () => {};

//non-optimal iteration
[1,2,3,4].filter(isEven).map(addOne);

//optimal
[1,2,3,4].reduce( (nums, num)=> isOdd(num) ? nums : nums.concat( addOne(num) ) ); // not really correct. concat returns a new arr
[1,2,3,4].reduce( (nums, num)=> isOdd(num) ? nums : (nums.push(addOne(num))) && nums ); 
                                // if left is truthy, then return right operand(nums)
                                // BTW .push returns the length of nums 

/**
 * Partition using reduce. partition means split data based on condition
 * 
 */
const [ passed, notPassed ] = partition( isEven,  [ 6, 57, 68, 23, 7, 73 ]  );
//non-optimal iteration, iterate twice.
const partition = ( partitionFn, arr ) => [ arr.filter(partitionFn), arr.filter( ele => !partitionFn(ele) )]
            
let arr =  [ 6, 57, 68, 23, 7, 73 ] 
const partitioFn = () => {};
arr.reduce( (acc, item) => {
    if( partitioFn(item)) { acc[0].push(item); return acc } 
    
    acc[1].push(item)
    return acc;
}, [ [], [] ])        


/**
 * 1. name with domain logic. dont use generic naming like (acc, val).
 * 2. dont make your reduce() bloated. dont run things unneccesary in there, 尤其這是一個iteration 
 * 3. dont reinvent map() filter() or whatever with .reduce()
 *      use what they're meant for. 
 * 4. remember the EXTRA param(i, arr) in .reduce(acc, currentVal, i, arr). You alreafy have access to index and array. 
 * 5. always use an ac
 * 
 */

/**
 * Build reduce in 2 more ways 
 * 1. Passing the tail
 * 2. Use index as an Incrementor 
 * 
 * an iterable/ an initial value/ a function to return a new accumulator
 */
// 1. Passing the tail 動能是arr越縮越小 tail of a tail直到沒有
const reduce2 = ( fn, acc, arr ) => {
                
    if (arr.length===0) return acc
                    // new acc   head     tail. this arr is getting smaller, so we get to move through data structure(the base case). 
    return reduce(fn,  fn(acc, arr[0]), arr.slice(1) ) //but .slice() creates a new arr, concern of memory.
}
// 2. Use index as an Incrementor 動能是i
const reduce3 = ( fn, acc, arr, i ) =>{
    if( i > arr.length -1 ) return acc

    return reduce( fn, fn(acc, arr[i], i, arr), arr, i+1 )
}

    


/**
 * reduce pipe
 */

/**
 * reduce compose
 */
