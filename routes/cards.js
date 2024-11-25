import { Router } from 'express';
import Models from '../orm/Models.js';

const route = new Router();

route.get('/getAllCards', async (req, res) => {
    let prices = await Models.Prices.findAll();
    let cardData = [];
    for(let i = 0; i < prices.length; i++) {
        let price = prices[i];
        let priceFeatures = await Models.PriceFeatures.findAll({ where: { price_id: price.id } });

        cardData.push({
            "id": price.id,
            "name": price.name,
            "description": price.description,
            "price": price.price,
            "features": priceFeatures
        });
    }

    res.json(cardData);
    res.end();
});

export default route;