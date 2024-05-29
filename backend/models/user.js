const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "id",
      autoIncrement: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "name",
      autoIncrement: false
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "email",
      autoIncrement: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "password",
      autoIncrement: false
    },
    rol_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 2,
      comment: null,
      primaryKey: false,
      field: "rol_id",
      autoIncrement: false,
      references: {
        key: "id",
        model: "rol_model"
      }
    }
  };
  const options = {
    tableName: "user",
    comment: "",
    indexes: [],
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    schema: 'public'
  };
  const UserModel = sequelize.define("user_model", attributes, options);
  UserModel.associate = function (models) {
    UserModel.belongsTo(models.rol_model, {
      foreignKey: 'rol_id'
    });
  };
  UserModel.associate = function (models) {
    UserModel.hasMany(models.task_list_model, {
      foreignKey: 'user_id'
    });
  };
  return UserModel;
};