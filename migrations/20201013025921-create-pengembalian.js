'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pengembalian', {
      pengembalian_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tanggal_pengembalian: {
        type: Sequelize.DATE
      },
      denda: {
        type: Sequelize.DOUBLE
      },
      buku_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "buku",
          key: "buku_id"
        }
      },
      anggota_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "anggota",
          key: "anggota_id"
        }
      },
      petugas_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "petugas",
          key: "petugas_id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('pengembalian');
  }
};