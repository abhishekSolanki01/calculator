/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
  - `npm run test-calculator`
*/

class Calculator {
    constructor(){
      this.result = 0
    }
    add (n) {this.result += n}
    subtract (n) {this.result -= n}
    multiply (n) {this.result *= n}
    divide (n) {this.result /= n}
    clear() {this.result = 0}
    getResult () {return this.result}
    isGreaterPriority(o1,o2){
      if(!(["+","-","*","/"].includes(o1) && ["+","-","*","/"].includes(o2))){
        return false
      }
      let o1priority = ["+","-"].includes(o1) ? 1 : 2;
      let o2priority = ["+","-"].includes(o2) ? 1 : 2;
      if(o1priority === o2priority){
        return true
      }else if(o1priority > o2priority){
        return false
      }else{
        return true
      }
    }
    operate(n1, operation, n2){
      switch(operation){
        case "+" : return n1 + n2;
          break;
        case "-" : return n1 - n2;
          break;
        case "*" : return n1 * n2;
          break;
        case "/" : return n1 / n2;
          break;
        default : return null
      }
    }
    getOneDigitOrChar(str, i){
      let a = this.i
      let ch = str.charAt(i);
      while(++i){
       if(!isNaN(str.charAt(i))){
        ch += str.charAt(i);
       }else{
        return ch;
       }
      }
      return ch
    }
    calculate(string){
      // using two stacks - constraint ()
      let str = string.replaceAll(" ", "")
  
      let operationStack = []
      let numberStack = []
      for(let i=0; i<str.length; i++){
        let c = str.charAt(i);
        while(!isNaN(c) && i < str.length-1 && !isNaN(str.charAt(i+1))){
          i++
          c += str.charAt(i);
         }
  
        if(["+", "-", "/", "*"].includes(c)){
          while(operationStack.length>0 && 
            operationStack[operationStack.length-1] !== "(" && 
            this.isGreaterPriority(c,operationStack[operationStack.length-1])
            ){
            let c1 = operationStack.pop()
            let n2 = numberStack.pop();
            let n1 = numberStack.pop();
            let res = this.operate(n1, c1, n2);
            numberStack.push(res);
          }
          operationStack.push(c);
  
        }if(c === "("){
          operationStack.push(c);
        }else if (c === ")"){
          // pop till --> ")"
          while(operationStack[operationStack.length-1] !== "("){
            c = operationStack.pop();
            let n2 = numberStack.pop();
            let n1 = numberStack.pop();
            let res = this.operate(n1, c, n2);
            numberStack.push(res);
          }
          operationStack.pop()
        }if(!isNaN(c)){
          numberStack.push(Number(c))
        }
      }
      while(operationStack.length && operationStack[operationStack.length-1] !== "("){
        let c = operationStack.pop();
        let n2 = numberStack.pop();
        let n1 = numberStack.pop();
        let res = this.operate(n1, c, n2);
        numberStack.push(res);
      }
      operationStack.pop()
      this.result = numberStack[0];
      return { operationStack, numberStack}
    }
  
  }
  
  // let a = new Calculator()
  // // let c = a.calculate("9 +   2 *    (   6 - (4 + 1) / 2) + 7")
  // let c = a.calculate("19 + 7")
  
  // console.log(c);
  
  
  
  module.exports = Calculator;
  