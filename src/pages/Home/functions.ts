export const getChildArr = (
  valueArgs: number,
  parentArr: any,
  nameArr: string
) => {
  const unit = parentArr.find((value: any) => value.id === valueArgs);
  return unit ? unit[nameArr] : [];
};
export const getNameById = (id: number, arr: any) => {
  const name = arr.find((value: any) => value.id === id)['name'];
  return name;
};
export const getProvinceById = (id: number, arr: any) => {
  return arr.find((value: any) => value.id === id);
};
export const getDistrictName = (
  province_id: number,
  district_id: number,
  arr: any
) => {
  const listDistrict = arr.find((value: any) => value.id === province_id)[
    'districts'
  ];
  if (listDistrict) {
    return listDistrict.find((value: any) => value.id === district_id)['name'];
  }
  return null;
};
export const getWardName = (
  province_id: number,
  district_id: number,
  ward_id: number,
  arr: any
) => {
  const listDistrict = arr.find((value: any) => value.id === province_id)[
    'districts'
  ];
  if (listDistrict) {
    const listWard = listDistrict.find(
      (value: any) => value.id === district_id
    )['wards'];
    if (listWard) {
      let wardName =
        listWard.find((value: any) => value.id === ward_id)['name'] ||
        'Không xác định';
      return wardName;
    }
  }
  return undefined;
};
