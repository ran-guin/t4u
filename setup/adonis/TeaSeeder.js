'use strict'

/*
|--------------------------------------------------------------------------
| TeaSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Database = use('Database')

class TeaSeeder {
  async run () {
  	const teas = await Database.table('teas').insert([
      {name: 'Standard', type: 1, variety: 1}
  	])

  	console.log('added: ' + teas)
  }
}

module.exports = TeaSeeder
