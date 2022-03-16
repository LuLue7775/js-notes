
/**
 * Implement a Hash Table 
 */

class HashTable {
    constructor(size) {
        this.data = new Array(size);
    }

    _hash(key){
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = ( hash + key.charCodeAt(i) * i ) % this.data.length
        }
        return hash;
    }

    set( key, value ) {
        let address = this._hash(key);
        if( !this.data[address] ) {
            this.data[address] = [];
        }
        this.data[address].push([key, value]);
        return this.data;
    }

    get( key ){
        let address = this._hash(key);
        const currentBucket = this.data[address];
        if( currentBucket.length ) {
            for(let i = 0; i<currentBucket.length; i++) {
                if(currentBucket[i][0] === key ) return currentBucket[i][1];
            }
        }
        return undefined;
    }
}

const myHashTable = new HashTable(2);
myHashTable.set('grapes', 10000);
myHashTable.set('appl', 10000);

myHashTable.get('grapes');

/**
 * Implement Stack and Queue
 */
//LIFO
class Stack {
    constructor(...arg) {
        this.stack = [...arg]
    }
    
    // modifier
    push(...items){
        return this.stack.push(... items)
    }
    pop(...items){
        return this.stack.pop(... items)
    }

    // for elem access
    peek() {
        return this.isEmpty() ? undefined : this.stack[this.size()-1]
    }

    isEmpty() { return this.size==0 }
    size() { return this.stack.length }
}

//FIFO
class Queue {
    constructor(...arg) {
        this.queue = [...arg]
    }

    // modifier
    enqueue(...items) {
        return this.queue.push(... items)
    }
    dequeue(...items) {
        return this.queue.shift()
    }

    // for elem access
    front() {
        return this.isEmpty() ? undefined : this.queue[0]
    }
    back(){
        return this.isEmpty() ? undefined : this.queue[this.size()-1]
    }

    isEmpty() { return this.size==0 }
    size() { return this.queue.length }

}

/**
 * Implement Linked list
 */
class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    insertAtHead(data) { //在最前方插入
        const newNode = new LinkedListNode( data, this.head, this.tail );
        this.head = newNode;
        this.length++;
    }

    insertAtTail(data) { 
        const newNode = new LinkedListNode( data, this.head, this.tail );

        // if(!this.head) { this.head = newNode; this.tail = newNode; } 
        // else {
        //     newNode.prev = this.tail;
        //     this.tail.next = newNode;
        //     this.tail = newNode;
        // }
        this.tail = newNode;
        this.length++;
    }

    traverse() {
        let cur = this.head;
        let rtn_arr = [];
        while( cur !== null ) {
            rtn_arr.push(cur.value);
            cur = cur.next
        }
        return rtn_arr
    }
}

class LinkedListNode {
    constructor(value, next, prev) {
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}

// module.exports = LinkedList

const LL = new LinkedList();
LL.insertAtHead(8);
LL.insertAtHead(6);
LL.insertAtHead(3);
LL.insertAtHead(1);

const LL2 = new LinkedList();
LL2.insertAtHead(9);
LL2.insertAtHead(7);
LL2.insertAtHead(6);
LL2.insertAtHead(2);

// console.log(LL); 
// console.log(LL.traverse());


//====================================
//      Review starts from here
//====================================

/**
 *  Two Sum 
 * # Hash Table 
 * 
 */

let twoSumArr = [2, 7, 11, 15]

function twoSum(arr, target) {
    let cache = {};
    for( let i = 0; i<arr.length; i++ ) {
        if( target - arr[i] in cache ){ return [ i, cache[target-arr[i]] ] }
        else cache[ arr[i] ] = i
    }
}
twoSum(twoSumArr, 9)


/**
 *  Valid Anagram
 * # Hash Table 
 * # 善用字典中加減次數去比對兩筆資料
 */
 anaStr1 = "anagram", anaStr2 = "nagaram"

