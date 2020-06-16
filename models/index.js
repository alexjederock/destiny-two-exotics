import Sequelize from 'sequelize'
import allConfigs from '../configs/sequelize'
import HuntersModel from './hunters'
import ExoticsModel from './exotics'

const environment = process.env.NODE_ENV || 'development'
const config = allConfigs[environment]

const connection = new Sequelize(config.database, config.username, config.password, {
  host: config.host, dialect: config.dialect,
})

const Exotics = ExoticsModel(connection, Sequelize)
const Hunters = HuntersModel(connection, Sequelize, Exotics)

Exotics.hasMany(Hunters)
Hunters.belongsTo(Exotics)

module.exports = {
  Exotics,
  Hunters,
  Op: Sequelize.Op
}
