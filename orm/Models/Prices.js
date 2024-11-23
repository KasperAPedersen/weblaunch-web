import { DataTypes } from 'sequelize';
import sequelize from "../Database.js";

let Prices = sequelize.define('Prices', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price:{
        type: DataTypes.DECIMAL,
        allowNull: false
    }
}, {
    tableName: 'Prices',
    timestamps: false
});

export default Prices;