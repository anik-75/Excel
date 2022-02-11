let rows = 100;
let cols = 26;

let addressRowCont = document.querySelector(".address-row-cont");
let addressColsCont = document.querySelector(".address-cols-cont");
let cellCont = document.querySelector(".cell-cont");


for(let  i = 0; i < rows; i++){
    let row = document.createElement("div");
    row.setAttribute("class", "row-id")
    row.textContent = i+1;
    addressRowCont.append(row);
}

for(let i = 0 ; i < cols; i++){
  let cols = document.createElement("div");
  cols.setAttribute("class", "cols-id");
  cols.textContent = String.fromCharCode(i+65);
  addressColsCont.append(cols);
}

for(let  i = 0; i < rows; i++){
  let cellRow = document.createElement("div");
  cellRow.setAttribute("class", "cell-row")
  for(let  j = 0; j < cols; j++){
    let cell = document.createElement("div");
    cell.setAttribute("class", "cell");
    cell.setAttribute("contenteditable", "true");
    
    // colsAdd and rowAdd for cell and storage identification
    cell.setAttribute("rowAdd", i);
    cell.setAttribute("colAdd", j);

    displayCellSelectedAddress(cell, i, j);
    cellRow.append(cell);
  }
  cellCont.append(cellRow);
}

//display Selected Cell address
let cellSelected = document.querySelector(".cell-selected");
function displayCellSelectedAddress(cell, i, j){
  cell.addEventListener("click", (e)=>{
    let selectedRowAddress = i+1;
    let selectedColAddress = String.fromCharCode(j+65);
    let selectedCellAddress = `${selectedColAddress}${selectedRowAddress}`;
    cellSelected.value = selectedCellAddress;
  })      

}

// default Active Cell
let defaultActiveCell = document.querySelector(".cell");
defaultActiveCell.click();

