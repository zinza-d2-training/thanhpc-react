import { WardType, DistrictType, ProvinceType } from './types';
export const getProvinceName = (provinceId: string, arr: ProvinceType[]) => {
  const name = arr.find((value: ProvinceType) => value?.Id === provinceId)
    ? arr.find((value: ProvinceType) => value?.Id === provinceId)?.Name
    : undefined;
  return name;
};
export const getDistrictName = (
  provinceId: string,
  districtId: string,
  arr: ProvinceType[]
) => {
  const listDistrict = arr.find(
    (value: ProvinceType) => value.Id === provinceId
  )
    ? arr.find((value: ProvinceType) => value.Id === provinceId)?.Districts
    : undefined;
  if (listDistrict) {
    return listDistrict.find((value: DistrictType) => value.Id === districtId)
      ?.Name;
  }
  return undefined;
};
export const getWardName = (
  provinceId: string,
  districtId: string,
  wardId: string,
  arr: ProvinceType[]
) => {
  const listDistrict = arr.find(
    (value: ProvinceType) => value.Id === provinceId
  )
    ? arr.find((value: ProvinceType) => value.Id === provinceId)?.Districts
    : undefined;
  if (listDistrict) {
    const listWard = listDistrict.find(
      (value: DistrictType) => value.Id === districtId
    )?.Wards;
    if (listWard) {
      let wardName = listWard.find(
        (value: WardType) => value.Id === wardId
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
