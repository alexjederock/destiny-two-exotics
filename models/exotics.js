export default (connection, Sequelize) => {
  return connection.define('exotics', {
    name: { type: Sequelize.STRING, primaryKey: true },
    type: { type: Sequelize.STRING },
    perk: { type: Sequelize.STRING },
    slug: { type: Sequelize.STRING },
  }, {
    defaultScope: {
      attributes: { exclude: ['deletedAt'] },
    },
  }, { paranoid: true })
}
