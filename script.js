class Table {
	constructor(pet, name, tableid, data) {
		this.data = 
			[{pet: "Cat", name: 'Murzik'},
    		{pet: "Frog", name: 'Franz'},
    		{pet: "Turtle", name: 'Dmitry'},
    		{pet: "Dog", name: 'Bobik' }]
		this.pet = pet
		this.name = name
		this.tableID = tableid
	}
	AddRow(tableid, pet, name) {
		const tableRef = document.getElementById(tableid)
		const newRow = tableRef.insertRow(1)
		const newCell_pet = newRow.insertCell(0)
		const newCell_name = newRow.insertCell(1)
		const newText_pet = document.createTextNode(this.pet)
		const newText_name = document.createTextNode(this.name)
		newCell_pet.appendChild(newText_pet)
		newCell_name.appendChild(newText_name)
	}
	DeleteRow(tableid) {
		try{
			let deletable_row = window.prompt("Какую именно строку необходимо удалить? Отсчёт идёт с нуля.", "0")
			document.getElementById(tableid).deleteRow(deletable_row)
		} catch {
			alert("Данная строка не существует")
		}	
	}
	UpdateRow(tableid) {
		let rowNumber = window.prompt("Введите номер строки, начиная с 0", "0")
		let cellNumber = window.prompt("Введите номер колонки, начиная с 0", "0")
		let newData = window.prompt("Введите новые данные")  
		let x = document.getElementById(tableid).rows[parseInt(rowNumber, 10)].cells
		x[parseInt(cellNumber, 10)].innerHTML = newData
	}
	RenderTable(data){
		let myTable = document.querySelector('#table');
		let headers = ['Pet', 'Name'];
    	let table = document.createElement('table');
    	let headerRow = document.createElement('tr');
    	headers.forEach(headerText => {
        let header = document.createElement('th');
        let textNode = document.createTextNode(headerText);
        header.appendChild(textNode);
        headerRow.appendChild(header);
    	});
    	table.appendChild(headerRow);
    	this.data.forEach(emp => {
        let row = document.createElement('tr');
        Object.values(emp).forEach(text => {
        let cell = document.createElement('td');
        let textNode = document.createTextNode(text);
        cell.appendChild(textNode);
        row.appendChild(cell);
        })
        table.appendChild(row);
    });
    myTable.appendChild(table);
	};
}

let mytable = new Table("Turtle", "Dima", "table1")

function DeleteRow() {
	mytable.DeleteRow("table1")
}

function UpdateRow() {
	mytable.UpdateRow("table1")
}

function AddRow() {
	mytable.AddRow("table1")
}

function RenderTable() {
	mytable.RenderTable()
}