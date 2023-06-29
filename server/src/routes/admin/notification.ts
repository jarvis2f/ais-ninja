import {Router} from "express";
import utils from "../../utils";
import ApiResponse from "../../utils/response";
import {Notification} from "../../models/Notification";

const router = Router();

router.get('/', async function (req, res) {
  const {page, page_size} = utils.paging(req.query.page, Number(req.query.page_size) || 10);

  res.json(ApiResponse.success(await Notification.findAndCountAll(
    {
      limit: page_size,
      offset: page * page_size,
      order: [['create_time', 'DESC']]
    }
  )));
});

router.delete('/:id', async function (req, res) {
  const {id} = req.params;
  if (!id) {
    res.json(ApiResponse.miss());
    return;
  }
  res.json(ApiResponse.success(await Notification.destroy({
    where: {
      id
    }
  })));
});

router.post('/', async function (req, res) {
  const {title, content, sort, status} = req.body;
  if (!title || !content) {
    res.json(ApiResponse.miss());
    return;
  }
  res.json(ApiResponse.success(await Notification.add(title, content, sort, status)));
});

router.put('/', async function (req, res, next) {
  const {id, title, content, sort, status} = req.body;
  if (!id || !title || !content) {
    res.json(ApiResponse.miss());
    return;
  }
  res.json(ApiResponse.success(await Notification.edit(id, title, content, sort, status)));
});

export default router;
