import { useEffect, useMemo, useState } from 'react';
import { administrativeUnits } from '../../db/administrativeUnits';
import { Box, TextField, MenuItem } from '@mui/material';
import { Controller, UseFormReturn } from 'react-hook-form';

import { Label } from '../../components/Label';
import { UserFormData } from './types';
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
  const unit = parentArr.find((value: any) => value.Id === valueArgs);
  return unit ? unit[nameArr] : [];
};

interface Props {
  handleDisable: (isHaveErrors: boolean, length?: number) => void;
  methods: UseFormReturn<UserFormData, object>;
}

export const StepThree = ({ methods, handleDisable }: Props) => {
  // using lib
  const {
    control,
    formState: { errors },
    getValues,
    setValue,
    clearErrors,
    trigger
  } = methods;

  const provinceId = getValues('provinceId');
  const districtId = getValues('districtId');
  const listProvince = administrativeUnits;

  const listDistrict = useMemo(() => {
    return getChildArr(provinceId, listProvince, 'Districts');
  }, [provinceId, listProvince]);

  const listWard = useMemo(() => {
    return getChildArr(districtId, listDistrict, 'Wards');
  }, [districtId, listDistrict]);

  const [allowClickDistrict, setAllowClickDistrict] = useState<boolean>(false);
  const [allowClickWard, setAllowClickWard] = useState<boolean>(false);

  const handleChangeProvince = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue('provinceId', e.target.value);
    setAllowClickDistrict(true);
    setValue('districtId', '');
    if (getValues('provinceId') !== e.target.value) {
      setAllowClickWard(false);
      handleDisable(true);
    }
    trigger();
  };

  const handleChangeDistrict = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue('districtId', e.target.value);
    setValue('wardId', '');
    trigger();
    setAllowClickWard(true);
  };
  const handleChangeWard = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue('wardId', e.target.value);
    clearErrors('wardId');
    handleDisable(false);
    trigger();
  };
  useEffect(() => {
    if (errors.provinceId || errors.districtId || errors.wardId) {
      handleDisable(true);
    }
  }, [errors, handleDisable]);

  return (
    <>
      <Box sx={{ mb: 1, minWidth: '450px' }}>
        <Label required={true}>Tỉnh/Thành phố</Label>
        <Controller
          name="provinceId"
          control={control}
          render={({ field, fieldState: { invalid, error } }) => (
            <TextField
              placeholder="Tỉnh/Thành phố"
              fullWidth
              helperText={error?.message}
              error={invalid}
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
          name="districtId"
          control={control}
          render={({ field, fieldState: { invalid, error } }) => (
            <TextField
              fullWidth
              helperText={error?.message}
              placeholder="Quận/Huyện"
              disabled={!allowClickDistrict}
              error={invalid}
              {...field}
              onChange={(e) => handleChangeDistrict(e)}
              sx={{ root: { height: '50px' }, mt: 1 }}
              select>
              {!!getValues('provinceId')
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
          name="wardId"
          control={control}
          render={({ field, fieldState: { invalid, error } }) => (
            <TextField
              fullWidth
              disabled={!allowClickWard}
              placeholder="Xã/Phường"
              helperText={error?.message}
              error={invalid}
              {...field}
              onChange={(e) => handleChangeWard(e)}
              sx={{ root: { height: '50px' }, mt: 1 }}
              select>
              {!!getValues('districtId')
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
