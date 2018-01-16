'use strict'

/*
|--------------------------------------------------------------------------
| TeaVarietySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Database = use('Database')

class TeaVarietySeeder {
  async run () {
  	const varieties = await Database.table('tea_varieties').insert([
      {name: 'Earl Grey'},
      {name: 'Pu Ehr'},
      {name: 'Orange Pekoe'}
  	])

  	console.log('seeded varieties: ' + varieties)
  }
}

module.exports = TeaVarietySeeder
