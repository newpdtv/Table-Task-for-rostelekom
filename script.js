class Table {
	constructor(data, element, addRowMassive) {
		this.data = data
		this.element = element
		//addRowMassive - массив с данными, которые передаются в метод AddRow
		this.addRowMassive = addRowMassive
	}
	RenderTable(data, element) {
		let myTable = this.element;
		//создание таблицы и заголовков
    	let table = document.createElement('table');
    	const thead = document.createElement('thead');
		const theadRow = document.createElement('tr');
		const propNames = Object.getOwnPropertyNames(this.data[0]);
		propNames.forEach(propName => {
			const th = document.createElement('th');
			th.textContent = propName;
			theadRow.appendChild(th);
		});
		thead.appendChild(theadRow);
		table.appendChild(thead);
		//создание столбцов и ячеек
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
	AddRow(element, addRowMassive) {
		let Table = this.element;
		//создание новых ячеек, столбцов, их заполнение
		this.addRowMassive.forEach(emp => {
        let new_row = document.createElement('tr');
        Object.values(emp).forEach(text => {
        let cell = document.createElement('td');
        let textNode = document.createTextNode(text);
        cell.appendChild(textNode);
        new_row.appendChild(cell);	
        	})
        //создание кнопки с функцией, которая удаляет ближайший new_row
        let delete_button = document.createElement("button")
        delete_button.innerHTML = "Delete"
        delete_button.onclick = function() {
        	new_row.closest("tr").remove()
        }
        new_row.appendChild(delete_button)
        Table.appendChild(new_row);
        })
	}
}

let myMainTable = new Table(
	[
		{Pet: 'Собака', Name: 'Тузик'},
		{Pet: 'Собака', Name: 'Барон'},
		{Pet: 'Кот', Name: 'Мурзик'}
	], document.getElementById('container-table-with-init-data'), 
	[{Pet: "Птица", Name: "Антон"}]);

//кнопки, вызывающие render и addrow методы
let  render_button = document.createElement( "button" )
const text = document.createTextNode( "Render" )
render_button.appendChild( text )                  
document.body.appendChild( render_button )

render_button.onclick = function() {
	myMainTable.RenderTable()
}

let add_button = document.createElement( "button" )
const text_for_add = document.createTextNode( "Add Row" )
add_button.appendChild(text_for_add)                  
document.body.appendChild(add_button)

add_button.onclick = function() {
	myMainTable.AddRow()
}
