import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Chat extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    IDChat: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    IDNguoiDung: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'NguoiDung',
        key: 'IDNguoiDung'
      }
    },
    Content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    RoomId: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    NgayGui: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Chat',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IDChat" },
        ]
      },
      {
        name: "IDNguoiDung",
        using: "BTREE",
        fields: [
          { name: "IDNguoiDung" },
        ]
      },
    ]
  });
  }
}
