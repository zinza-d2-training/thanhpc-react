import { useState, useEffect, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import {
  Stack,
  Box,
  Container,
  TextField,
  colors,
  Tabs,
  Grid,
  Tab,
  IconButton,
  Typography
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler, Controller, Resolver } from 'react-hook-form';

import EditIcon from '@mui/icons-material/Edit';
import { useAppSelector } from '../../store/hooks';
import { loginSelector } from '../../features/login/loginSlice';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { TabPanel } from '../../components/TabPanel/TabPanel';
import { ConfirmInjection } from '../../components/ConfirmInjection/ConfirmInjection';
import { lookUpCertificateResult } from '../../db/lookUpCertificateResult';
import { TableInjectionRegistrationResult } from '../../components/TableInjectionRegistrationResult/TableInjectionRegistrationResult';
import { injectionRegistrationResult } from '../../db/injectionRegistration';
import { IInjectionRegistrationResult } from '../../pages/InjectionRegistration/types';
import { InjectionRegistrationDialog } from '../../components/InjectionRegistrationDialog/InjectionRegistrationDialog';
import { userInfo } from './types';
import { registerSchema } from '../../pages/Register/schema';
import { ImageDialog } from '../../components/ImageDialog/ImageDialog';
import { StyledButton } from '../../components/StyledButton';

import { FileUploadImage } from '../../components/FileUploadImage/FileUploadImage';

const useStyle = {
  color: '#333 !important'
};
interface IFile {
  file?: File | undefined;
  preview: string;
}
const maxImage = 2;
export const User = () => {
  const loginSelectorResult = useAppSelector(loginSelector);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
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
    getValues,
    control
  } = useForm<userInfo>({
    resolver: yupResolver(registerSchema) as Resolver<userInfo>,
    mode: 'onChange',
    defaultValues: {
      id: 'abc',
      citizenId: '123456789',
      phone_number: '0986249793',
      full_name: 'Pham Cong Thanh',
      dob: new Date('2000-23-10'),
      gender: 'male',
      provinceId: '01',
      districtId: '001',
      wardId: '00001',
      new_password: '',
      confirm_password: '',
      password: ''
    }
  });
  const dataInjectionRegistration = injectionRegistrationResult.filter(
    (injection: IInjectionRegistrationResult) =>
      injection.citizenId === loginSelectorResult.response?.data?.user.citizenId
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
      if (listPreview.length < maxImage && getValues('images')) {
        setValue('images', [...getValues('images'), ...listFile]);
        setListImage((prev: Array<IFile>) => {
          return [...prev, ...listFile];
        });
      } else {
        setValue('images', [...listFile]);
        setListImage((prev: Array<IFile>) => {
          return [...listFile];
        });
      }
    }
  };
  const handleRemoveImage = (index: number) => {
    setError('images', { message: 'Vui lòng chọn đúng 2 ảnh' });
    let listImagePreview = getValues('images');
    if (listImagePreview !== null) {
      listImagePreview.splice(index, 1);
    }
    setValue('images', listImagePreview);
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
    if (listImage.length < maxImage && !errors.images) {
      setError('images', { message: 'Vui lòng chọn đúng 2 ảnh' });
    } else {
      clearErrors('images');
    }
  }, [errors, listImage, setError, clearErrors]);
  return loginSelectorResult.response?.data?.token ? (
    <>
      <ImageDialog
        image={imageIsShowed}
        open={showModalImage}
        onClose={onCloseTitleDialog}
      />
      <Header />
      <Box sx={{ minHeight: '500px', mt: '80px' }}>
        <Box sx={{ boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.1)' }}>
          <Container maxWidth="xl">
            <Box sx={{ color: '#6E6D7A', cursor: 'pointer' }}>
              <Tabs
                value={activeTab}
                onChange={handleChange}
                sx={{
                  height: '64px',
                  '.css-jpln7h-MuiTabs-scroller': {
                    display: 'flex'
                  }
                }}
                TabIndicatorProps={{
                  style: {
                    backgroundColor: '#333'
                  }
                }}
                aria-label="basic tabs example">
                {headerTabs.map((tab, index) => (
                  <Tab
                    key={index}
                    label={tab}
                    sx={activeTab === index ? useStyle : null}
                  />
                ))}
              </Tabs>
            </Box>
          </Container>
        </Box>
        <Box sx={{ marginTop: '48px' }}>
          <Container maxWidth="xl">
            <TabPanel value={activeTab} index={0}>
              <ConfirmInjection data={lookUpCertificateResult} />
            </TabPanel>
            <TabPanel value={activeTab} index={1}>
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
            <TabPanel value={activeTab} index={2}>
              <Box component="form">
                <Stack direction="column" spacing={3}>
                  <Stack direction="column" spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body1" sx={{ fontWeight: '500' }}>
                        Mã số định danh
                      </Typography>
                      <IconButton
                      // onClick={handleToggleCitizenIdEditable}
                      >
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
                                  Số CMND/CCCD/Mã định danh
                                </Typography>
                                <Controller
                                  name="citizenId"
                                  control={control}
                                  defaultValue="123456789"
                                  render={({ field }) => (
                                    <TextField
                                      size="small"
                                      // helperText={
                                      //   errors.citizenId?.message
                                      //     ? errors.citizenId?.message
                                      //     : null
                                      // }
                                      // error={errors.citizenId?.message ? true : false}
                                      placeholder="123456789"
                                      {...field}
                                    />
                                  )}
                                />
                              </Stack>
                            </Grid>
                          </Grid>
                          <FileUploadImage
                            onImageChange={onImageChange}
                            listImage={listImage}
                            handleRemoveImage={handleRemoveImage}
                            handleShowModalImage={handleShowModalImage}
                            maxImage={maxImage}
                            error={errors.images?.message}
                          />
                          <Stack direction="row" spacing={2}>
                            <StyledButton
                              size="small"
                              variant="outlined"
                              sx={{
                                color: colors.indigo['700'],
                                padding: '6px 16px !important'
                              }}>
                              Hủy Bỏ
                            </StyledButton>
                            <StyledButton
                              size="small"
                              variant="contained"
                              sx={{
                                background: colors.indigo['700'],
                                padding: '6px 16px !important'
                              }}>
                              Lưu
                            </StyledButton>
                          </Stack>
                        </Stack>
                      </Box>
                    </Box>
                  </Stack>
                  <Stack direction="column" spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body1" sx={{ fontWeight: '500' }}>
                        Số điện thoại
                      </Typography>
                      <IconButton
                      // onClick={handleToggleCitizenIdEditable}
                      >
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
                                  <Typography component="label" variant="body1">
                                    Số điện thoại
                                  </Typography>
                                  <Controller
                                    name="phone_number"
                                    control={control}
                                    defaultValue="098624979"
                                    render={({ field }) => (
                                      <TextField
                                        size="small"
                                        // helperText={
                                        //   errors.citizenId?.message
                                        //     ? errors.citizenId?.message
                                        //     : null
                                        // }
                                        // error={errors.citizenId?.message ? true : false}
                                        placeholder="123456789"
                                        {...field}
                                      />
                                    )}
                                  />
                                </Stack>
                              </Grid>
                              <Grid item xs={3}>
                                <Stack direction="column" spacing={1}>
                                  <Typography component="label" variant="body1">
                                    Ngày sinh
                                  </Typography>
                                  <Controller
                                    name="dob"
                                    control={control}
                                    render={({ field }) => (
                                      <TextField
                                        type="date"
                                        size="small"
                                        // helperText={
                                        //   errors.citizenId?.message
                                        //     ? errors.citizenId?.message
                                        //     : null
                                        // }
                                        // error={errors.citizenId?.message ? true : false}
                                        {...field}
                                      />
                                    )}
                                  />
                                </Stack>
                              </Grid>
                              <Grid item xs={3}>
                                <Stack direction="column" spacing={1}>
                                  <Typography component="label" variant="body1">
                                    Tỉnh/Thành phố
                                  </Typography>
                                  <Controller
                                    name="provinceId"
                                    control={control}
                                    defaultValue="098624979"
                                    render={({ field }) => (
                                      <TextField
                                        size="small"
                                        // helperText={
                                        //   errors.citizenId?.message
                                        //     ? errors.citizenId?.message
                                        //     : null
                                        // }
                                        // error={errors.citizenId?.message ? true : false}
                                        placeholder="123456789"
                                        {...field}
                                      />
                                    )}
                                  />
                                </Stack>
                              </Grid>
                              <Grid item xs={3}></Grid>
                              <Grid item xs={3}>
                                <Stack direction="column" spacing={1}>
                                  <Typography component="label" variant="body1">
                                    Quận/Huyện
                                  </Typography>
                                  <Controller
                                    name="districtId"
                                    control={control}
                                    defaultValue="098624979"
                                    render={({ field }) => (
                                      <TextField
                                        size="small"
                                        // helperText={
                                        //   errors.citizenId?.message
                                        //     ? errors.citizenId?.message
                                        //     : null
                                        // }
                                        // error={errors.citizenId?.message ? true : false}
                                        placeholder="123456789"
                                        {...field}
                                      />
                                    )}
                                  />
                                </Stack>
                              </Grid>
                              <Grid item xs={3}>
                                <Stack direction="column" spacing={1}>
                                  <Typography component="label" variant="body1">
                                    Phường/Xã
                                  </Typography>
                                  <Controller
                                    name="wardId"
                                    control={control}
                                    defaultValue="098624979"
                                    render={({ field }) => (
                                      <TextField
                                        size="small"
                                        // helperText={
                                        //   errors.citizenId?.message
                                        //     ? errors.citizenId?.message
                                        //     : null
                                        // }
                                        // error={errors.citizenId?.message ? true : false}
                                        placeholder="123456789"
                                        {...field}
                                      />
                                    )}
                                  />
                                </Stack>
                              </Grid>
                              <Grid item xs={3}>
                                <Stack direction="column" spacing={1}>
                                  <Typography component="label" variant="body1">
                                    Số điện thoại
                                  </Typography>
                                  <Controller
                                    name="phone_number"
                                    control={control}
                                    defaultValue="098624979"
                                    render={({ field }) => (
                                      <TextField
                                        size="small"
                                        // helperText={
                                        //   errors.citizenId?.message
                                        //     ? errors.citizenId?.message
                                        //     : null
                                        // }
                                        // error={errors.citizenId?.message ? true : false}
                                        placeholder="123456789"
                                        {...field}
                                      />
                                    )}
                                  />
                                </Stack>
                              </Grid>
                              <Grid item xs={3}></Grid>
                            </Grid>
                          </Stack>
                          <Stack direction="row" spacing={2}>
                            <StyledButton
                              size="small"
                              variant="outlined"
                              sx={{
                                color: colors.indigo['700'],
                                padding: '6px 16px !important'
                              }}>
                              Hủy Bỏ
                            </StyledButton>
                            <StyledButton
                              size="small"
                              variant="contained"
                              sx={{
                                background: colors.indigo['700'],
                                padding: '6px 16px !important'
                              }}>
                              Lưu
                            </StyledButton>
                          </Stack>
                        </Stack>
                      </Box>
                    </Box>
                  </Stack>
                  <Stack direction="column" spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body1" sx={{ fontWeight: '500' }}>
                        Mật khẩu
                      </Typography>
                      <IconButton
                      // onClick={handleToggleCitizenIdEditable}
                      >
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
                                  <Typography component="label" variant="body1">
                                    Mật khẩu mới
                                  </Typography>
                                  <Controller
                                    name="new_password"
                                    control={control}
                                    defaultValue="098624979"
                                    render={({ field }) => (
                                      <TextField
                                        size="small"
                                        // helperText={
                                        //   errors.citizenId?.message
                                        //     ? errors.citizenId?.message
                                        //     : null
                                        // }
                                        // error={errors.citizenId?.message ? true : false}
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
                                  <Typography component="label" variant="body1">
                                    Xác nhận lại mật khẩu
                                  </Typography>
                                  <Controller
                                    name="confirm_password"
                                    control={control}
                                    defaultValue="098624979"
                                    render={({ field }) => (
                                      <TextField
                                        size="small"
                                        // helperText={
                                        //   errors.citizenId?.message
                                        //     ? errors.citizenId?.message
                                        //     : null
                                        // }
                                        // error={errors.citizenId?.message ? true : false}
                                        placeholder="123456789"
                                        {...field}
                                      />
                                    )}
                                  />
                                </Stack>
                              </Grid>
                            </Grid>
                          </Stack>
                          <Stack direction="row" spacing={2}>
                            <StyledButton
                              size="small"
                              variant="outlined"
                              sx={{
                                color: colors.indigo['700'],
                                padding: '6px 16px !important'
                              }}>
                              Hủy Bỏ
                            </StyledButton>
                            <StyledButton
                              size="small"
                              variant="contained"
                              sx={{
                                background: colors.indigo['700'],
                                padding: '6px 16px !important'
                              }}>
                              Lưu
                            </StyledButton>
                          </Stack>
                        </Stack>
                      </Box>
                    </Box>
                  </Stack>
                </Stack>
              </Box>
            </TabPanel>
          </Container>
        </Box>
      </Box>
      <Footer />
    </>
  ) : (
    <Navigate to="/login" />
  );
};
