import {Router} from "express";
import utils from "../../utils";
import ApiResponse from "../../utils/response";
import {Product} from "../../models/Product";

const router = Router();
router.get('/', async function (req, res) {
  const {page, page_size} = utils.paging(req.query.page, Number(req.query.page_size) || 10);
  const products = await Product.findAndCountAll(
    {
      limit: page_size,
      offset: page * page_size,
      order: [['create_time', 'DESC']]
    }
  );
  res.json(ApiResponse.success(products));
});
router.delete('/:id', async function (req, res) {
  const {id} = req.params;
  if (!id) {
    res.json(ApiResponse.miss());
    return;
  }
  res.json(ApiResponse.success(await Product.destroy({
    where: {
      id
    }
  })));
});
router.post('/', async function (req, res) {
  const {title, price, original_price, value, badge, type, level, status} = req.body;
  if (!title || !price || !value || !type) {
    res.json(ApiResponse.miss());
    return;
  }
  res.json(ApiResponse.success(await Product.add(title, price, original_price, value, badge, type, level, status)));
});
router.put('/', async function (req, res) {
  const {id, title, price, original_price, value, badge, type, level, status} = req.body;
  if (!id || !title || !price || !value || !type) {
    res.json(ApiResponse.miss());
    return;
  }
  res.json(ApiResponse.success(await Product.edit(id, title, price, original_price, value, badge, type, level, status)));
});
export default router;
