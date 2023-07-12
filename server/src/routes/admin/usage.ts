import {Router} from "express";
import ApiResponse from "../../utils/response";
import {UserApiKeyUsage} from "../../models/UserApiKeyUsage";
import utils from "../../utils";
import {User} from "../../models/User";

const router = Router();

router.get('/', async function (req, res) {
  const {page, page_size} = utils.paging(req.query.page, Number(req.query.page_size));
  return res.json(ApiResponse.success(await UserApiKeyUsage.findAndCountAll(
    {
      limit: page_size,
      offset: page * page_size,
      order: [['id', 'DESC']],
      include: [{model: User, as: 'user', foreignKey: 'user_id'}],
    }
  )))
});

export default router;