 function ValidAnagram( str1, str2 ) {
    if( str1.length !== str2.length ) return false;
    
    let cache = {};

    for(let i = 0; i<str1.length; i++ ) {
        if( str1[i] in cache ){ cache[str1[i]] += 1 }
        else cache[ str1[i] ] = 1
    }

    for(let i = 0; i<str2.length; i++ ) {
        // str2的字不在字典中 或 字典中已沒有str2有的字
        if( !str2[i] in cache || cache[ str2[i] ] === 0  ) return false
        else cache[ str2[i] ] -= 1 
    }
    return true
 }
// console.log( ValidAnagram(anaStr1,anaStr2))

/**
 * First Recurring Character
 * # Hash Table 
 */
 let given = [2,5,8,7,3,2,3,2,8,9];

 function firstRecur(arr) {
     let cache = {};
 
     for( let i = 0; i<arr.length; i++ ) {
         if( cache[arr[i]] ){  return arr[i]; }
         else cache[ arr[i] ] = i;
     }   
 }
 // console.log(firstRecur(given));
 

/**
 * LeetCode 206. Reverse Linked List
 * # Linked list
 */
const reverseList = function(head) {
    let preNode = null;
    let curNode = head;
    while(curNode) {
        const nextNode = curNode.next; //先存起來       

        curNode.next = preNode; //將next指向改指前處(鍵打掉)
        preNode = curNode; //向前移動
        curNode = nextNode; //向前移動
    } 
    return preNode;
}
// reverseList(LL.head)

/**
 * LeetCode 24. Swap Nodes in Pairs
 * # Linked list
 * 眼光放在鍵結上
 * dummy是為了回傳一整 保持接在第一個node之前
 */
 const swapPairs = function(head) {
    const dummy = new ListNode(0);
    dummy.next = head;
    let current = dummy; 
    while(current.next && current.next.next) {
        const first = current.next;
        const second = current.next.next;

        first.next = second.next;
        second.next = first;
        current.next = second;

        current = current.next.next;
    }
    return dummy.next
}

/**
 * LeetCode 141. Linked List Cycle
 * solution 1: visited flag
 * solution 2: clock cycle 難處：要處理一些null狀況
 */
const hasCycle1 = function(head) {
    if(!head || !head.next) return false;

    var node = head;
    while(node){
        if(node.flag) return true;
         
        // 標記這個node已經跑過
        node.flag = true;   
        node = node.next;
    }
    return false;
}

const hasCycle2 = function(head) {
    if(!head || !head.next) return false;

    let fastPointer = head.next.next;
    let slowPointer = head.next;
    if(fastPointer == null){
        return false;
    }

    while(fastPointer !== slowPointer) {
        if(!fastPointer.next){
            return false;
        }

        fastPointer = fastPointer.next.next;
        slowPointer = slowPointer.next;

        if (!fastPointer || !slowPointer) return false
    }
    return true
}


/**
 * LeetCode 160. Intersection of Two Linked Lists 找相交node
 * # Linked list
 * 算長度差 誰比較比較長，誰就跳過前面多出的部分 再一起前進同時比對直到是相同node 回傳。
 * 最簡單方法用Hash Table
 *
 */

const getIntersectionNode = function(headA, headB) {
    const diff = getDiff(headA, headB);
    if(diff > 0){
        while(diff > 0){
            headA = headA.next;
            diff--;
        }
    } else {
        // headB比較長，跳過前面多出的部分
         while(diff < 0){
            headB = headB.next;
            diff++;
        }         
    }

    // 毎個節點進行比較
    while(headA !=null){
        if(headA == headB){
            return headA;
        }    
        headA = headA.next;
        headB = headB.next;
    }

    return null;

}

function getDiff(headA, headB) {
    var aLength = 0;
    var bLength = 0;

    while(headA) {
        headA = headA.next;
        aLength++;
    }
    while(headB) {
        headB = headB.next;
        bLength++;
    }
    return aLength - bLength;
}

/**
 * LeetCode 7. Reverse Integer
 * # Linked list
 * 快慢指標
 */

/**
 * LeetCode 203. Remove Linked List Elements
 * # Linked list
 * 移除概念就是nextnext跳過
 */


/**
 * LeetCode 234. Palindrome Linked List
 * # Linked list
 * 快慢指標，快標速度兩倍跑到底時慢標剛好在中間，1.可反轉終點之後的node 和前半段比對 2.或可記長度 
 */



/**
 * LeetCode 2. Add Two Numbers 加法器
 * # Linked list
 * 遞迴
 */

const addTwoNumbers = function(l1, l2) {
    var list = new ListNode(0);
    var result = list;
    var sum, carry = 0;
    
    while(l1 || l2 || carry>0) {
        sum = 0;

        if(l1) {
            sum += l1.val;
            l1 = l1.next;
        }

    }

}



/**
 * LeetCode 21. Merge Two Sorted Lists
 * # Linked list
 * [1,2,2,3] + [1,3] = [1,1,2,2,3,3]
 */

