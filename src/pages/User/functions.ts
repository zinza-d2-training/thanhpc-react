import { WardType, DistrictType, ProvinceType } from './types';
export const getProvinceName = (province_id: string, arr: ProvinceType[]) => {
  const name = arr.find((value: ProvinceType) => value?.Id === province_id)
    ? arr.find((value: ProvinceType) => value?.Id === province_id)?.Name
    : undefined;
  return name;
};
export const getDistrictName = (
  province_id: string,
  district_id: string,
  arr: ProvinceType[]
) => {
  const listDistrict = arr.find(
    (value: ProvinceType) => value.Id === province_id
  )
    ? arr.find((value: ProvinceType) => value.Id === province_id)?.Districts
    : undefined;
  if (listDistrict) {
    return listDistrict.find((value: DistrictType) => value.Id === district_id)
      ?.Name;
  }
  return undefined;
};
export const getWardName = (
  province_id: string,
  district_id: string,
  ward_id: string,
  arr: ProvinceType[]
) => {
  const listDistrict = arr.find(
    (value: ProvinceType) => value.Id === province_id
  )
    ? arr.find((value: ProvinceType) => value.Id === province_id)?.Districts
    : undefined;
  if (listDistrict) {
    const listWard = listDistrict.find(
      (value: DistrictType) => value.Id === district_id
    )?.Wards;
    if (listWard) {
      let wardName = listWard.find(
        (value: WardType) => value.Id === ward_id
      )?.Name;
      return wardName;
    }
  }
  return undefined;
};
export const getChildArr = (
  valueArgs: string,
  parentArr: any,
  nameArr: string
) => {
  const unit = parentArr.find((value: any) => value.Id === valueArgs);
  return unit ? unit[nameArr] : [];
};
