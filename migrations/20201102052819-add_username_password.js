'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    //menambhakan kolom username
    await queryInterface.addColumn(
      "petugas",
      "username",
      { type: Sequelize.STRING }
    )
    //menambhakan kolom password
    await queryInterface.addColumn(
      "petugas",
      "password",
      { type: Sequelize.STRING }
    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    // menghapus username dan password
    await queryInterface.removeColumn("petugas","username")
    await queryInterface.removeColumn("petugas","password")
  }
};