 function ListNode(val) {
    this.val = val;
    this.next = null;
}

var mergeSortedList = function(L1, L2){
   let result = new ListNode(0);
   let curr = result;

   while(L1!==null && L2!==null) {
       if(L1.val > L2.val) {
           curr.next = L2;
           L2 = L2.next;
       } else {
            curr.next = L1;
            L1 = L1.next;
       }
       curr = curr.next;
   }

   // one left might be L1 or L2 
   if(L1!==null) { curr.next = L1; }
   if(L2!==null) { curr.next = L2; }
   return result.next;
}

 /**
 * LeetCode 88. Merge Sorted Array
 * # Array
 * # Bubble Sort
*/  

function MergeSortedArr( arr1, arr2 ) {
    //將nums2裡面的值放在nums1
    for(var i = 0 ; i < arr2.length ; i++){
        arr1.push( arr2[i] )
    }
    
    for(var j = 0 ; j < arr1.length - 1 ; j++){
        for(var k = j + 1 ; k < arr1.length ; k++){
            if(arr1[j] > arr1[k]){ // j k 數值對調
                var temp = arr1[j];
                arr1[j] = arr1[k];
                arr1[k] = temp;
            }
        }
    }

    return arr1;
};

// console.log(MergeSortedArr([1,1,2,4,6] , [2,3,7] ))
  

/**
 * LeetCode 83. Remove Duplicates from Sorted List
 * # Linked list
 * Given 1->1->2, return 1->2.
 * Given 1->1->2->3->3, return 1->2->3.
 */

var delDuplicatesList = function(head) {
    let curr = head;
    while( curr && curr.next ) {
        if( curr.value === curr.next.value ){ 
            curr.next = curr.next.next
        };
        curr = curr.next
    }
    // return
}
delDuplicatesList(LL.head)
// console.log(LL.traverse());

/**
 * LeetCode 26. Remove Duplicates from Sorted Array
 * # Array
 * 不能使用其他的陣列空間，必需在本來的陣列中操作
 * Your function should return length = 2, with the first two elements of nums being 1 and 2 respectively. 
 * It doesn't matter what you leave beyond the new length.
 * 
 * 要能夠想出用count來當指標，反正也要返回length
 */

function delDuplicatesArr(arr) {
    if( arr.length || !arr ) return 0
    if( arr.length === 1 ) return 1;

    var cnt = 0;
    for( let i=1; i<arr.length; i++) {
        if( arr[cnt] !== arr[i] ){
             cnt++;
             arr[cnt] = arr[i];
        }
    }
    return ++cnt

}

/**
 * LeetCode 20. Valid Parentheses
 * # Stack 
 * # Hash Table
 */

const isValid = function(str) {
    if(!str) return true;

    var stack = []
    const left = ['(', '[', '{'];
    const right = [')', ']', '}'];
    const match = {
        ')':'(',
        ']':'[',
        '}':'{'
    }

    for ( let i in str ) {
        if ( left.indexOf(str[i]) > -1 ) stack.push(str[i]);

        if ( right.indexOf(str[i]) > -1 ) {
            if( match[right[str[i]]] === stack[-1] ) stack.pop();
            else return false;
        }
    }
    return true
}



/**
 * LeetCode 100. Same Tree
 * # Binary Tree
 */

const isSameTree = function(p,q){
    if(!p && !q) return true;

    if(!p && q || p && !q) return false;

    if(p.val !== q.val) return false;

    return isSameTree(p.right, q.right) && isSameTree(p.left, q.left)
}

/**
 * LeetCode 110. Balanced Binary Tree
 * # Binary Tree
 */
const isBalancedTree = function(root) {
    if(!root || (!root.right && !root.left)) return true;

    var dL = findDepth(root.left);
    var dR = findDepth(root.right);

    var diff = Math.abs(dL-dR) <= 1; 
    
    //如果深度差超過1, return false
    //深度沒差超過1，傳入左右節點繼續判斷 因為子node裡面左右節點不見得平衡 ******** 要注意
    return diff && isBalancedTree(root.left) && isBalancedTree(root.right); 
}

function findDepth(root) {
    if(!root) return 0;
    var depthL = 1+findDepth(root.left); 
    var depthR = 1+findDepth(root.right);

    return depthL > depthR ? depthL : depthR;
}


/**
 * LeetCode 104. Maximum Depth of Binary Tree
 * # Binary Tree
 */
const maxDepth = function(root) {
    return findDepth(root);
    
    function findDepth(root) {
        if(!root) return 0;
        var depthL = 1+findDepth(root.left);
        var depthR = 1+findDepth(root.right);
    
        return depthL > depthR ? depthL : depthR;
    }
}

/**
 * LeetCode 226. Invert Binary Tree
 * # Binary Tree
 */

const invertTree = function(root) {
    if(!root || !root.right && !root.left) return root

    var nodeL = root.left
    root.left = invertTree(root.right)
    root.right = invertTree(nodeL)

    return root

}

/**
 * LeetCode 102. Binary Tree Level Order Traversal
 * # Binary Tree
 */

const levelOrder = function(root) {
    if(!root || root.length === 0 ) return []

    var map = {};
    var waitlist = [ { level:0, node:root } ]
    while(list.length) {
        var current = waitlist.pop();
        var node = current.node;

        if(!map[current.level]) map[current.level] = [node.val];
        else map[current.level].push(node.val);

        // 有子節點放入待處理清單，注意right要先放，因為上面是抓最後一個放入的節點處理，left後放才會被先處理
        if(node.right) waitlist.push({level:current.level+1, node:node.right});
        if(node.left) waitlist.push({level:current.level+1, node:node.left});
    }

    var result = [];
    for(let i in map) result.push(map[i]);
    return result;
    
}



//========================================
//   Dynamic Programming
//========================================

/**
 * Unique Path
 */

/**
 * House Robber
 */




//========================================
//   Array & String 活用JS Methods
//========================================

/**
 * LeetCode 283. Move Zeroes
 * # Array
 */
const moveZeros = function(arr){
    if(!arr.length) return

    var cnt = 0
    for(let i=0; i<arr.length; i++) {
        if( arr[i] === 0 ) {
            cnt++;
            arr.splice(i, 1)
        }
    }
    while(cnt) {
        arr.push(0);
        cnt--;
    }
    return arr
}
// console.log(moveZeros([1,3,6,0,3,0,6,9])) 

/**
 * LeetCode 27. Remove Element
 * # Array
 */
const removeElement = function(nums, val) {
    if(!nums.length) return nums.length
    if(nums.indexOf(val) < 0) return nums.length;

    while (nums.includes(val)){
        nums.splice(nums.indexOf(val),1);
    }
    console.log(nums)
    return nums.length
}
// console.log(removeElement( [0,1,2,2,3,0,4,2], 2 ))

/**
 * LeetCode 169. Majority Element
 * # Array
 * # Hash Table
 */

