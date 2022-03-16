const promisify = (item, delay) => {
    return new Promise( (resolve, reject) => {
        if ( item !== 'd' ) {setTimeout( ()=>{ resolve(item) }, delay );}
        else{ reject('failed') } 
    } );
}

const a = () => promisify("a", 100);
const b = () => promisify("b", 5000);
const c = () => promisify("c", 3000);
const d = () => promisify("d", 2000);


async function sequence() {
    const output1 = await a();
    const output2 = await b();
    const output3 = await c();
    return `sequence is done: ${output1} ${output2} ${output3}`;
}

async function parallel() {
    const promises = [a(), b(), c()];
    const [output1, output2, output3] = await Promise.all(promises);
    return `parallel is done: ${output1} ${output2} ${output3}`;
}

async function race() {
    const promises = [a(), b(), c()];
    const output1 = await Promise.race(promises);
    return `race is done: ${output1}`
}
 
//三組裡面都有await 一起開槍 分開回報 
// sequence().then(console.log);
// parallel().then(console.log);
// race().then(console.log);

// 這個細節注意 fast slow在宣告時就已經執行其中function!!!! 
// 是同事開始
async function concurrentStart() {
    console.log('==CONCURRENT START with await==');
    const fast = a() // starts timer immediately
    const slow = b() // starts timer immediately
  
    // 1. Execution gets here almost instantly
    console.log(await slow) // 2. this runs 5 seconds after 1.
    console.log(await fast) // 3. this runs 0.1 seconds after 1., immediately after 2., since fast is already resolved
  }

// concurrentStart();


// Promise.all 若其中有失敗就會短路
// Promise.race
// Promise.allSettled() 不會短路，互相獨立
// Promise.allSettled([ a(), b(), c(), d() ]).then(console.log)

// 另外Promise API 還有（onFulfilled, onRejected）
// 這是屬於Promise的err catch，但已經比較少這樣寫了
// promise(1)
//   .then(res => {
//     console.log(res);
//   }, err => {
//     console.log(err);
//   }).finally(() => {
//     console.log('done');
//   })


// promise可以在外面catch 鍊式會自動取得上個Promise return值作為下次輸入
async function getProcessedData(url) {
    return somePromised(url)
        .catch( err => { return FallbackPromisedData(url) } )
        .then( continueOn =>{ return processDataInWorker( continueOn ) });
}
// 跟上面一樣
async function getProcessedData(url) {
    let continueOn = await somePromised(url)
        .catch( err => {return FallbackPromisedData(url)} ) 
        return processDataInWorker(continueOn)
}

// 但鍊式會造成中間失敗就直接跳到catch
// 所以最好用 try catch finally 讓try專注在成功 catch專注在失敗
const urls = ['url1','url2', 'url3']

const getData = async function() {
    try {
        const result = await Promise.allSettled( urls.map((url)=> fetch(url).then( res => res.json() )  ) )
    } catch(err) {
        console.log(err)
    } finally {
        console.log('done')
    }
}

//Without Promise, use for…of async
const getData2 = async function() {
    try {
        const arrayOfPromises = urls.map(url =>fetch(url));
        for await (let req of arrayOfPromises) {
            const data = await req.json();
        }    
    } catch(err) {
        console.log(err)
    } finally {
        console.log('done')
    }
    
}






/**
 * PROMISE WITH WITH RUCUSION
 * RUN 3 TASKS AT A TIME UNTILL PENDDING TASKS ARE ALL DONE. 
 */

 class handleTask {
    constructor(maxCount) {
        this.maxCount = maxCount;
        this.pendingTask = [];
        this.completed = 0;
        this.count = 0;
    }
    run(tasks) {
        if( this.count < this.maxCount ) { 
            this.count ++;
            tasks().then(() => {
                this.count--;
                this.completed++;
                if(this.pendingTask.length > 0) this.run(this.pendingTask.shift()) 
                //因為tasks會一次全加進來 所以要重新觸發run() 而且同時更新的陣列
                //第四個task的時候會觸發下一個 直到第十個
                console.log('completed: ', this.completed)
             }) 
        } 
        else {
            // console.log('WHEN')
            this.pendingTask.push(tasks); // 上面會先跑 跑了三個會來這 把剩下的tasks加到陣列(剩下七個)
        }
    }


}

//寫一個執行 task 的 function
function task(){
    return new Promise((resolve, reject) => {
        console.log('running')
        setTimeout(resolve(), Math.random()*1000) // 每個 task 所需時間不同，所以這邊用 random
    }).then(() => {
        console.log('done')
    }).catch(() => {
        console.log('error')
    })
  }

