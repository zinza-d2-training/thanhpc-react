import { useEffect, useState } from 'react';
import { administrativeUnits } from '../../db/administrativeUnits';
import { Box, TextField, MenuItem } from '@mui/material';
import { Controller } from 'react-hook-form';

import { Label } from '../../components/Label';
interface WardType {
  Id?: string;
  Name?: string;
  Level?: string;
}
interface DistrictType {
  Id?: string;
  Name?: string;
  Wards?: WardType[];
}
interface ProvinceType {
  Id?: string;
  Name?: string;
  Districts?: DistrictType[];
}
const getChildArr = (valueArgs: string, parentArr: any, nameArr: string) => {
  return parentArr.find((value: any) => value.Id === valueArgs)[nameArr];
};
export const StepThree = (props: any) => {
  const {
    control,
    formState: { errors },
    clearErrors,
    handleDisable,
    setError,
    getValues,
    setValue
  } = props;

  const [allowClickDistrict, setAllowClickDistrict] = useState<boolean>(false);
  const [allowClickWard, setAllowClickWard] = useState<boolean>(false);
  const [listProvince, setListProvince] = useState<ProvinceType[]>([]);
  const [listDistrict, setListDistrict] = useState<DistrictType[]>([]);
  const [listWard, setListWard] = useState<WardType[]>([]);
  // const [provinceId, setProvinceId] = useState<string>('');
  // const [districtId, setDistrictId] = useState<string>('');
  // const [wardId, setWardId] = useState<string>('');

  const handleChangeProvince = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    // setProvinceId(e.target.value);
    console.log('getValues', getValues('province'));
    console.log('new values', e.target.value);
    setValue('province', e.target.value);
    clearErrors('province');
    setAllowClickDistrict(true);
    const listDistrict = getChildArr(e.target.value, listProvince, 'Districts');
    setListDistrict(listDistrict);
    setListWard([]);
    if (getValues('province') !== e.target.value) {
      setError('district', { message: 'Đây là trường bắt buộc!' });
      setError('ward', { message: 'Đây là trường bắt buộc!' });
      setAllowClickWard(false);
      handleDisable(true);
    }
  };
  const handleChangeDistrict = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    // setDistrictId(e.target.value);
    setValue('district', e.target.value);
    clearErrors('district');
    const listWard = getChildArr(e.target.value, listDistrict, 'Wards');
    setListWard(listWard);
    setAllowClickWard(true);
  };
  const handleChangeWard = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    // setWardId(e.target.value);
    setValue('ward', e.target.value);
    clearErrors('ward');
    handleDisable(false);
  };
  useEffect(() => {
    if (errors.province || errors.district || errors.ward) {
      handleDisable(true);
    }
  }, [errors, handleDisable]);
  useEffect(() => {
    setListProvince(administrativeUnits);
  }, []);
  return (
    <>
      <Box sx={{ mb: 1, minWidth: '450px' }}>
        <Label required={true}>Tỉnh/Thành phố</Label>
        <Controller
          name="province"
          control={control}
          render={({ field }) => (
            <TextField
              placeholder="Tỉnh/Thành phố"
              fullWidth
              helperText={
                errors.province?.message ? errors.province?.message : null
              }
              error={errors.province?.message ? true : false}
              {...field}
              sx={{ root: { height: '50px' }, mt: 1 }}
              onChange={(e) => handleChangeProvince(e)}
              select>
              {listProvince.length > 0
                ? listProvince.map((value: ProvinceType) => (
                    <MenuItem value={value.Id} key={value.Id}>
                      {value.Name}
                    </MenuItem>
                  ))
                : null}
            </TextField>
          )}
        />
      </Box>
      <Box sx={{ mb: 1, minWidth: '450px' }}>
        <Label required={true}>Quận/Huyện</Label>
        <Controller
          name="district"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              helperText={
                errors.district?.message ? errors.district?.message : null
              }
              placeholder="Quận/Huyện"
              disabled={!allowClickDistrict}
              error={errors.district?.message ? true : false}
              {...field}
              onChange={(e) => handleChangeDistrict(e)}
              sx={{ root: { height: '50px' }, mt: 1 }}
              select>
              {!!getValues('province')
                ? listDistrict.map((value: DistrictType) => (
                    <MenuItem value={value.Id} key={value.Id}>
                      {value.Name}
                    </MenuItem>
                  ))
                : null}
            </TextField>
          )}
        />
      </Box>
      <Box sx={{ mb: 1, minWidth: '450px' }}>
        <Label required={true}>Xã/Phường</Label>
        <Controller
          name="ward"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              disabled={!allowClickWard}
              placeholder="Xã/Phường"
              helperText={errors.ward?.message ? errors.ward?.message : null}
              error={errors.ward?.message ? true : false}
              {...field}
              onChange={(e) => handleChangeWard(e)}
              sx={{ root: { height: '50px' }, mt: 1 }}
              select>
              {!!getValues('district')
                ? listWard.map((value: WardType) => (
                    <MenuItem value={value.Id} key={value.Id}>
                      {value.Name}
                    </MenuItem>
                  ))
                : null}
            </TextField>
          )}
        />
      </Box>
    </>
  );
};
