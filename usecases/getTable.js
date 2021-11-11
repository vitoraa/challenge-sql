export class GetTable {

  constructor(repository) {
    this.repository = repository
  }

  get(name) {
    return this.repository.getTable(name)
  }
}