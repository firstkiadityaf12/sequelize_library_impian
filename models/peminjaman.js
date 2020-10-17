'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class peminjaman extends Model {
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

  peminjaman.init({
    peminjaman_id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tanggal_pinjam: DataTypes.DATE,
    tanggal_kembali: DataTypes.INTEGER,
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
    },
  }, {
    sequelize,
    modelName: 'peminjaman',
    tableName: 'peminjaman'
  });
  return peminjaman;
};