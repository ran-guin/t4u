'use strict'

/*
|--------------------------------------------------------------------------
| TeaTypeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Database = use('Database')

class TeaTypeSeeder {
  async run () {
  	const types = await Database.table('tea_types').insert([
      {name: 'Black'},
      {name: 'Green'},
      {name: 'White'},
      {name: 'Tisanes'}
  	])

  	console.log('seeded varieties: ' + types)
  }
}

module.exports = TeaTypeSeeder
