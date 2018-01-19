'use strict'

const Env = use('Env')
const Helpers = use('Helpers')
const Config = use('Config')

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Default Connection
  |--------------------------------------------------------------------------
  |
  | Connection defines the default connection settings to be used while
  | interacting with SQL databases.
  |
  */
  connection: Env.get('DB_CONNECTION', 'mysql'),

  // Custom config settings //
  custom: {
    upload: {
      // specify explicit list of tables that can be updated, along with default field validation requirements  (for security)
      // keys = table name (lower case);  values = validation ( eg { name: 'required|min:3|max:10'} )
      'teas' : { name: 'required|min:3|max:5' },
      'vaccine' : { name: 'required' },
      'disease' : { name: 'required' },
    },
    search: {
      // specify explicit list of tables that can be searched, along with default fields accessible  (for security)
      // keys = table name (lower case);  values = hash of options (fields: array, joins, array of arrays)
      'teas' : {
        fields: [
          'teas.id',
          'teas.name',
          'teas.description',
          'teas.price', 
          'tea_varieties.name as variety', 
          'tea_types.name as type'
        ],
        joins: [
          ['tea_varieties', 'teas.variety', 'tea_varieties.id'],
          ['tea_types', 'teas.type', 'tea_types.id']
        ]
      },
      'disease' : {
        fields: [
          'disease.name',
          'disease.description',
        ],
        joins: [
        ]
      },
      'vaccine' : {
        fields: [
          'vaccine.name',
          'vaccine.description',
        ],
        joins: [
        ]
      },
      'immunization' : {
        table: 'vaccine',
        fields: [
          'vaccine.id as vaccine_id',
          'vaccine.name as vaccine',
          'vaccine.description',
          'vaccine.code',
          'disease.id as disease_id',
        ],
        rawFields: [
          'group_concat(disease.name) as coverage',
          'group_concat(disease.id) as disease_ids'
        ],
        joins: [
          ['disease_vaccine', 'vaccine.id', 'disease_vaccine.vaccine_id'],       
          ['disease', 'disease_vaccine.disease_id', 'disease.id']
        ],
        groupBy: ['vaccine_id']
      },
    }
  },

  // End of Custom config settings //

  /*
  |--------------------------------------------------------------------------
  | Sqlite
  |--------------------------------------------------------------------------
  |
  | Sqlite is a flat file database and can be good choice under development
  | environment.
  |
  | npm i --save sqlite3
  |
  */
  sqlite: {
    client: 'sqlite3',
    connection: {
      filename: Helpers.databasePath(`${Env.get('DB_DATABASE', 'development')}.sqlite`)
    },
    useNullAsDefault: true
  },

  /*
  |--------------------------------------------------------------------------
  | MySQL
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for MySQL database.
  |
  | npm i --save mysql
  |
  */
  mysql: {
    client: 'mysql',
    connection: {
      host: Env.get('DB_HOST', '127.0.0.1'),
      port: Env.get('DB_PORT', 3306),
      user: Env.get('DB_USER', 'testuser'),
      password: Env.get('DB_PASSWORD', 'testpass'),
      database: Env.get('DB_DATABASE', 'litmusdev'),
      debug: true
    }
  },

  /*
  |--------------------------------------------------------------------------
  | PostgreSQL
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for PostgreSQL database.
  |
  | npm i --save pg
  |
  */
  pg: {
    client: 'pg',
    connection: {
      host: Env.get('DB_HOST', 'localhost'),
      port: Env.get('DB_PORT', ''),
      user: Env.get('DB_USER', 'root'),
      password: Env.get('DB_PASSWORD', ''),
      database: Env.get('DB_DATABASE', 'adonis')
    }
  }
}
