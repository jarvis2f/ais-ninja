import {Router} from "express";
import utils from "../../utils";
import {RedemptionCode} from "../../models/RedemptionCode";
import ApiResponse from "../../utils/response";
import crypto from "crypto";

const router = Router();

// 获取卡密列表
router.get('/', async function (req, res) {
  const {page, page_size} = utils.paging(req.query.page, Number(req.query.page_size) || 10);

  const redemption_codes = await RedemptionCode.findAndCountAll(
    {
      limit: page_size,
      offset: page * page_size,
      order: [['create_time', 'DESC']],
    }
  );
  res.json(ApiResponse.success(redemption_codes));
});

router.delete('/:id', async function (req, res) {
  const {id} = req.params;
  if (!id) {
    res.json(ApiResponse.miss());
    return;
  }
  // 删除卡密
  const delRes = await RedemptionCode.destroy({
    where: {
      id
    }
  });
  res.json(ApiResponse.success(delRes));
});

// 生成卡密
router.post('/', async function (req, res) {
  const {type = 'integral', end_time = '', quantity = 1, reward = 10, level = 1} = req.body;
  const generate_redemption_key = (quantity: number) => {
    const keys = [];
    for (let i = 0; i < quantity; i++) {
      const str = `${crypto.randomUUID()}_${utils.generateSnowflakeId()()}_${new Date().getTime()}`;
      const key = crypto.createHash('md5').update(str).digest('hex');
      keys.push(key);
    }
    return keys;
  };
  const redemption_keys = generate_redemption_key(quantity);
  const redemption_codes = redemption_keys.map((key) => {
    return {
      key,
      type,
      end_time,
      value: reward,
      status: 0,
      level
    };
  });
  // 批量添加卡密
  const addRes = await RedemptionCode.addBatches(redemption_codes);
  res.json(ApiResponse.success(addRes));
});

// 检查卡密是否过期
router.get('/check', async function (req, res) {
  await RedemptionCode.updateExpired();
  res.json(ApiResponse.success());
});

export default router;
