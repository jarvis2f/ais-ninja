import {Router} from "express";
import utils from "../../utils";
import {Action} from "../../models/Action";
import ApiResponse from "../../utils/response";

const router = Router();

router.get('/', async function (req, res) {
  const {page, page_size} = utils.paging(req.query.page, Number(req.query.page_size) || 10 );
  const actions = await Action.findAndCountAll(
    {
      limit: page_size,
      offset: page * page_size,
      order: [['create_time', 'DESC']]
    }
  );
  res.json(ApiResponse.success(actions));
});

export default router;
