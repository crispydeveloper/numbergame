const fs = require("fs");

const MAX_VAL = 5;
const MAX_OPS = 2;
const ops = ["+", "-", "*", "/"];
let finalResults = [];

function solve() {
  // Get all possible equations
  for (let i = 0; i < MAX_VAL; i++) {
    addOp([i + 1], MAX_OPS);
  }
  // Calculate if each one is solvable
  for (let eqArr of finalResults) {
    // Need to disregard operator precedence, since something like 8 - 7 + 7 / 2
    // would be considered unsolvable since the divide happens first
    let answer = eval(eqArr.join(" "));
    eqArr.push(Math.round(answer * 100) / 100); // Display max 2 decimal places
    // Equation is solvable if answer is whole and between 1 and 10
    if (answer % 1 === 0 && answer > 0 && answer <= 10) {
      eqArr.push("SOLVABLE");
    } else {
      eqArr.push("NO SOLUTION");
    }
  }
}

// Does some recursive thing that I don't understand
// Probably really inefficient
function addOp(prev, maxOps) {
  if (maxOps < 1) {
    finalResults.push(prev);
  } else {
    for (let op of ops) {
      for (let i = 0; i < MAX_VAL; i++) {
        addOp([...prev, op, i + 1], maxOps - 1);
      }
    }
  }
}

// Do the thing
solve();

// Print out how many equations are solvable and not
let solvables = 0;
let noSolutions = 0;
finalResults.forEach(result => {
  let isSolvable = result[result.length - 1];
  if (isSolvable === "SOLVABLE") {
    solvables++;
  } else {
    noSolutions++;
  }
});
console.log("SOLVABLE EQUATIONS:", solvables);
console.log("UNSOLVABLE EQUATIONS:", noSolutions);

// Save results in CSV format
let file = fs.createWriteStream("solutions.csv");
finalResults.forEach(eqArr => {
  // Only print solvable equations
  file.write(eqArr.join(",") + "\n");
  // if (eqArr[eqArr.length - 1] === "SOLVABLE") {
    
  // }
});
file.end();
