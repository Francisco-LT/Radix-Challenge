const EquipmentModel = (sequelize, DataTypes) => {
    const Equipment = sequelize.define('Equipment', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        equipmentId: DataTypes.STRING,
        timestamp: DataTypes.DATE,
        value: DataTypes.DECIMAL,
    },
    {
        timestamps: false,
        tableName: 'equipments_logs',
    });
  
    return Equipment;
  };
  
  module.exports = EquipmentModel;