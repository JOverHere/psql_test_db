// The second argument/parameter is expected to be a function
function findWaldo(arr, found) {
  // newArray is scoped within findWaldo
  //var newArray =[];
  // later: trying using an array method
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === "Waldo") {
      // 1 - call the function
      // 2 - pushing the result of the function inside of newArray
      //newArray.push(found(arr[i], i))
      found(i);  // execute callback
    }
  }

}

function actionWhenFound(index) {

  console.log(`Found Waldo at ${index}`);
}

findWaldo(["Alice", "Bob", "Waldo", "Winston"], actionWhenFound);
// console.log(actionWhenFound());