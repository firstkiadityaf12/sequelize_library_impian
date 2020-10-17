'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pengembalian extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      // mengubungkan peminjaman dengan anggota ( belongto )
      this.belongsTo(models.anggota,{
        foreignKey: "anggota_id",
        as: "anggota"
      })

      //mengubungkan peminjaman dengan petugas ( belongto)
      this.belongsTo(models.petugas,{
        foreignKey: "petugas_id",
        as: "petugas"
      })

      //mengubungkan peminjaman dengan buku child => parrent belongtoMany
      this.belongsTo(models.buku, {
        foreignKey: "buku_id",
        as: "buku"
      })
          
    }
  };
  pengembalian.init({
    pengembalian_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tanggal_pengembalian: DataTypes.DATE,
    denda: DataTypes.DOUBLE,
    buku_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    anggota_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    petugas_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'pengembalian',
    tableName: 'pengembalian'
  });
  return pengembalian;
};