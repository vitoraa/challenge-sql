import { Table } from "../models/table.js"

export class CreateTable {

  constructor(repository) {
    this.repository = repository
  }

  create(name, columns) {
    for (let table of this.repository.getTables()) {
      if (table.name === name) {
        return false
      }
    }

    const table = new Table(name, columns)
    this.repository.addTable(table)
  }
}