import {Router} from "express";
import {getLogger} from "../../utils/logger";
import {supplierClientAgent} from "../../ai";
import {Token} from "../../models/Token";
import {StabilityProxy} from "../../ai/stability/StabilityProxy";

const router = Router();
const v1_router = Router();
router.use('/v1', v1_router);

const logger = getLogger('routes:relay:stability');

v1_router.get('/engines/list', async (req, res) => {
  const {user_id, api_key_id} = req;
  const [_, stability] = supplierClientAgent.getRandomClient("", {user_id, api_key_id}) as [Token, StabilityProxy];
  stability.listEngines().then((engines) => {
    res.json(engines);
  }).catch((err) => {
    logger.error(err);
    res.status(err.status).json(err.response.data);
  });
});
