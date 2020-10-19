'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class buku extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

     // ini adalah blok untuk menghubungkan antar model/table
      /** one to one -> hasOne(), belongsTo()
       *  one to many-> hasMany(), belongsToMany()
       * 
       * has -> itu dipakai ketika menghubugkan parent ke child
       * belong -> itu dipakai ketika menghubungkan child ke parent
       */

    static associate(models) {

      // menghubungkan buku dengan rak ( child=>parent ; one to one  )
      this.belongsTo(models.rak,{
        foreignKey: "rak_id",
        as: "rak"
      })

    }
  };
  buku.init({
    buku_id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    rak_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    judul_buku: DataTypes.STRING,
    penulis_buku: DataTypes.STRING,
    penerbit_buku: DataTypes.STRING,
    tahun_penerbit: DataTypes.STRING,
    stok: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'buku',
    tableName: 'buku'
  });
  return buku;
};