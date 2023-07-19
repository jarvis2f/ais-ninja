import {Router} from "express";
import utils from "../../utils";
import ApiResponse from "../../utils/response";
import {User} from "../../models/User";

const router = Router();
router.get('/', async function (req, res) {
  const {page, page_size} = utils.paging(req.query.page, Number(req.query.page_size) || 10);
  res.json(ApiResponse.success(await User.findAndCountAll({
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
  res.json(ApiResponse.success(await User.destroy({
    where: {
      id
    }
  })));
});
router.put('/', async function (req, res) {
  const {id, account, avatar, integral, nickname, role, level_expire_time, status} = req.body;
  if (!id) {
    res.json(ApiResponse.miss());
    return;
  }
  res.json(ApiResponse.success(await User.upsert({id, account, avatar, integral, nickname, role, level_expire_time, status} as User)));
});
export default router;
