import {Router} from "express";
import utils from "../../utils";
import ApiResponse from "../../utils/response";
import {Payment} from "../../models/Payment";

const router = Router();

router.get('/', async function (req, res) {
  const {page, page_size} = utils.paging(req.query.page, Number(req.query.page_size) || 10);

  res.json(ApiResponse.success(await Payment.findAndCountAll({
    limit: page_size,
    offset: page * page_size,
    order: [['create_time', 'DESC']]
  })));
});

router.delete('/:id', async function (req, res) {
  const {id} = req.params;
  if (!id) {
    res.json(ApiResponse.miss());
    return;
  }
  res.json(ApiResponse.success(await Payment.destroy({
    where: {
      id
    }
  })));
});

router.post('/', async function (req, res) {
  const {channel, name, params, types, status = 1} = req.body;
  if (!channel || !name || !params || !types) {
    res.json(ApiResponse.miss());
    return;
  }

  res.json(ApiResponse.success(await Payment.add(channel, name, params, types, status)));
});

router.put('/payment', async function (req, res) {
  const {id, channel, name, params, types, status} = req.body;
  if (!id || !channel || !name || !params || !types) {
    res.json(ApiResponse.miss());
    return;
  }
  res.json(ApiResponse.success(await Payment.edit(id, channel, name, params, types, status)));
});

export default router;
