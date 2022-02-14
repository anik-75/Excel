let sheetDB = [];

for (let i = 0; i < rows; i++) {
  let sheetRow = [];
  for (let i = 0; i < cols; i++) {
    let sheetCellProp = {
      bold: false,
      italic: false,
      underline: false,
      alignment: "left",
      fontSize: "14",
      fontFamily: "monospace",
      fontColor: "#000000",
      bgColor: "#ffffff",
      value : "",
      formula : "",
      children:[],
    };
    sheetRow.push(sheetCellProp);
  }
  sheetDB.push(sheetRow);
}

//Selectors for cell properties
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let alignment = document.querySelectorAll(".alignment");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];
let fontSize = document.querySelector(".cell-props-size");
let fontFamily = document.querySelector(".cell-props-font");
let fontColor = document.querySelector(".font-color");
let BGColor = document.querySelector(".background-color");

let addressBar = document.querySelector(".cell-selected");

//active color prop
let activeColorProp = "#d1d8e0";
let inactiveColorProp = "#ecf0f1";

// attach listener on cell properties
bold.addEventListener("click", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);

  cellProp.bold = !cellProp.bold; //Data change

  // UI change
  cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
  bold.style.backgroundColor = cellProp.bold
    ? activeColorProp
    : inactiveColorProp;
});

italic.addEventListener("click", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);

  cellProp.italic = !cellProp.italic; //Data change

  // UI change
  cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
  italic.style.backgroundColor = cellProp.italic
    ? activeColorProp
    : inactiveColorProp;
});

underline.addEventListener("click", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);

  cellProp.underline = !cellProp.underline; //Data change

  // UI change
  cell.style.textDecoration = cellProp.underline ? "underline" : "normal";
  underline.style.backgroundColor = cellProp.underline
    ? activeColorProp
    : inactiveColorProp;
});

fontSize.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);

  //Modification
  cellProp.fontSize = fontSize.value;
  cell.style.fontSize = cellProp.fontSize + "px";
  fontSize.value = cellProp.fontSize;
});

fontFamily.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);

  //Modification
  cellProp.fontFamily = fontFamily.value;
  cell.style.fontFamily = cellProp.fontFamily;
  fontFamily.value = cellProp.fontFamily;
});

fontColor.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);

  //Modification
  cellProp.fontColor = fontColor.value;
  cell.style.color = cellProp.fontColor;
  fontColor.value = cellProp.fontColor;
});

BGColor.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);

  //Modification
  cellProp.bgColor = BGColor.value;
  cell.style.backgroundColor = cellProp.bgColor;
  BGColor.value = cellProp.bgColor;
});

alignment.forEach((alignEle) => {
  alignEle.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activeCell(address);

    let alignValue = e.target.classList[0];
    //Modification
    cellProp.alignment = alignValue; //Data change
    cell.style.textAlign = cellProp.alignment; //UI change

    switch (alignValue) {
      case "left":
        leftAlign.style.backgroundColor = activeColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp;
        rightAlign.style.backgroundColor = inactiveColorProp;
        break;

      case "center":
        leftAlign.style.backgroundColor = inactiveColorProp;
        centerAlign.style.backgroundColor = activeColorProp;
        rightAlign.style.backgroundColor = inactiveColorProp;
        break;

      case "right":
        leftAlign.style.backgroundColor = inactiveColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp;
        rightAlign.style.backgroundColor = activeColorProp;
        break;
    }
  });
});

let allCells = document.querySelectorAll(".cell");
for (let i = 0; i < allCells.length; i++) {
  addListenerToAttachCellProperites(allCells[i]);
}

function addListenerToAttachCellProperites(cell) {
  cell.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [rowAdd, colAdd] = decodeRowAddColAdd(address);
    let cellProp = sheetDB[rowAdd][colAdd];

    //Apply cell Properties
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
    cell.style.textDecoration = cellProp.underline ? "underline" : "normal";
    cell.style.fontSize = cellProp.fontSize + "px";
    cell.style.fontFamily = cellProp.fontFamily;
    cell.style.color = cellProp.fontColor;
    cell.style.backgroundColor = cellProp.bgColor;
    cell.style.textAlign = cellProp.alignment; //UI change

    // cellProp container UI change

    bold.style.backgroundColor = cellProp.bold
      ? activeColorProp
      : inactiveColorProp;
    italic.style.backgroundColor = cellProp.italic
      ? activeColorProp
      : inactiveColorProp;
    underline.style.backgroundColor = cellProp.underline
      ? activeColorProp
      : inactiveColorProp;
    fontSize.value = cellProp.fontSize;
    fontFamily.value = cellProp.fontFamily;
    fontColor.value = cellProp.fontColor;
    BGColor.value = cellProp.bgColor;

    switch (cellProp.alignment) {
      case "left":
        leftAlign.style.backgroundColor = activeColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp;
        rightAlign.style.backgroundColor = inactiveColorProp;
        break;

      case "center":
        leftAlign.style.backgroundColor = inactiveColorProp;
        centerAlign.style.backgroundColor = activeColorProp;
        rightAlign.style.backgroundColor = inactiveColorProp;
        break;

      case "right":
        leftAlign.style.backgroundColor = inactiveColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp;
        rightAlign.style.backgroundColor = activeColorProp;
        break;
    }

    let formulaBar = document.querySelector('.formula-bar');
    formulaBar.value = cellProp.formula;
    cell.value = cellProp.value;
  });
}

function activeCell(address) {
  let [rowAdd, colAdd] = decodeRowAddColAdd(address);

  // access cell and Storage object
  let cell = document.querySelector(
    `.cell[rowadd = "${rowAdd}"][colAdd = "${colAdd}"]`
  );
  let cellProp = sheetDB[rowAdd][colAdd];

  return [cell, cellProp];
}

// row address and col address
function decodeRowAddColAdd(address) {
  let rowAdd = Number(address.slice(1) - 1);
  let colAdd = Number(address.charCodeAt(0) - 65);

  return [rowAdd, colAdd];
}
