import { Table } from "./table.js"

export class SQL {
  constructor(createTableUseCase, getTableUseCase) {
    this.createTableUseCase = createTableUseCase
    this.getTableUseCase = getTableUseCase
  }

  createTable(name, columns) {
    this.createTableUseCase.create(name, columns)
  }

  getTable(name) {
    return this.getTableUseCase.get(name)
  }

}