export class Repository {
  tables = []

  getTables() {
    return this.tables
  }

  getTable(tableName) {
    return this.tables.find(table => table.name === tableName)
  }

  addTable(table) {
    this.tables.push(table)
  }
}