const hunters = (connection, Sequelize, Exotics) => {
  return connection.define('hunters', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    tag: { type: Sequelize.STRING },
    subclass: { type: Sequelize.STRING },
    grenades: { type: Sequelize.STRING },
    tree: { type: Sequelize.STRING },
    exoticId: { type: Sequelize.INTEGER, references: { model: Exotics, key: 'id' } },
  }, {
    defaultScope: {
      attributes: { exclude: ['deletedAt'] }
    }
  }, { paranoid: true })
}

module.exports = hunters
