import {Router} from "express";
import utils from "../../utils";
import ApiResponse from "../../utils/response";
import {Token} from "../../models/Token";
import {addUsageCheckTask, getKeyUsage} from "../../ai/openai/key_usage";
import {supplierClientAgent} from "../../ai";
import {MixModel} from "../../ai/types";
import {Op} from "sequelize";
import {addStabilityUsageCheckTask} from "../../ai/stability/key_usage";
import {getLogger} from "../../utils/logger";

const router = Router();
const logger = getLogger('routes:admin:token');

router.get('/:supplier/models', async (req, res) => {
  const {user_id} = req;
  const {supplier} = req.params;
  if (!user_id || !supplier) {
    res.json(ApiResponse.miss());
    return;
  }
  let mixModels: MixModel[] = [];
  try {
    const [_, apiClient] = supplierClientAgent.getRandomClient(supplier as string, user_id);
    mixModels = await apiClient.listModels(true);
  } catch (e) {
    logger.error(`list models error: ${e}`)
    switch (supplier) {
      case 'openai':
        mixModels.push({
          name: 'GPT-3.5-TURBO',
          model: 'gpt-3.5-turbo',
          supplier: 'openai',
          type: 'text'
        })
        break;
      case 'stability':
        mixModels.push({
          name: 'Stable Diffusion v2.1',
          model: 'stable-diffusion-512-v2-1',
          supplier: 'stability',
          type: 'image'
        });
        break;
      case 'anthropic':
        mixModels.push({
          name: 'CLAUDE-1',
          model: 'claude-1',
          supplier: 'anthropic',
          type: 'text'
        })
        break;
    }
  }
  res.json(ApiResponse.success(mixModels));
});

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
  let token = await Token.findByPk(id);
  if (!token)
    return;
  supplierClientAgent.removeClient(token.toJSON());
  res.json(ApiResponse.success(await Token.destroy({
    where: {
      id
    }
  })));
});

router.post('/', async function (req, res) {
  const {key, host, remarks, models, status, supplier = 'openai'} = req.body;
  if (!key || !host || !models) {
    res.json(ApiResponse.miss());
    return;
  }
  res.json(ApiResponse.success(await Token.add({key, host, remarks, models, status, supplier}).then((token) => {
    supplierClientAgent.putClient(token.toJSON());
    return token;
  })));
});

router.put('/', async function (req, res) {
  const {id, key, host, remarks, models, status, supplier = 'openai'} = req.body;
  if (!id || !key || !host || !models) {
    res.json(ApiResponse.miss());
    return;
  }
  res.json(ApiResponse.success(await Token.edit({id, key, host, remarks, models, status, supplier})
    .then((data) => {
      if (status === 0) {
        supplierClientAgent.removeClient(data?.[0]?.toJSON());
      } else {
        supplierClientAgent.putClient(data?.[0]?.toJSON());
      }
      return data?.[0];
    }))
  )
});
router.post('/check', async function (req, res) {
  const {key, host, all} = req.body;
  if (all) {
    const tokens = await Token.findAll({
      limit: 100,
      where: {
        status: 1,
        [Op.not]: {
          supplier: 'anthropic'
        }
      },
      raw: true
    });
    tokens.forEach((token) => {
      if (token.supplier === 'openai') {
        // addUsageCheckTask({
        //   id: Number(token.id),
        //   key: token.key,
        //   host: token.host
        // });
      } else if (token.supplier === 'stability') {
        addStabilityUsageCheckTask({id: Number(token.id)})
      }
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
