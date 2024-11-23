import { DataTypes } from 'sequelize';
import sequelize from "../Database.js";

let Prices = sequelize.define('Prices', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price:{
        type: DataTypes.DECIMAL(10, 3),
        allowNull: true
    }
}, {
    tableName: 'Prices',
    timestamps: false
});

export default Prices;