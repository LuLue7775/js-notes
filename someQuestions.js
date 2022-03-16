let string = '999999999999';

let numArr = string.split('');

const recursive = function(numArr) {
    var new_numArr = numArr.map((n)=>{ return parseInt(n,10)})

    new_numArr = new_numArr.reduce((sum, num) =>{
        const result = sum+num;
        return result
    } )
    new_numArr = new_numArr.toString().split('');
    if (new_numArr.length !== 1) {console.log(new_numArr); recursive(new_numArr);}
    else return new_numArr
    
    
}
console.log( recursive(numArr) );

// RETURNING UNDEFINED!!!!!!!!!!!!!!


// const recursive = function(numArr) {
//     let new_numArr = numArr.map((n)=>{ return parseInt(n,10)})
//     console.log(new_numArr);

//     new_numArr = new_numArr.reduce((sum, num) =>{
//         const result = sum+num;
//         return result
//     } )

//     new_numArr = new_numArr.toString().split('')
//     console.log(new_numArr)
//     if (new_numArr.length ===1) return;
//     recursive(new_numArr); 
// }
// recursive(numArr)