import { DataTypes } from 'sequelize';
import sequelize from '../Database.js';
import Prices from './Prices.js';

let PriceFeatures = sequelize.define('PriceFeatures', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    price_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Prices,
            key: 'id'
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'PriceFeatures',
    timestamps: false
});

export default PriceFeatures;