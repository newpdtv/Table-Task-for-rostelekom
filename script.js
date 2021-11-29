class Table {
	_data = [];
	get data() {
		return this._data;
	}
	// делаем в виде геттеров/сетторов чтобы при изменении данных таблица перерисовывалась
	set data(arrObjs) {
		if (!arrObjs || !arrObjs.length) {
			console.error('Передайте массив с минимум одним объектом');
			return;
		}
		this._data = arrObjs;
		this.RenderTable();
	}
	insertTag;

	// data и element необязательные параметры
	constructor(data, element) {
		// Если передали данные то заполняем их
		if (data) {
			this._data = data;
		}
		// если есть и тег и данные то рисуем таблицу
		if (data && element) {
			this.insertTag = element;
			this.RenderTable(element);
		}
	}

	// element необязательный параметр
	RenderTable(element) {
		// если не передали элемент куда должна вставляться таблица и не определен элемент куда вставлять в классе, то ошибку в консоль
		if (!element && !this.insertTag) {
			console.error('Не передан элемент куда будет вставлена таблица');
			return;
		}

		if(!this.data || !this.data.length) {
			console.error('Отсутствуют данные для таблицы');
			return;
		}
		// Определяем куда будет вставляться таблица в зависимости от того какие теги у нас есть
		const insertTag = element || this.insertTag;
		const table = document.createElement('table');

		// создаем заголовок таблицы
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

		// создаем тело таблицы с данными
		const tbody = document.createElement('tbody');
		this.data.forEach(row => {
			const tr = document.createElement('tr');
			propNames.forEach(propName => {
				const td = document.createElement('td');
				td.textContent = row[propName];
				tr.appendChild(td);
			});
			tbody.appendChild(tr);
		});
		table.appendChild(tbody);
		// удаляем старую таблицу если есть
		if (insertTag.lastChild) {
			insertTag.removeChild(insertTag.lastChild);
		}
		insertTag.appendChild(table);
	}

	AddRow(obj) {
		if (!obj) {
			console.error('Не переданы данные для новой строки');
			return;
		}

		this._data.push(obj);
		this.RenderTable();
	}

	DeleteRow(index) {
		if (!index) {
			console.error('Не передан индекс удаляемой строки');
			return;
		}

		// удаляем строку с переданным индексом и перерисовываем таблицу
		this._data.splice(index, 1);
		this.RenderTable();
	}

	UpdateRow(index, obj) {
		if (typeof(index) !== 'number' || !obj) {
			console.error('Не передан индекс или объект для обновления');
			return;
		}
		if (index > this._data.length - 1 || index < 0) {
			console.error('Индекс вне массива');
			return;
		}

		// заменяем строку с переданным индексом и перерисовываем таблицу
		this._data[index] = obj;
		this.RenderTable();
	}
}


const myMainTable = new Table(
	[
		{Pet: 'Собака', Name: 'Тузик'},
		{Pet: 'Собака', Name: 'Барон'},
		{Pet: 'Кот', Name: 'Мурзик'}
	],
	document.getElementById('container-table-with-init-data')
);
myMainTable.data = [{Pet: 'Собака', Name: 'Барон'},
{Pet: 'Кот', Name: 'Мурзик'}];

const secondTable = new Table();
secondTable.insertTag = document.getElementById('container-table-second');
secondTable.data = [{City: 'Краснодар', People: 132130, ZIP: 333000}, {City: 'Москва', People: 34534534, ZIP: 133400}, {People: 213321, City:'Питер', ZIP: 322020}];

const thirdTable = new Table([
	{
		Animal: 'Птица', CanFly: 'Да'
	},
	{
		Animal: 'Собака', CanFly: 'Нет'
	}
]);
thirdTable.RenderTable(document.getElementById('container-table-third'));