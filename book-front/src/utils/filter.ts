export const money = (num: number) => {
  return num.toFixed(2)
}

export const enum2arr = (valueEnum: any[] | Record<string, any>) => {
  let values = Array.isArray(valueEnum) ? valueEnum : Object.values(valueEnum);
  // 如果 enum 值为 number 类型，ts 生成的 js 对象会同时包含枚举的名称，针对该情形需提出枚举名称
  const hasNum = values.some((v) => typeof v === 'number');
  if (hasNum) {
    values = values.filter((v) => typeof v === 'number');
  }
  return values;
}