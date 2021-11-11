class Column {
  constructor(name, type, required = false) {
    this.name = name;
    this.type = type;
    this.required = required;
  }
}

class Table {
  columns = []
  records = []

  constructor(name, columns) {
    this.name = name
    this.columns = columns
  }

  insertRecords(record) {
    if (this.isInsertValid(record)) {
      this.records.push(record)
    }
  }

  isInsertValid(record) {
    let total = 0
    for (let attribute in record) {
      for (let column of this.columns) {
        if (attribute === column.name) {
          if (column.type !== typeof record[attribute]) {
            console.log(`Record not inserted. ${column.name} is ${column.type} and you are trying to insert as ${typeof record[attribute]}`)
            return false
          }
          total++
        }
        if (column.required && !record[column.name]) {
          console.log(`Record not inserted. ${column.name} is required`)
          return false
        }
      }
    }

    return total === Object.keys(record).length
  }

  printRecords() {
    for (let record of this.records) {
      console.log(record)
    }
  }

  getRecords(params) {
    const recordsFound = []

    for (let record of this.records) {
      var totalParamsOk = 0
      for (let param of params) {
        if (record[param.key] == param.value) {
          totalParamsOk++
        }
      }

      if (totalParamsOk === params.length) {
        recordsFound.push(record)
      }
    }
    return { totalRecordsFound: recordsFound.length, recordsFound }
  }
}

class SQL {
  tables = []

  createTable(name, columns) {
    for (let table of this.tables) {
      if (table.name === name) {
        return false
      }
    }

    const table = new Table(name, columns)
    this.tables.push(table)
  }

  getTable(name) {
    return this.tables.find(table => table.name === name)
  }

}

const sql = new SQL()
sql.createTable('fruit', [{ name: 'name', type: 'string' }, { name: 'quantity', type: 'number', required: true }]);
sql.createTable('food', [{ name: 'name', type: 'string', required: true }, { name: 'timeToPrepare', type: 'number', required: true }]);
const tableFood = sql.getTable('food');
tableFood.insertRecords({ name: 'Pasta' });
tableFood.insertRecords({ timeToPrepare: 20 });
tableFood.insertRecords({ name: 'Sushi', timeToPrepare: 45 });
tableFood.insertRecords({ name: 'Sushi International', timeToPrepare: 55 });
tableFood.insertRecords({ name: 'Sushi National', timeToPrepare: '55' });
console.log(tableFood.getRecords([{ key: "name", value: 'Sushi' }, { key: "timeToPrepare", value: '45' }]));
tableFood.printRecords();


const tableFruit = sql.getTable('fruit');
tableFruit.insertRecords({ name: 'Apple' });
tableFruit.insertRecords({ name: 'Orange', quantity: 20 });
tableFruit.insertRecords({ name: 'Orange', quantity: 45 });
tableFruit.insertRecords({ name: 222, quantity: 45 });
tableFruit.printRecords();
console.log(tableFruit.getRecords([{ key: "name", value: 'Orange' }]));
console.log(tableFruit.getRecords([{ key: "name", value: 'Orange' }, { key: "quantity", value: '45' }]));

