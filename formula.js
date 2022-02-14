for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    let allCell = document.querySelector(`.cell[rowAdd="${i}"][colAdd="${j}"]`);
    allCell.addEventListener("blur", (e) => {
      let address = addressBar.value;
      let [cellSelected, cellProp] = activeCell(address);

      let enteredData = cellSelected.innerText;

      // console.log(typeof(enteredData));
      // console.log(typeof(cellProp.value));
      if (enteredData == cellProp.value) return;

      // if data is modified , remove P-C relation, formula empty, update children with the modified data;
      cellProp.value = enteredData;
      removeChildrenFromParent(cellProp.formula);
      cellProp.formula = "";
      updateChildrenCells(address);
    });
  }
}

let formula = document.querySelector(".formula-bar");
formula.addEventListener("keydown", (e) => {
  let inputValue = formula.value;
  if (e.key === "Enter" && inputValue) {
    let address = addressBar.value;
    let [cellSelected, cellProp] = activeCell(address);
    
    //if the formula is changed, break old P-C relation, evaluate formula, add new P-C relation
    if (inputValue !== cellProp.formula) {
      removeChildrenFromParent(cellProp.formula);
    }
    let evaluateValue = evaluateForumula(inputValue);
    
    addChildrenToParent(inputValue);

    setCellUIAndCellProp(evaluateValue, inputValue, address);
    // if the formula gets updated, then children cell value should get updated as well;
    updateChildrenCells(address);
  }
});

// add children to Parent (A1 + A2) -> B1; A1=[B1], A2=[B1];
function addChildrenToParent(formula) {
  let childAddress = addressBar.value;
  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiVal = encodedFormula[i].charCodeAt(0);
    if (asciiVal >= 65 && asciiVal <= 90) {
      let [parentCell, parentCellProp] = activeCell(encodedFormula[i]);
      parentCellProp.children.push(childAddress);
    }
  }
  // console.log(sheetDB);
}

// remove children from the parent.chidren array
function removeChildrenFromParent(formula) {
  let childAddress = addressBar.value;
  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiVal = encodedFormula[i].charCodeAt(0);
    if (asciiVal >= 65 && asciiVal <= 90) {
      let [parentCell, parentCellProp] = activeCell(encodedFormula[i]);
      let idxOfChildren = parentCellProp.children.indexOf(childAddress);
      parentCellProp.children.splice(idxOfChildren, 1);
      console.log(sheetDB);
    }
  }
}

function updateChildrenCells(parentAddress) {
  let [parentCell, parentCellProp] = activeCell(parentAddress);
  let children = parentCellProp.children;

  for (let i = 0; i < children.length; i++) {
    let childrenAddress = children[i];
    let [childCell, childCellProp] = activeCell(childrenAddress);
    let evaluateValue = evaluateForumula(childCellProp.formula);
    setCellUIAndCellProp(evaluateValue, childCellProp.formula, childrenAddress);
    updateChildrenCells(childrenAddress);
  }
}

//evaluate expression in formula bar
function evaluateForumula(formula) {
  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiVal = encodedFormula[i].charCodeAt(0);
    if (asciiVal >= 65 && asciiVal <= 90) {
      let [cellSelected, cellProp] = activeCell(encodedFormula[i]);
      encodedFormula[i] = cellProp.value;
    }
  }
  let decodedFormula = encodedFormula.join(" ");
  return Function("return" + decodedFormula)();
}

function setCellUIAndCellProp(value, formula, address) {
  let [cellSelected, cellProp] = activeCell(address);

  //storage Data change
  cellProp.value = value;
  cellProp.formula = formula;
  //UI change
  cellSelected.innerText = cellProp.value;
}
