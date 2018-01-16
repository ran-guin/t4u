'use strict'

const Model = use('Model')

class Tea extends Model {

  variety() {
    return this.hasOne('App/Models/TeaVariety')
  }

  type() {
    return this.hasOne('App/Models/TeaType')
  }

}



module.exports = Tea