 const majorityElement = function(nums) {
    if (nums.length === 1) return nums[0];

    const cache = {}

    for( let i=0; i<nums.length; i++) {
        if (!nums[i] in cache){ 
            cache[nums[i]] = 1
        } else {
            cache[nums[i]]++;

            if ( cache[nums[i]] >= nums.length/2 ) return nums[i]
        }
    }
 }

/**
 * LeetCode 349. Intersection of Two Arrays
 * # Array
 */

 var intersection = function(nums1, nums2) {
    var result = [];
    if(nums1.length > nums2.length) {var store = nums1; var toCheck = num2}
    else {var store = nums2; var toCheck = num1}

    for(let i = 0; i<toCheck.length; i++) {
        let num = toCheck[i];
        if( store.indexOf(num) !== -1 && result.indexOf(num) === -1 ) {
            result.push(num)
        }
    }
    return result

 }

 /**
 * LeetCode 350. Intersection of Two Arrays II
 * # Array
 * 比長度部分是為了最佳化
 */
 var intersection2 = function(nums1, nums2) {
     var result = []
     if (nums1.length > nums2.length) { 
         var store = nums1
         var toCheck = nums2
     } else {
        var store = nums2
        var toCheck = nums1
     }

     for(let i in toCheck) {
         if(store.includes(toCheck[i])){  
            store.splice(store.indexOf(toCheck[i]),1)
            result.push(toCheck[i])
        }
     }
     return result
 }
// console.log( intersection2([3,1,2], [1,1]) )

/**
 * LeetCode 58. Length of Last Word
 */

