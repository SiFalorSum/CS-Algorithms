// /* RADIX SORT */

// function radixSort(arr, radix) {
//     let li = arr.length - 1;
//     let sigdig = getSignificantDigits(arr, radix);
//     let count = new Array(radix), arrOut = new Array(arr.length);
//     count.fill(0);

//     for (let i=0; i<sigdig; i++) {
//         arr.forEach(e => count[getCountIndex(e, radix, i)]++);

//         for (j=1; j<radix; j++) {
//             count[j] = count[j] + count[j-1];
//         }

//         for (j=li; !(j<0); j--) {
//             arrOut[--count[getCountIndex(arr[j], radix, i)]] = arr[j];
//         }

//         count.fill(0);
//         arr = arrOut.slice();
//     }
    
//     return arrOut;
// }

// function getCountIndex(val, radix, i) {
//     return Math.floor(val/Math.pow(radix, i))%radix;
// }

// function getSignificantDigits(arr, radix) {
//     let max = Math.max(...arr);
//     return Math.ceil(Math.log2(max) / Math.log2(radix));
// }

// function mod(num, base) {
//     return ((num % base) + base) % base;
// }

// /* MERGE SORT */

// function mergeSort(arr) {
//     if ( arr.length === 1 ) return arr;

//     let s = Math.floor(arr.length/2);
//     let arr1 = arr.slice(0,s);
//     let arr2 = arr.slice(s);

//     arr1 = mergeSort(arr1);
//     arr2 = mergeSort(arr2);

//     return merge(arr1, arr2);
// }

// function merge(arr1, arr2) {
//     let arrOut = [];

//     while ( arr1.length > 0 && arr2.length > 0 ) {
//         if ( arr1[0] > arr2[0] ) {
//             arrOut.push(arr2.shift());
//         }
//         else {
//             arrOut.push(arr1.shift());
//         }
//     }

//     arrOut.push(...arr1);
//     arrOut.push(...arr2);
//     return arrOut;
// }