let myTask = new handleTask(3);

// for(let i=0; i< 10; i++){ //代替假裝tasks在不定時的時候進來 總之共十個
//   myTask.run(task);
// }





/**
 * run async in sequence with reduce()
 * (concept of pipe() )
 */
function createAsyncTask() {
    const value = Math.floor(Math.random() * 10);
    return function(callback) {
        setTimeout(() => { callback(value); }, value * 1000);
    };
}
  
 function asyncSeries(taskList, callback) {
    var arr = [];
    let tasksCompleted = 0;
    taskList.reduce((accum, current) => {
      return accum.then(someVal => {
        return new Promise((resolve, reject) => {
          current((value) => {
            arr.push(value)
            tasksCompleted++
            if (tasksCompleted === taskList.length) {
              callback.call(null, arr)
            } else {
              resolve(value)
            }
          })
        })
      })
    }, Promise.resolve())
  }

  const tasks1 = [ createAsyncTask(), createAsyncTask(), createAsyncTask(), createAsyncTask() ];

//   asyncSeries(tasks1, (result) => {
//     console.log("AsyncSeries got the results", result)
//   })
  

/**
 * Run promise in parallel
 * 
 */
const runAsyncParallel = (tasks, resultsCallback) => {
    const results = [];
    let tasksCompleted = 0;
    tasks.forEach(task => {
        task(value => {
            results.push(value);
            tasksCompleted++;
             
            if(tasksCompleted >= tasks.length) resultsCallback.call(null,results)
        })
    })

}
const tasks2 = [ createAsyncTask(), createAsyncTask(), createAsyncTask(), createAsyncTask() ];

// runAsyncParallel(tasks2, result => { console.log('AsyncParallel got the results:', result)} )

/**
 * Implement Promise.all()
 * 飛鏢一個個丟，中間失敗會中斷流程
 * Promise.allSettled() 全部settle才執行then 。 settle不論成功失敗
 */
function task(time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () { resolve(time); }, time);
    });
}
const tasks3 = [task(1000), task(5000), task(3000)];

const myPromiseAll = (tasks) => {
    if(!Array.isArray(tasks)) throw new TypeError('This arguments should be an array')

    return new Promise((resolve, reject) => {
        try {
            let resultArr = []
            for(let i=0; i<tasks.length; i++) {
                tasks[i].then(result => { // ================= .race()沒有的就是result的額外處理function
                    resultArray.push(result)  
                    if (resultArr.length === tasks.length) resolve(resultArr)
                }, reject)
            }
        } 
        catch(err) {
            reject(err)
        }
    })
}

myPromiseAll(tasks3)
  .then(results => {
    console.log("got results", results)
  })
  .catch(console.error);


/**
 *  Implement Promise.race()
 *  飛鏢一次全丟出去
 *  Promise.race() 需要有一个 settled 才去继续执行 then
 *  Promise.any() 需要有一个 resolve 才继续执行 then 
 */

const myPromiseRace = (tasks) => {
    if(!Array.isArray(tasks)) throw new TypeError('This arguments should be an array')

    return new Promise((resolve, reject) => {
        try {
            for(let i=0; i<tasks.length; i++) {
                tasks[i].then(resolve, reject)
            }
        } catch(err) {
            reject(err)
        }
    })
}

myPromiseRace(tasks3) 
  .then(results => {
    console.log("got results FROM RACE", results)  // GOT ONLY THE FASTEST
  })
  .catch(console.error);

// const promises = [d(), a(), b(), c(), ];

// function race(promises) {
//     return !promises.length 
//         ? Promise.resolve() 
//         : new Promise((resolve, reject) => {
//             for( const promise of promises) {
//                 // console.log(Promise.)
//                 Promise.resolve(promise)
//                     .then((res)=> console.log(res) )
//                     .catch((err)=>{ throw err })
//                 ;
//             }
//         })
// }

//  race(promises) 

/**
 * 同時多個 **API calls**
 * 
 */

// 1. **for loop**

// only after both the promises(await) gets **resolved**, for loop moves to the next iteration and makes the API call for the next todo item

// 1. `Promise.all` + **.map()**

// `.map()`
//  moves on to the next item as soon as a promise is **returned**. It does not wait until the promise is resolved.

/**
 * throttle promises
 * see PROMISE WITH WITH RUCUSION
 */