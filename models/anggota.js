'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class anggota extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      // peminjaman
      this.hasMany(models.peminjaman,{
        foreignKey: "anggota_id",
        as: "peminjaman"
      })
      //pengembalian
      this.hasMany(models.pengembalian,{
        foreignKey: "anggota_id",
        as: "pengembalian"
      })

    }
  };
  anggota.init({
    anggota_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    kode_anggota: DataTypes.STRING,
    nama_anggota: DataTypes.STRING,
    jk_anggota: DataTypes.STRING,
    jurusan_anggota: DataTypes.STRING,
    no_telp_anggota: DataTypes.STRING,
    alamat_anggota: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'anggota',
    tableName: 'anggota'
  });
  return anggota;
};