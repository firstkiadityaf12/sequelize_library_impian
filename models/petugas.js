'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class petugas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      // peminjaman
      this.hasMany(models.peminjaman,{
        foreignKey: "petugas_id",
        as: "peminjaman"
      })
      //pengembalian
      this.hasMany(models.pengembalian,{
        foreignKey: "petugas_id",
        as: "pengembalian"
      })

    }
  };
  petugas.init({
    petugas_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama_petugas: DataTypes.STRING,
    jabatan_petugas: DataTypes.STRING,
    no_telp_petugas: DataTypes.STRING,
    alamat_petugas: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'petugas',
    tableName: 'petugas'
  });
  return petugas;
};