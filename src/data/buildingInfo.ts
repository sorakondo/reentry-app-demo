import type { BuildingInfo } from '../types';

// デモ用にあらかじめ入力された状態にしておく建物情報。
// 実際の建物データベース等とは接続せず、固定のダミー値を初期値として使用する。
export const DEFAULT_BUILDING_INFO: BuildingInfo = {
  ageYears: 18,
  location: '東京都千代田区丸の内1-1-1',
  floors: 8,
  structureType: 'RC',
  floorAreaSqm: 4200,
};
