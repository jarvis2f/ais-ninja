import {Router} from "express";
import ApiResponse from "../../utils/response";
import {Config} from "../../models/Config";

const router = Router();

router.get('/', async function (req, res) {
  res.json(ApiResponse.success(await Config.findAll()));
});

// 根据name批量更新配置
router.put('/', async function (req, res) {
  // 获取body中的配置
  const {configs} = req.body;
  if (!configs) {
    res.json(ApiResponse.miss());
    return;
  }
  // 根据name更新配置, 如果不存在则创建
  const updateRes = await Promise.all(configs.map(async (config: any) => {
    const {name, value} = config;
    const [updateCount] = await Config.update(
      {
        name,
        value
      },
      {
        where: {
          name
        }
      }
    );
    if (updateCount === 0) {
      // 创建配置
      return await Config.add(name, value);
    }
    return updateCount;
  }));
  res.json(ApiResponse.success(updateRes));
});

export default router;
