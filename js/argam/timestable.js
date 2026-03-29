function createTable(tableData) {
  var table = document.createElement('table');
  var tableBody = document.createElement('tbody');
  table.setAttribute("style","margin-left: auto; margin-right: auto; border-collapse: collapse;");
  table.setAttribute("class","bordertable");

  tableData.forEach(function(rowData) {
    var row = document.createElement('tr');

    rowData.forEach(function(cellData) {
      var cell = document.createElement('td');
      cell.setAttribute("class","argam");
      cell.setAttribute("style","font-size: 20px; border: 1px solid white; padding: 2px;")
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  return table
}

function makeTT() {
    let base = parseInt(document.getElementById('base').value)
    let tableDiv = document.getElementById('table')

    let table = [...Array(base).keys()].map(
        (a) => [...Array(base).keys()].map(
            (b) => toArgamString((a+1) * (b+1), base)
        )
    )

    tableDiv.innerHTML = "";
    tableDiv.appendChild(createTable(table))
}