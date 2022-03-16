const closure1 = (function(){
    var v = 0
    return () => {
        return v++
    }
}())

for(let i = 0; i<10; i++) {
    closure1()
}

// console.log(closure1())

const closure2 = () => {
    var arr = []
    var i 
    
    for( i = 0; i<10; i++) { 
        arr[i] = () => console.log(i) //arr中的十個function共同指向同一個i 被做了十次
    }
    
    return arr[0]
}
// closure2()()


var fn = null
const closure3 = () => {
    var a = 2
    function innerFunc() {
        console.log(a)
    }
    fn =  innerFunc
}
const bar = () => {
    fn()
}

// console.log(fn)
// closure3()   // innerFunc 將a保留下來了
// console.log(fn) 
// bar()


var fn = null
const foo = () => {
    var a = 2 
    function innerFunc() {
        console.log(c) // c 不在作用域鏈上
        console.log(a)
    }
    fn =  innerFunc
}

const bar2 = () => {
    var c = 100
    fn()
}

