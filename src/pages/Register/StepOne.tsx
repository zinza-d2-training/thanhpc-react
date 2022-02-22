import { useEffect, useState, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { ImageDialog } from '../../components/ImageDialog/ImageDialog';

import { Box, Typography, TextField, colors } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { FileUpload } from '../../components/FileUpload/FileUpload';

import { Label } from '../../components/Label';
import { UserFormData } from './types';
interface IFile {
  file?: File | undefined;
  preview: string;
}
interface Props {
  handleDisable: (isHaveErrors: boolean, length: number) => void;
  maxImage: number;
  methods: UseFormReturn<UserFormData, object>;
}
export const StepOne = (props: Props) => {
  const { register } = useFormContext();
  const [listImage, setListImage] = useState<Array<IFile>>([]);
  const [showModalImage, setShowModalImage] = useState<boolean>(false);
  const [imageIsShowed, setImageIsShowed] = useState<IFile>();

  // react form hook lib
  const {
    formState: { errors },

    setError,
    clearErrors,
    setValue,
    getValues,
    control
  } = props.methods;

  const { handleDisable, maxImage } = props;
  const isHaveErrors = useMemo(() => {
    return !!errors.citizenId || !!errors.password || !!errors.images;
  }, [errors.citizenId, errors.password, errors.images]);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log(getValues('images'));
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
  }, [errors, listImage, setError, clearErrors, maxImage]);
  useEffect(() => {
    handleDisable(isHaveErrors, listImage.length);
  }, [
    isHaveErrors,
    handleDisable,
    listImage,
    setError,
    errors.images,
    clearErrors
  ]);
  useEffect(() => {
    if (getValues('images')) {
      setListImage(getValues('images'));
    }
  }, [setListImage, getValues]);
  return (
    <>
      <ImageDialog
        image={imageIsShowed}
        open={showModalImage}
        onClose={onCloseTitleDialog}
      />
      <Box>
        <Box sx={{ mb: 2 }}>
          <Label required={true}>Chứng minh nhân dân/Căn cước công dân</Label>
          <Controller
            name="citizenId"
            control={control}
            defaultValue="123456789"
            render={({ field }) => (
              <TextField
                fullWidth
                helperText={
                  errors.citizenId?.message ? errors.citizenId?.message : null
                }
                autoComplete="on"
                error={errors.citizenId?.message ? true : false}
                placeholder="123456789"
                {...field}
                sx={{ root: { height: '50px' }, mt: 1 }}
              />
            )}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Label required={true}>Mật khẩu</Label>
          <Controller
            name="password"
            control={control}
            defaultValue="password123"
            render={({ field }) => (
              <TextField
                fullWidth
                type="password"
                placeholder="***********"
                autoComplete="on"
                helperText={
                  errors.password?.message ? errors.password?.message : null
                }
                error={errors.password?.message ? true : false}
                {...field}
                sx={{ root: { height: '50px' }, mt: 1 }}
              />
            )}
          />
        </Box>
        <Box>
          <Label required={true}>Ảnh chụp CMND/CCCD 2 mặt</Label>
          <Box
            sx={{
              mt: 2,
              border: '1px solid #D9D9D9',
              borderRadius: 1,
              p: 1,
              display: 'flex'
            }}>
            {listImage.map((image, index) => (
              <Box
                key={image.preview}
                sx={{
                  border: '1px solid #D9D9D9',
                  position: 'relative',
                  borderRadius: 1,
                  p: 1,
                  m: 1,
                  height: '100px',
                  width: '100px',
                  '&:hover': {
                    cursor: 'pointer',
                    '.image-upload': {
                      transform: 'scale(1.2)',
                      transition: 'all .2s',
                      visibility: 'visible',
                      border: 'none'
                    },
                    '.icon-view': {
                      display: 'block',
                      transition: 'all .2s'
                    },
                    '.icon-remove': {
                      display: 'block',
                      transition: 'all .2s'
                    },
                    '.overlay': {
                      opacity: 1
                    }
                  }
                }}>
                <Box
                  className="overlay"
                  sx={{
                    position: 'absolute',
                    top: '2px',
                    left: '2px',
                    bottom: '2px',
                    right: '2px',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    opacity: 0,
                    zIndex: 2,
                    borderRadius: 1,
                    transition: '.2s'
                  }}
                />
                <Box
                  className="image-upload"
                  component="img"
                  sx={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'contain',
                    verticalAlign: 'middle',
                    borderRadius: '10px',
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    right: '0',
                    bottom: '0',
                    padding: '10px',
                    zIndex: 1
                  }}
                  alt=""
                  src={image.preview}
                />
                <VisibilityIcon
                  className="icon-view"
                  onClick={() => handleShowModalImage(image)}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    right: '50%',
                    zIndex: 3,
                    display: 'none',
                    color: '#fff'
                  }}
                />
                <DeleteOutlinedIcon
                  onClick={() => handleRemoveImage(index)}
                  className="icon-remove"
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    zIndex: 3,
                    transform: 'translateY(-50%)',
                    left: '50%',
                    display: 'none',
                    color: '#fff'
                  }}
                />
              </Box>
            ))}
            {listImage.length < maxImage && (
              <FileUpload
                register={register}
                onImageChange={onImageChange}
                validateField="image"
              />
            )}
          </Box>
          <Typography sx={{ color: colors.red['600'], mt: 1, ml: 0.5 }}>
            {errors.images?.message}
          </Typography>
        </Box>
      </Box>
    </>
  );
};