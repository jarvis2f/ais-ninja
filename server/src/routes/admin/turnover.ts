import {Router} from "express";
import utils from "../../utils";
import ApiResponse from "../../utils/response";
import {Turnover} from "../../models/Turnover";
import {User} from "../../models/User";

const router = Router();
router.get('/', async function (req, res) {
  const {page, page_size} = utils.paging(req.query.page, Number(req.query.page_size) || 10);
  res.json(ApiResponse.success(await Turnover.findAndCountAll({
    limit: page_size,
    offset: page * page_size,
    order: [['create_time', 'DESC']],
    include: [{model: User, as: 'user'}],
  })));
});
router.delete('/:id', async function (req, res) {
  const {id} = req.params;
  if (!id) {
    res.json(ApiResponse.miss());
    return;
  }
  res.json(ApiResponse.success(await Turnover.destroy({
    where: {
      id
    }
  })));
});
router.put('/', async function (req, res) {
  const {id, user_id, value, describe} = req.body;
  if (!id || !value || !describe || !user_id) {
    res.json(ApiResponse.miss());
    return;
  }
  res.json(ApiResponse.success(await Turnover.upsert({id, user_id, value, describe} as Turnover)));
});
export default router;
