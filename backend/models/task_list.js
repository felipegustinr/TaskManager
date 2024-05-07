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
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "title",
      autoIncrement: false
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "user_id",
      autoIncrement: false,
      references: {
        key: "id",
        model: "user_model"
      }
    },
    // create_at: {
    //   type: DataTypes.DATEONLY,
    //   allowNull: true,
    //   defaultValue:DataTypes.DATEONLY,
    //   comment: null,
    //   primaryKey: false,
    //   field: "create_at",
    //   autoIncrement: false
    // }
  };
  const options = {
    tableName: "task_list",
    comment: "",
    indexes: [],
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    schema: 'public'
  };
  const TaskListModel = sequelize.define("task_list_model", attributes, options);
  TaskListModel.associate = function (models) {
    TaskListModel.hasMany(models.task_model, {
      foreignKey: 'list_id'
    });
  };
  TaskListModel.associate = function (models) {
    TaskListModel.belongsTo(models.user_model, {
      foreignKey: 'user_id'
    });
  };
  return TaskListModel;
};