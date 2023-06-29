import {Router} from "express";
import utils from "../../utils";
import ApiResponse from "../../utils/response";
import {Token} from "../../models/Token";
import {addUsageCheckTask, getKeyUsage} from "../../chatgpt/key_usage";
import {putClient, removeClient} from "../../chatgpt";

const router = Router();
router.get('/', async function (req, res) {
  const {page, page_size} = utils.paging(req.query.page, Number(req.query.page_size));
  res.json(ApiResponse.success(await Token.findAndCountAll({
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
  res.json(ApiResponse.success(await Token.destroy({
    where: {
      id
    }
  }).then(() => {
    removeClient(Number(id));
  })));
});

router.post('/', async function (req, res) {
  const {key, host, remarks, models, status} = req.body;
  if (!key || !host || !models) {
    res.json(ApiResponse.miss());
    return;
  }
  res.json(ApiResponse.success(await Token.add({key, host, remarks, models, status}).then((token) => {
    putClient(token);
    return token;
  })));
});

router.put('/', async function (req, res) {
  const {id, key, host, remarks, models, status} = req.body;
  if (!id || !key || !host || !models) {
    res.json(ApiResponse.miss());
    return;
  }
  res.json(ApiResponse.success(await Token.edit({id, key, host, remarks, models, status}).then((data) => {
    putClient(data?.[0]);
    return data?.[0];
  })))});
router.post('/check', async function (req, res) {
  const {key, host, all} = req.body;
  if (all) {
    const tokens = await Token.findAll({
      limit: 100,
      where: {
        status: 1
      }
    });
    tokens.forEach((token) => {
      addUsageCheckTask({
        id: Number(token.id),
        key: token.key,
        host: token.host
      });
    });
    res.json(ApiResponse.success({}, '提交成功'));
    return;
  }
  if (!key || !host) {
    res.json(ApiResponse.miss());
    return;
  }
  res.json(ApiResponse.success(await getKeyUsage(key, host)));
});
export default router;
