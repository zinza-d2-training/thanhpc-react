import { useState, useEffect, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import {
  Stack,
  Box,
  Container,
  TextField,
  colors,
  Grid,
  MenuItem,
  IconButton,
  Typography
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { useForm, Controller, Resolver } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';

import EditIcon from '@mui/icons-material/Edit';
import { useAppSelector } from '../../store/hooks';
import { loginSelector } from '../../features/login/loginSlice';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { ConfirmInjection } from '../../components/ConfirmInjection/ConfirmInjection';
import { lookUpCertificateResult } from '../../db/lookUpCertificateResult';
import { TableInjectionRegistrationResult } from '../../components/TableInjectionRegistrationResult/TableInjectionRegistrationResult';
import { injectionRegistrationResult } from '../../db/injectionRegistration';
import { InjectionRegistrationDialog } from '../../components/InjectionRegistrationDialog/InjectionRegistrationDialog';
import {
  userInfo,
  WardType,
  DistrictType,
  ProvinceType,
  IInjectionRegistrationResult
} from './types';
import { useInfoSchema } from './schema';
import { ImageDialog } from '../../components/ImageDialog/ImageDialog';
import { StyledButton } from '../../components/StyledButton';

import {
  FileUploadImage,
  IFile
} from '../../components/FileUploadImage/FileUploadImage';
import { getChildArr } from './functions';
import { HeaderTabs } from '../HeaderTabs/HeaderTabs';
import { useUnitAdministrative } from '../../hooks/useUnitAdministrative';

const maxImage = 2;
export const User = () => {
  const { t } = useTranslation();
  const loginSelectorResult = useAppSelector(loginSelector);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [disableCitizendId, setDisableCitizendId] = useState<boolean>(true);
  const [disablePhoneNumber, setDisablePhoneNumber] = useState<boolean>(true);
  const [disablePersonalInfo, setDisablePersonalInfo] = useState<boolean>(true);
  const [disablePassword, setDisablePassword] = useState<boolean>(true);
  const [allowClickDistrict, setAllowClickDistrict] = useState<boolean>(false);
  const [allowClickWard, setAllowClickWard] = useState<boolean>(false);
  const [dataToDialog, setDataToDialog] =
    useState<IInjectionRegistrationResult>();
  const [listImage, setListImage] = useState<Array<IFile>>([]);
  const [showModalImage, setShowModalImage] = useState<boolean>(false);
  const [imageIsShowed, setImageIsShowed] = useState<IFile>();
  const headerTabs = ['Chứng nhận tiêm chủng', 'Kết quả đăng ký', 'Tài khoản'];
  enum tabLocation {
    InjectionConfirm = 0,
    RegistrationResult = 1,
    Account = 2
  }

  const {
    formState: { errors },

    setError,
    clearErrors,
    setValue,
    trigger,
    getValues,
    control
  } = useForm<userInfo>({
    resolver: yupResolver(useInfoSchema) as Resolver<userInfo>,
    mode: 'onChange',
    defaultValues: {
      id: 'abc',
      citizen_id: '123456789',
      phone_number: '0986249793',
      full_name: 'Phạm Công Thành',
      dob: '2000-10-23',
      gender: 'male',
      province_id: 1,
      district_id: 1,
      ward_id: 1,
      new_password: '',
      confirm_password: '',
      password: ''
    }
  });

  const province_id = getValues('province_id');
  const district_id = getValues('district_id');
  const { listProvince } = useUnitAdministrative();
  const listDistrict = useMemo(() => {
    return getChildArr(province_id, listProvince, 'districts');
  }, [province_id, listProvince]);

  const listWard = useMemo(() => {
    return getChildArr(district_id, listDistrict, 'wards');
  }, [district_id, listDistrict]);

  const dataInjectionRegistration = injectionRegistrationResult.filter(
    (injection: IInjectionRegistrationResult) =>
      injection.citizen_id ===
      loginSelectorResult.response?.data?.payload.citizen_id
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  const handleShowInfo = (info: IInjectionRegistrationResult) => {
    setDataToDialog(info);
    setOpen(true);
  };
  const onCloseDialog = () => {
    setOpen(false);
  };
  useEffect(() => {
    switch (activeTab) {
      case tabLocation.InjectionConfirm:
        window.history.pushState({}, '', '/user/vaccination-certificate');
        break;
      case tabLocation.RegistrationResult:
        window.history.pushState({}, '', '/user/registration-result');
        break;
      case tabLocation.Account:
        window.history.pushState({}, '', '/user/my-account');
        break;
    }
  }, [activeTab, tabLocation]);
  // handle file image upload
  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const listImages = Object.values(e.target.files);
      const listPreview = [];
      const listFile: Array<IFile> = [];
      const count =
        e.target.files.length < maxImage ? e.target.files.length : maxImage;
      for (let i = 0; i < count; i++) {
        let preview = URL.createObjectURL(listImages[i]);
        listPreview.push(preview);
        listFile.push({ file: e.target.files[i], preview });
      }
      if (listPreview.length < maxImage && getValues('files')) {
        setValue('files', [...getValues('files'), ...listFile]);
        setListImage((prev: Array<IFile>) => {
          return [...prev, ...listFile];
        });
      } else {
        setValue('files', [...listFile]);
        setListImage((prev: Array<IFile>) => {
          return [...listFile];
        });
      }
    }
  };
  const handleRemoveImage = (index: number) => {
    setError('files', { message: 'Vui lòng chọn đúng 2 ảnh' });
    let listImagePreview = getValues('files');
    if (listImagePreview !== null) {
      listImagePreview.splice(index, 1);
    }
    setValue('files', listImagePreview);
    setListImage((prev: Array<IFile>) => {
      let newListImage = [...prev];
      newListImage.splice(index, 1);
      return newListImage;
    });
  };
  const handleShowModalImage = (image: IFile) => {
    setImageIsShowed(image);
    setShowModalImage(true);
  };
  const onCloseTitleDialog = () => {
    setShowModalImage(false);
  };
  useMemo(() => {
    if (listImage.length < maxImage && !errors.files) {
      setError('files', { message: 'Vui lòng chọn đúng 2 ảnh' });
    } else {
      clearErrors('files');
    }
  }, [errors, listImage, setError, clearErrors]);
  const handleCancelCitizenId = () => {
    setDisableCitizendId(true);
    setValue('files', []);
    setValue('citizen_id', '123456789');
    clearErrors('files');
    clearErrors('citizen_id');
    setListImage([]);
  };
  const handleCancelPhoneNumber = () => {
    setDisablePhoneNumber(true);
    setValue('phone_number', '0986249793');
    clearErrors('phone_number');
  };
  const handleCancelPersonalInfo = () => {
    setDisablePersonalInfo(true);
    setValue('full_name', 'Phạm Công Thành');
    setValue('dob', '2000-10-23');
    setValue('gender', 'male');
    setValue('province_id', 1);
    setValue('district_id', 1);
    setValue('ward_id', 1);
    clearErrors('full_name');
    clearErrors('dob');
    clearErrors('gender');
    clearErrors('province_id');
    clearErrors('district_id');
    clearErrors('ward_id');
  };
  const handleCancelPassword = () => {
    setDisablePassword(true);
  };
  const handleSubmitCitizenId = () => {
    setDisableCitizendId(true);
  };
  const handleSubmitPhoneNumber = () => {
    setDisablePhoneNumber(true);
  };
  const handleSubmitPersonalInfo = () => {
    setDisablePersonalInfo(true);
  };
  const handleSubmitPassword = () => {
    setDisablePassword(true);
  };

  const handleChangeProvince = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue('province_id', Number(e.target.value));
    setAllowClickDistrict(true);
    setValue('district_id', 0);
    setValue('ward_id', 0);
    if (getValues('province_id') !== Number(e.target.value)) {
      setAllowClickWard(false);
    }
    trigger();
  };

  const handleChangeDistrict = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue('district_id', Number(e.target.value));
    setValue('ward_id', 0);
    trigger();
    setAllowClickWard(true);
  };
  const handleChangeWard = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue('ward_id', Number(e.target.value));
    clearErrors('ward_id');
    trigger();
  };
  return loginSelectorResult.response?.data?.accessToken ? (
    <>
      <ImageDialog
        image={imageIsShowed}
        open={showModalImage}
        onClose={onCloseTitleDialog}
      />
      <Header />
      <Box sx={{ minHeight: '500px', mt: '80px' }}>
        <TabContext value={activeTab.toString()}>
          <HeaderTabs
            activeTab={activeTab}
            handleChange={handleChange}
            headerTabs={headerTabs}
          />
          <Box sx={{ marginTop: '48px' }}>
            <Container maxWidth="xl">
              <TabPanel value="0">
                <ConfirmInjection data={lookUpCertificateResult} />
              </TabPanel>
              <TabPanel value="1">
                <InjectionRegistrationDialog
                  open={open}
                  onClose={onCloseDialog}
                  data={dataToDialog}
                />
                <TableInjectionRegistrationResult
                  data={dataInjectionRegistration}
                  handleShowInfo={handleShowInfo}
                />
              </TabPanel>
              <TabPanel value="2">
                <Box component="form">
                  <Stack direction="column" spacing={3}>
                    <Stack direction="column" spacing={2}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body1" sx={{ fontWeight: '500' }}>
                          <Trans>Mã số định danh</Trans>
                        </Typography>
                        <IconButton onClick={() => setDisableCitizendId(false)}>
                          <EditIcon />
                        </IconButton>
                      </Box>
                      <Box>
                        <Box sx={{ ml: 2 }}>
                          <Stack direction="column" spacing={3}>
                            <Grid container spacing={2}>
                              <Grid item xs={3}>
                                <Stack direction="column" spacing={1}>
                                  <Typography component="label" variant="body1">
                                    <Trans>Số CMND/CCCD/Mã định danh</Trans>
                                  </Typography>
                                  <Controller
                                    name="citizen_id"
                                    control={control}
                                    defaultValue="123456789"
                                    render={({
                                      field,
                                      fieldState: { invalid, error }
                                    }) => (
                                      <TextField
                                        size="small"
                                        disabled={disableCitizendId}
                                        helperText={
                                          error?.message
                                            ? t(`${error?.message}`)
                                            : null
                                        }
                                        error={invalid}
                                        placeholder="123456789"
                                        {...field}
                                      />
                                    )}
                                  />
                                </Stack>
                              </Grid>
                            </Grid>
                            {!disableCitizendId && (
                              <FileUploadImage
                                onImageChange={onImageChange}
                                listImage={listImage}
                                handleRemoveImage={handleRemoveImage}
                                handleShowModalImage={handleShowModalImage}
                                maxImage={maxImage}
                                error={errors.files?.message}
                              />
                            )}
                            {!disableCitizendId && (
                              <Stack direction="row" spacing={2}>
                                <StyledButton
                                  size="small"
                                  variant="outlined"
                                  sx={{
                                    color: colors.indigo['700'],
                                    padding: '6px 16px !important'
                                  }}
                                  onClick={handleCancelCitizenId}>
                                  <Trans>Hủy Bỏ</Trans>
                                </StyledButton>
                                <StyledButton
                                  size="small"
                                  variant="contained"
                                  disabled={
                                    !!errors.citizen_id || !!errors.files
                                  }
                                  sx={{
                                    background: colors.indigo['700'],
                                    padding: '6px 16px !important'
                                  }}
                                  onClick={handleSubmitCitizenId}>
                                  <Trans>Lưu</Trans>
                                </StyledButton>
                              </Stack>
                            )}
                          </Stack>
                        </Box>
                      </Box>
                    </Stack>
                    <Stack direction="column" spacing={2}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body1" sx={{ fontWeight: '500' }}>
                          <Trans>Số điện thoại</Trans>
                        </Typography>
                        <IconButton
                          onClick={() => setDisablePhoneNumber(false)}>
                          <EditIcon />
                        </IconButton>
                      </Box>
                      <Box>
                        <Box sx={{ ml: 2 }}>
                          <Stack direction="column" spacing={3}>
                            <Stack direction="column" spacing={2}>
                              <Grid container spacing={2}>
                                <Grid item xs={3}>
                                  <Stack direction="column" spacing={1}>
                                    <Typography
                                      component="label"
                                      variant="body1">
                                      <Trans>Số điện thoại</Trans>
                                    </Typography>
                                    <Controller
                                      name="phone_number"
                                      control={control}
                                      defaultValue="098624979"
                                      render={({
                                        field,
                                        fieldState: { invalid, error }
                                      }) => (
                                        <TextField
                                          size="small"
                                          disabled={disablePhoneNumber}
                                          helperText={
                                            error?.message
                                              ? t(`${error?.message}`)
                                              : null
                                          }
                                          error={invalid}
                                          placeholder="123456789"
                                          {...field}
                                        />
                                      )}
                                    />
                                  </Stack>
                                </Grid>
                              </Grid>
                            </Stack>
                            {!disablePhoneNumber && (
                              <Stack direction="row" spacing={2}>
                                <StyledButton
                                  size="small"
                                  variant="outlined"
                                  onClick={handleCancelPhoneNumber}
                                  sx={{
                                    color: colors.indigo['700'],
                                    padding: '6px 16px !important'
                                  }}>
                                  <Trans>Hủy Bỏ</Trans>
                                </StyledButton>
                                <StyledButton
                                  size="small"
                                  variant="contained"
                                  disabled={!!errors.phone_number}
                                  sx={{
                                    background: colors.indigo['700'],
                                    padding: '6px 16px !important'
                                  }}
                                  onClick={handleSubmitPhoneNumber}>
                                  <Trans>Lưu</Trans>
                                </StyledButton>
                              </Stack>
                            )}
                          </Stack>
                        </Box>
                      </Box>
                    </Stack>
                    <Stack direction="column" spacing={2}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body1" sx={{ fontWeight: '500' }}>
                          <Trans>Thông tin cá nhân</Trans>
                        </Typography>
                        <IconButton
                          onClick={() => setDisablePersonalInfo(false)}>
                          <EditIcon />
                        </IconButton>
                      </Box>
                      <Box>
                        <Box sx={{ ml: 2 }}>
                          <Stack direction="column" spacing={3}>
                            <Stack direction="column" spacing={2}>
                              <Grid container spacing={2}>
                                <Grid item xs={3}>
                                  <Stack direction="column" spacing={1}>
                                    <Typography
                                      component="label"
                                      variant="body1">
                                      <Trans>Họ và tên</Trans>
                                    </Typography>
                                    <Controller
                                      name="full_name"
                                      control={control}
                                      render={({
                                        field,
                                        fieldState: { invalid, error }
                                      }) => (
                                        <TextField
                                          size="small"
                                          defaultValue={getValues('full_name')}
                                          disabled={disablePersonalInfo}
                                          helperText={
                                            error?.message
                                              ? t(`${error?.message}`)
                                              : null
                                          }
                                          error={invalid}
                                          {...field}
                                        />
                                      )}
                                    />
                                  </Stack>
                                </Grid>
                                <Grid item xs={3}>
                                  <Stack direction="column" spacing={1}>
                                    <Typography
                                      component="label"
                                      variant="body1">
                                      <Trans>Ngày sinh</Trans>
                                    </Typography>
                                    <Controller
                                      name="dob"
                                      control={control}
                                      render={({
                                        field,
                                        fieldState: { invalid, error }
                                      }) => (
                                        <TextField
                                          type="date"
                                          defaultValue={getValues('dob')}
                                          size="small"
                                          disabled={disablePersonalInfo}
                                          helperText={
                                            error?.message
                                              ? t(`${error?.message}`)
                                              : null
                                          }
                                          error={invalid}
                                          {...field}
                                        />
                                      )}
                                    />
                                  </Stack>
                                </Grid>
                                <Grid item xs={3}>
                                  <Stack direction="column" spacing={1}>
                                    <Typography
                                      component="label"
                                      variant="body1">
                                      <Trans>Giới tính</Trans>
                                    </Typography>
                                    <Controller
                                      name="gender"
                                      defaultValue="male"
                                      control={control}
                                      render={({
                                        field,
                                        fieldState: { invalid, error }
                                      }) => (
                                        <TextField
                                          size="small"
                                          disabled={disablePersonalInfo}
                                          helperText={
                                            error?.message
                                              ? t(`${error?.message}`)
                                              : null
                                          }
                                          error={invalid}
                                          {...field}
                                          select>
                                          <MenuItem value="male">
                                            <Trans>Nam</Trans>
                                          </MenuItem>
                                          <MenuItem value="female">
                                            <Trans>Nữ</Trans>
                                          </MenuItem>
                                        </TextField>
                                      )}
                                    />
                                  </Stack>
                                </Grid>
                                <Grid item xs={3}></Grid>
                                <Grid item xs={3}>
                                  <Stack direction="column" spacing={1}>
                                    <Typography
                                      component="label"
                                      variant="body1">
                                      <Trans>Tỉnh/Thành phố</Trans>
                                    </Typography>
                                    <Controller
                                      name="province_id"
                                      control={control}
                                      render={({
                                        field,
                                        fieldState: { invalid, error }
                                      }) => (
                                        <TextField
                                          size="small"
                                          disabled={disablePersonalInfo}
                                          helperText={
                                            error?.message
                                              ? t(`${error?.message}`)
                                              : null
                                          }
                                          error={invalid}
                                          {...field}
                                          onChange={(e) =>
                                            handleChangeProvince(e)
                                          }
                                          select>
                                          {listProvince.length > 0
                                            ? listProvince.map(
                                                (value: ProvinceType) => (
                                                  <MenuItem
                                                    value={value.id}
                                                    key={value.id}>
                                                    {value.name}
                                                  </MenuItem>
                                                )
                                              )
                                            : null}
                                        </TextField>
                                      )}
                                    />
                                  </Stack>
                                </Grid>
                                <Grid item xs={3}>
                                  <Stack direction="column" spacing={1}>
                                    <Typography
                                      component="label"
                                      variant="body1">
                                      <Trans>Quận/Huyện</Trans>
                                    </Typography>
                                    <Controller
                                      name="district_id"
                                      control={control}
                                      render={({
                                        field,
                                        fieldState: { invalid, error }
                                      }) => (
                                        <TextField
                                          size="small"
                                          disabled={
                                            disablePersonalInfo ||
                                            !allowClickDistrict
                                          }
                                          helperText={
                                            error?.message
                                              ? t(`${error?.message}`)
                                              : null
                                          }
                                          error={invalid}
                                          {...field}
                                          onChange={(e) =>
                                            handleChangeDistrict(e)
                                          }
                                          select>
                                          {listDistrict.length > 0
                                            ? listDistrict.map(
                                                (value: DistrictType) => (
                                                  <MenuItem
                                                    value={value.id}
                                                    key={value.id}>
                                                    {value.name}
                                                  </MenuItem>
                                                )
                                              )
                                            : null}
                                        </TextField>
                                      )}
                                    />
                                  </Stack>
                                </Grid>
                                <Grid item xs={3}>
                                  <Stack direction="column" spacing={1}>
                                    <Typography
                                      component="label"
                                      variant="body1">
                                      <Trans>Phường/Xã</Trans>
                                    </Typography>
                                    <Controller
                                      name="ward_id"
                                      control={control}
                                      render={({
                                        field,
                                        fieldState: { invalid, error }
                                      }) => (
                                        <TextField
                                          size="small"
                                          disabled={
                                            disablePersonalInfo ||
                                            !allowClickWard
                                          }
                                          helperText={
                                            error?.message
                                              ? t(`${error?.message}`)
                                              : null
                                          }
                                          error={invalid}
                                          {...field}
                                          onChange={(e) => handleChangeWard(e)}
                                          select>
                                          {listWard.length > 0
                                            ? listWard.map(
                                                (value: WardType) => (
                                                  <MenuItem
                                                    value={value.id}
                                                    key={value.id}>
                                                    {value.name}
                                                  </MenuItem>
                                                )
                                              )
                                            : null}
                                        </TextField>
                                      )}
                                    />
                                  </Stack>
                                </Grid>
                                <Grid item xs={3}></Grid>
                              </Grid>
                            </Stack>
                            {!disablePersonalInfo && (
                              <Stack direction="row" spacing={2}>
                                <StyledButton
                                  size="small"
                                  variant="outlined"
                                  onClick={handleCancelPersonalInfo}
                                  sx={{
                                    color: colors.indigo['700'],
                                    padding: '6px 16px !important'
                                  }}>
                                  <Trans>Hủy Bỏ</Trans>
                                </StyledButton>
                                <StyledButton
                                  size="small"
                                  variant="contained"
                                  disabled={
                                    !!errors.full_name ||
                                    !!errors.dob ||
                                    !!errors.gender ||
                                    !!errors.province_id ||
                                    !!errors.district_id ||
                                    !!errors.ward_id
                                  }
                                  sx={{
                                    background: colors.indigo['700'],
                                    padding: '6px 16px !important'
                                  }}
                                  onClick={handleSubmitPersonalInfo}>
                                  <Trans>Lưu</Trans>
                                </StyledButton>
                              </Stack>
                            )}
                          </Stack>
                        </Box>
                      </Box>
                    </Stack>
                    <Stack direction="column" spacing={2}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body1" sx={{ fontWeight: '500' }}>
                          <Trans>Mật khẩu</Trans>
                        </Typography>
                        <IconButton onClick={() => setDisablePassword(false)}>
                          <EditIcon />
                        </IconButton>
                      </Box>
                      <Box>
                        <Box sx={{ ml: 2 }}>
                          <Stack direction="column" spacing={3}>
                            <Stack direction="column" spacing={2}>
                              <Grid container>
                                <Grid item xs={3}>
                                  <Stack direction="column" spacing={1}>
                                    <Typography
                                      component="label"
                                      variant="body1">
                                      <Trans>Mật khẩu mới</Trans>
                                    </Typography>
                                    <Controller
                                      name="new_password"
                                      control={control}
                                      render={({
                                        field,
                                        fieldState: { invalid, error }
                                      }) => (
                                        <TextField
                                          size="small"
                                          disabled={disablePassword}
                                          helperText={
                                            error?.message
                                              ? t(`${error?.message}`)
                                              : null
                                          }
                                          error={invalid}
                                          placeholder="123456789"
                                          {...field}
                                        />
                                      )}
                                    />
                                  </Stack>
                                </Grid>
                              </Grid>

                              <Grid container>
                                <Grid item xs={3}>
                                  <Stack direction="column" spacing={1}>
                                    <Typography
                                      component="label"
                                      variant="body1">
                                      <Trans>Xác nhận lại mật khẩu</Trans>
                                    </Typography>
                                    <Controller
                                      name="confirm_password"
                                      control={control}
                                      render={({
                                        field,
                                        fieldState: { invalid, error }
                                      }) => (
                                        <TextField
                                          size="small"
                                          disabled={disablePassword}
                                          helperText={
                                            error?.message
                                              ? t(`${error?.message}`)
                                              : null
                                          }
                                          error={invalid}
                                          placeholder="123456789"
                                          {...field}
                                        />
                                      )}
                                    />
                                  </Stack>
                                </Grid>
                              </Grid>
                            </Stack>
                            {!disablePassword && (
                              <Stack direction="row" spacing={2}>
                                <StyledButton
                                  size="small"
                                  variant="outlined"
                                  onClick={handleCancelPassword}
                                  sx={{
                                    color: colors.indigo['700'],
                                    padding: '6px 16px !important'
                                  }}>
                                  <Trans>Hủy Bỏ</Trans>
                                </StyledButton>
                                <StyledButton
                                  size="small"
                                  variant="contained"
                                  disabled={
                                    !!errors.password ||
                                    !!errors.confirm_password
                                  }
                                  sx={{
                                    background: colors.indigo['700'],
                                    padding: '6px 16px !important'
                                  }}
                                  onClick={handleSubmitPassword}>
                                  <Trans>Lưu</Trans>
                                </StyledButton>
                              </Stack>
                            )}
                          </Stack>
                        </Box>
                      </Box>
                    </Stack>
                  </Stack>
                </Box>
              </TabPanel>
            </Container>
          </Box>
        </TabContext>
      </Box>
      <Footer />
    </>
  ) : (
    <Navigate to="/login" />
  );
};
