import { WardType, DistrictType, ProvinceType } from './types';
export const getProvinceName = (province_id: number, arr: ProvinceType[]) => {
  const name = arr.find((value: ProvinceType) => value?.id === province_id)
    ? arr.find((value: ProvinceType) => value?.id === province_id)?.name
    : undefined;
  return name;
};
export const getProvinceById = (id: number, arr: ProvinceType[]) => {
  return arr.find((value: ProvinceType) => value.id === id);
};
export const getDistrictName = (
  province_id: number,
  district_id: number,
  arr: ProvinceType[]
) => {
  const listDistrict = arr.find(
    (value: ProvinceType) => value.id === province_id
  )
    ? arr.find((value: ProvinceType) => value.id === province_id)?.districts
    : undefined;
  if (listDistrict) {
    return listDistrict.find((value: DistrictType) => value.id === district_id)
      ?.name;
  }
  return undefined;
};
export const getWardName = (
  province_id: number,
  district_id: number,
  ward_id: number,
  arr: ProvinceType[]
) => {
  const listDistrict = arr.find(
    (value: ProvinceType) => value.id === province_id
  )
    ? arr.find((value: ProvinceType) => value.id === province_id)?.districts
    : undefined;
  if (listDistrict) {
    const listWard = listDistrict.find(
      (value: DistrictType) => value.id === district_id
    )?.wards;
    if (listWard) {
      let ward_name = listWard.find(
        (value: WardType) => value.id === ward_id
      )?.name;
      return ward_name;
    }
  }
  return undefined;
};
export const getChildArr = (
  valueArgs: number,
  parentArr: any,
  nameArr: string
) => {
  const unit = parentArr.find((value: any) => value.id === valueArgs);
  return unit ? unit[nameArr] : [];
};
