import * as util from "util";
import {randomUUID} from "crypto";

export default {
  getClientIP: (req: any) => {
    return req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;
  },
  paging(page: any, page_size: number): { page: number, page_size: number } {
    page = Number(page) || 0;
    page_size = Number(page_size) || 10;
    if (page < 0 || typeof page != 'number') {
      page = 0;
    }
    if (page > 0) {
      page -= 1;
    }
    return {page, page_size};
  },
  random_string(len: number): string {
    const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz1234567890';
    const maxPos = $chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  },
  generateApiKey(): string {
    let key = this.random_string(16);
    const uuid = randomUUID().replace(/-/g, '');

    for (let i = 0; i < 32; i++) {
      let c = uuid.charAt(i);
      if (i % 2 === 0 && c >= 'a' && c <= 'z') {
        c = c.toUpperCase();
      }
      key += c;
    }

    return key;
  },
  getKeyByValue<T extends Record<string, unknown>>(object: T, value: string): keyof T | undefined {
    return Object.keys(object).find(key => object[key] === value);
  },
  filterObjectNull(obj: { [key: string]: any }): { [key: string]: any } {
    const params = Object.keys(obj)
      .filter((key) => obj[key] !== '' && obj[key] !== null && obj[key] !== undefined)
      .reduce((acc, key) => ({...acc, [key]: obj[key]}), {});
    return {...params};
  },
  ksort(obj: { [key: string]: any }): { [key: string]: any } {
    const keys = Object.keys(obj).sort();
    const sortedObj: { [key: string]: any } = {};
    for (let i = 0; i < keys.length; i++) {
      sortedObj[keys[i]] = obj[keys[i]];
    }
    return sortedObj;
  },
  buildQueryString(params: { [key: string]: any }): string {
    return Object.keys(params)
      .map(function (key) {
        return key + '=' + params[key];
      })
      .join('&');
  },
  defaultInspect(obj: any): string {
    return util.inspect(obj, {
      depth: null,
      colors: true,
      maxArrayLength: 20,
      maxStringLength: 200,
      breakLength: 120,
      sorted: true,
    })
  },
  /**
   * 生成分布式全局唯一ID（雪花算法）
   * @param {number} nodeId 节点ID，取值范围是0-4095
   * @param {number} epoch 起始时间戳，单位是毫秒，默认值为2021-01-01 00:00:00的时间戳
   * @throws {Error} 如果在同一毫秒内生成的ID数量达到了最大值（4096），则会抛出异常
   * @returns {string} 64位整数字符串
   */
  generateSnowflakeId(nodeId: number = 1, epoch = 1672502400000): Function {
    let sequence = 0;
    let lastTimestamp = 0;
    /**
     * 等待下一毫秒
     * @param {number} timestamp 当前时间戳
     * @returns {number} 下一毫秒的时间戳
     */
    const waitNextMillis = (timestamp: number) => {
      let nextTimestamp = Date.now() - epoch;
      while (nextTimestamp <= timestamp) {
        nextTimestamp = Date.now() - epoch;
      }
      return nextTimestamp;
    };
    return function (): bigint {
      let timestamp = Date.now() - epoch;
      if (timestamp < lastTimestamp) {
        throw new Error('Clock moved backwards!');
      }
      if (timestamp === lastTimestamp) {
        sequence = (sequence + 1) & 4095;
        if (sequence === 0) {
          timestamp = waitNextMillis(timestamp);
        }
      } else {
        sequence = 0;
      }
      lastTimestamp = timestamp;
      return (BigInt(timestamp) << 22n) | (BigInt(nodeId) << 12n) | BigInt(sequence);
    };
  }
}
