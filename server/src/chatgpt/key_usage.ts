import fetch from 'node-fetch';
import dayjs from "dayjs";
import Bull, {Job, Queue} from 'bull';
import {Token} from "../models/Token";
import {config} from "../config/config";

interface SubscriptionData {
  hard_limit_usd?: number;
  has_payment_method?: boolean;
}

const CheckTokenQueue: Queue = new Bull('CheckTokenQueue', {
  redis: config?.getConfigValue('redis.url'),
  defaultJobOptions: {
    removeOnComplete: false,
    removeOnFail: false,
  }
});

async function getKeyUsage(url: string, key: string): Promise<{
  status: number;
  hard_limit_usd: number;
  total_usage: number | string;
}> {
  const subscriptionUrl = `${url}/v1/dashboard/billing/subscription`;
  const subscriptionRes = await fetch(subscriptionUrl, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + key
    }
  });

  if (subscriptionRes.status !== 200) {
    return {
      status: subscriptionRes.status,
      hard_limit_usd: 0,
      total_usage: 0
    };
  }

  const data: SubscriptionData = await subscriptionRes.json() as SubscriptionData;
  const hard_limit_usd = data?.hard_limit_usd || 0;
  const now = new Date();
  const usageUrl = `${url}/v1/dashboard/billing/usage`;
  let startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
  const endDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const subDate = new Date(now);
  subDate.setDate(1);

  if (hard_limit_usd > 20) {
    startDate = subDate;
  }

  if (data?.has_payment_method) {
    const day = now.getDate();
    startDate = new Date(now.getTime() - (day - 1) * 24 * 60 * 60 * 1000);
  }
  const usageRes = await fetch(`${usageUrl}?start_date=${dayjs(startDate).format('yyyy-MM-dd')}&end_date=${dayjs(endDate).format('yyyy-MM-dd')}`, {
    headers: {
      Authorization: 'Bearer ' + key
    }
  });

  let total_usage: number | string = 0;

  if (usageRes.status === 200) {
    const usageData = await usageRes.json() as {
      total_usage: number;
    };
    total_usage = usageData.total_usage ? (usageData.total_usage / 100).toFixed(2) : 0;
  }

  return {
    status: 0,
    hard_limit_usd,
    total_usage
  };
}

// Add task to the queue
async function addUsageCheckTask(data: { id?: number; key?: string; host?: string }, options: any = {}) {
  return await CheckTokenQueue.add(data, options);
}

// Process the job
CheckTokenQueue.process(async (job: Job<{ id: number; key: string; host: string }>) => {
  const {id, key, host} = job.data;
  const check = await getKeyUsage(host, key);
  let status = 1;
  const limit = Number(check.hard_limit_usd);
  const usage = Number(check.total_usage);

  if (check.status) {
    status = 0;
  }
  if (limit <= usage) {
    status = 0;
  }
  await Token.upsert({
    id: id,
    limit,
    usage,
    status,
  } as Token);
  return;
});

export {
  getKeyUsage,
  addUsageCheckTask
};
