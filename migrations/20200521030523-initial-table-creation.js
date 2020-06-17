module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('exotics', {
      name: { type: Sequelize.STRING, primaryKey: true },
      type: { type: Sequelize.STRING },
      perk: { type: Sequelize.STRING },
      slug: { type: Sequelize.STRING },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      },
      deletedAt: { type: Sequelize.DATE },
    })

    await queryInterface.createTable('hunters', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      tag: { type: Sequelize.STRING },
      subclass: { type: Sequelize.STRING },
      grenades: { type: Sequelize.STRING },
      tree: { type: Sequelize.STRING },
      exoticName: { type: Sequelize.STRING, references: { model: 'exotics', key: 'name' } },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      },
      deletedAt: { type: Sequelize.DATE },
    })
  },


  down: async (queryInterface) => {
    await queryInterface.dropTable('hunters')

    return queryInterface.dropTable('exotics')
  }
}
