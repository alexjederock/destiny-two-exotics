export default (connection, Sequelize, Exotics) => {
  return connection.define('hunters', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    tag: { type: Sequelize.STRING },
    subclass: { type: Sequelize.STRING },
    grenades: { type: Sequelize.STRING },
    tree: { type: Sequelize.STRING },
    exoticName: { type: Sequelize.STRING, references: { model: Exotics, key: 'name' } },
  }, {
    defaultScope: {
      attributes: { exclude: ['deletedAt'] },
    },
  }, { paranoid: true })
}