 const lengthOfLastWord  = function(str) {
    if (str.length === 0) return 0; 

    let words = [];
    for(let word of str.split(' ')) {
        words.push(word)
    }

    while(words.length>0) {
        let word = words.pop();
        if(word.length>0) return word.length;
    }
    return 0
}
// js找陣列最後一元素: words[words.length-1]

// console.log(lengthOfLastWord("Hello World ")) //空白的length是0

/**
 *  Reverse a String
 *  # String
 *  # 字串進loop處理請一律split 避免未初始化的undefined狀態
 */
 let revStr = 'hello'

 function ReverseStr( str ) {
     var newStr = '';
     var s = str.split('')
     for(let i=s.length-1; i>=0; i--) {
         newStr += s[i]
     }
     return newStr
 }
 // console.log(ReverseStr(revStr))
 
 
 /**
  * Capitalization
  * # String
  */
 
 const Capitalize = sentense => {
     const words = [];
 
     for( let word of sentense.split(' ') ) {
         words.push(word[0].toUpperCase() + word.slice(1))  // slice擷取第一個字之後的字元
     }
     return words.join(' ')
 }
 
//  console.log(Capitalize('You may assume that the array is non-empty.'))

/**
 * a-z appear at least once in a str
 * # String
 */
function isPangram(string){
    var s = string.split('')
    var cache = {}
    var cnt = 0

    for(let i=0; i<s.length; i++) {
      if(s[i] in cache) cache[s[i]]++
      else {
          if( s[i].match(/[a-z]/i) ) {
            cache[s[i]] = 1
            cnt++
          }
        }
    }

  //   for(let i in cache) if()
    if(cnt>=26) return true
    return false
  }
  
// console.log(  isPangram('The quick brown fox jumps over the lazy dog.') )

/**
 * LeetCode 290. Word Pattern
 * # String
 */

var wordPattern = function(pattern, str) {
    var patternMap = {}; // {a:'', b:''}
    var strMap = {}; // {dog:'', cat:''}
    var words = str.split(/\s/)
    
    if(pattern.length !== words.length) return false;
    
    for( let i in pattern ){
        //需要pattern和str兩個方面檢查，避免不同pattern有相同str(或反之)

        if( !patternMap[pattern[i]] ) {
            patternMap[pattern[i]] = words[i]
        } else if ( patternMap[pattern[i]] !== words[i] ){ return false}

        if( !strMap[words[i]] ) {
            strMap[words[i]] = pattern[i]
            console.log(strMap[words[i]], pattern[i]);
        } else if ( strMap[words[i]] !== pattern[i] ){console.log(strMap[words[i]], pattern[i]); return false}
        
    }
    console.log(patternMap);

    return true;
};

// console.log(wordPattern('abba', 'dog cat cat dog'))
// console.log(wordPattern('abba', 'dog cat cat fish'))
// console.log(wordPattern('abba', 'dog dog dog dog'))

/**
 * LeetCode 205. Isomorphic Strings
 * # String
 * 
 */

var isIsomorphic = function(s, t) {
    var sMap = {}
    var tMap = {}

    for(let i in s) {
        if(!sMap[s[i]]){ sMap[s[i]] = t[i] }
        else if(sMap[s[i]]) {
            if( sMap[s[i]] !== t[i] ) return false
        }
    }
    
    for(let i in t) {
        if(!tMap[t[i]]){ tMap[t[i]] = s[i] }
        else if(tMap[t[i]]) {
            if( tMap[t[i]] !== s[i] ) return false
        }
    }
    return true
}


/**
 * LeetCode 118. Pascal's Triangle
 * # Array
 * thisRow作為暫存陣列
 */
 var generate = function(numRows) {
    if(!numRows) return []

    var triangle = [[1]]
    for( let i=1; i<numRows; i++) {
        var prevRow = triangle[i-1];
        var thisRow = [1];

        for(let j=1; j<=i; j++) {
            var firstNum = prevRow[j-1];
            var secondNum = prevRow[j] ? prevRow[j] : 0;
            thisRow.push( firstNum + secondNum ) 
        }
        triangle.push(thisRow)
    }
    return triangle
}

// console.log(generate(5))
/**
 *　LeetCode 219. Contains Duplicate II
 * # Array
 * 有點陷阱 只要"其一"數字符合絕對距離<=k 就通過
 */
 var containsNearbyDuplicate = function(nums, k) {
     if(nums.length <= 1) return false
     
     var cache = {}
     for( let i in nums) {
        if(cache[nums[i]] && ( i-cache[nums[i]] <= k ) ){  
            return true
        }
        cache[nums[i]] = i
         
     }
     return false
 }
//  console.log(containsNearbyDuplicate([1,0,1,1], 1))


/**
 * LeetCode 119. Pascal's Triangle II
 * # Array
 */
var getRow = function(rowIndex) {
    // if(!rowIndex) return []

    var triangle = [[1]]
    var thisRow = [1]
    for(let i=1; i<=rowIndex; i++){
        var prevRow = triangle[i-1]
        for( let j=1; j<=i; j++) {
            var first = prevRow[j-1];
            var second = prevRow[j] ? prevRow[j] : 0;
            thisRow.push( first + second );
        }
        triangle.push(thisRow)
        thisRow = [1]
    }
    return triangle[rowIndex]
}
// console.log(getRow(0))



/**
 * LeetCode 345. Reverse Vowels of a String
 * # String
 * 雙指標解法！
 */
 var reverseVowels = function(s) {
    const check = 'aeiouAEIOU';
    let pos = 0;
    let sLast = s.length - 1 ;
    const sArr = s.split('');

    while(pos < sLast) {
        if(check.indexOf(sArr[pos]) === -1) {
            pos++;
        }
        if(check.indexOf(sArr[sLast]) === -1){
            sLast--;
        }

        if( check.indexOf(sArr[pos])>-1 && check.indexOf(sArr[sLast])>-1) {
            [sArr[pos], sArr[sLast]] = [sArr[sLast], sArr[pos]]
            pos++;
            sLast--;
        }
    }
    return sArr.join('')
 }
console.log(reverseVowels('because'))


/**
 * LeetCode 38. Count and Say
 */

/**
 * LeetCode 58. Length of Last Word
 */

/**
 * LeetCode 14. Longest Common Prefix
 */

/**
 * LeetCode 67. Add Binary
 */

/**
 * LeetCode 28. Implement strStr()
 */

/**
 * LeetCode 6. ZigZag Conversion
 */

/**
 * LeetCode 125. Valid Palindrome
 */

/**
 * LeetCode 165. Compare Version Numbers
 */

/**
 * LeetCode 8. String to Integer (atoi)
 */