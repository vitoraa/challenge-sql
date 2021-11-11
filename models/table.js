export class Table {
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