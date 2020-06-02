import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
  async create(request: Request, response: Response) {
    const { name, email, whatsapp, latitude, longitude, city, uf, items } = request.body;
  
    // trx extends for 'transacation'. it means that, if the first query fails, the second one will not be executed
    const trx = await knex.transaction();
  
    const point = { image: 'image_fake', name, email, whatsapp, latitude, longitude, city, uf };

    const insertedIds = await trx('points').insert(point);
  
    const point_id = insertedIds[0];
  
    const pointItems = items.map((item_id: number) => {
      return { item_id, point_id };
    })
  
    await trx('point_items').insert(pointItems);
  
    return response.send({ id: point_id, ...point });
  }
};

export default PointsController;
