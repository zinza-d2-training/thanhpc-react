export const getProvinceName = (provinceId: string, arr: any) => {
  const name = arr.find((value: any) => value.Id === provinceId)['Name'];
  return name;
};
export const getDistrictName = (
  provinceId: string,
  districtId: string,
  arr: any
) => {
  const listDistrict = arr.find((value: any) => value.Id === provinceId)[
    'Districts'
  ];
  if (listDistrict) {
    return listDistrict.find((value: any) => value.Id === districtId)['Name'];
  }
  return null;
};
export const getWardName = (
  provinceId: string,
  districtId: string,
  wardId: string,
  arr: any
) => {
  const listDistrict = arr.find((value: any) => value.Id === provinceId)[
    'Districts'
  ];
  if (listDistrict) {
    const listWard = listDistrict.find((value: any) => value.Id === districtId)[
      'Wards'
    ];
    if (listWard) {
      let wardName =
        listWard.find((value: any) => value.Id === wardId)['Name'] ||
        'Không xác định';
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
