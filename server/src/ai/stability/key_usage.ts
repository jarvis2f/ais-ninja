import Bull, {Job, Queue} from 'bull';
import {Token} from "../../models/Token";
import {config} from "../../config/config";
import {getLogger} from "../../utils/logger";
import {supplierClientAgent} from "../index";
import {StabilityClient} from "./index";
import {StabilityRestAPI} from "./StabilityRestAPI";

const logger = getLogger('ai.stability.key_usage')

let checkTokenQueue: Queue;

function getQueue() {
  if (!checkTokenQueue) {
    logger.debug(`redis url ${config?.getConfigValue('redis.url')}`)
    checkTokenQueue = new Bull('StabilityCheckTokenQueue', config?.getConfigValue('redis.url'), {
      redis: {
        maxRetriesPerRequest: 1,
      },
      defaultJobOptions: {
        removeOnComplete: false,
        removeOnFail: false,
      }
    });
    // Process the job
    checkTokenQueue.process(async (job: Job<{ id: number }>) => {
      const {id} = job.data;
      let token = await Token.findByPk(id);
      if (!token)
        return;
      const check = await getKeyUsage(id);
      token.update({
        limit: check.limit,
        status: check.status,
      })
      if (check.status === 0) {
        await supplierClientAgent.removeClient(token);
      }
      return;
    }).then(r => {
      logger.debug(`Check token finish. ${r}`)
    }).catch((e) => {
      logger.error(e)
    })
  }
  return checkTokenQueue;
}

async function getKeyUsage(id: number): Promise<{
  status: 0 | 1;
  limit: number;
}> {
  let client = supplierClientAgent.getClient(StabilityClient.SUPPLIER, id);
  if (!client) {
    return {
      status: 0,
      limit: 0,
    }
  }
  const balance = await (client[1] as StabilityRestAPI).getUserBalance().then(r => r.data.credits);

  return {
    status: balance <= 0 ? 0 : 1,
    limit: balance,
  };
}

// Add task to the queue
async function addStabilityUsageCheckTask(data: { id?: number; }, options: any = {}) {
  return await getQueue().add(data, options).catch(e => {
    logger.error(`Add usage check task fail. ${e}`)
  });
}

export {
  getKeyUsage,
  addStabilityUsageCheckTask
};
