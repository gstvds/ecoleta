import express from 'express';

import knex from './database/connection';

const routes = express.Router();

routes.get('/items', async (request, response) => {
  const items = await knex('items').select('*');

  const serializedItems = items.map((item) => {
    return {
      id: item.id,
      title: item.title,
      image_url: `http://localhost:3333/uploads/${item.image}`,
    }
  });

  return response.send(serializedItems);
});

routes.post('/points', async (request, response) => {
  const { name, email, whatsapp, latitude, longitude, city, uf, items } = request.body;

  // trx extends for 'transacation'. it means that, if the first query fails, the second one will not be executed
  const trx = await knex.transaction();

  const insertedIds = await trx('points').insert({
    image: 'image_fake',
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
  });

  const point_id = insertedIds[0];

  const pointItems = items.map((item_id: number) => {
    return { item_id, point_id };
  })

  await trx('point_items').insert(pointItems);

  return response.send({ success: true });
});

export default routes;
