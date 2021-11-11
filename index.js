import { SQL } from "./models/sql.js";
import { Repository } from "./repository/sql-repository.js";
import { CreateTable } from "./usecases/createtable.js";
import { GetTable } from "./usecases/getTable.js";

const repository = new Repository();
const sql = new SQL(new CreateTable(repository), new GetTable(repository));

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

