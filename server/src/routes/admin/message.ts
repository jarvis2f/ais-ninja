import {Router} from "express";
import utils from "../../utils";
import ApiResponse from "../../utils/response";
import {Message} from "../../models/Message";
import {User} from "../../models/User";

const router = Router();

router.get('/', async function (req, res) {
  const {page, page_size} = utils.paging(req.query.page, Number(req.query.page_size) || 10);

  res.json(ApiResponse.success(await Message.findAndCountAll(
    {
      limit: page_size,
      offset: page * page_size,
      order: [['create_time', 'DESC']],
      include: [{model: User, as: 'user'}],
    }
  )));
});

export default router;
