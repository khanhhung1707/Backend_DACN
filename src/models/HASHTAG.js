import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class HASHTAG extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    ma_hashtag: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ten_hashtag: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'HASHTAG',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ma_hashtag" },
        ]
      },
    ]
  });
  }
}
