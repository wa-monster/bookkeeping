import { getConfig } from '@/utils';

const { FEISHU_CONFIG: { FEISHU_APP_ID: APP_ID, FEISHU_APP_SECRET: APP_SECRET } } = getConfig();
export default {
  APP_ID,
  APP_SECRET,
}