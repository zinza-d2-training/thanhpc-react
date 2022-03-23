import { useEffect, useState, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Box, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

import { ImageDialog } from '../../components/ImageDialog/ImageDialog';

import {
  FileUploadImage,
  IFile
} from '../../components/FileUploadImage/FileUploadImage';

import { Label } from '../../components/Label';
import { UserFormData } from './types';

interface Props {
  handleDisable: (isHaveErrors: boolean, length: number) => void;
  maxImage: number;
  methods: UseFormReturn<UserFormData, object>;
}
export const StepOne = (props: Props) => {
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
    return !!errors.citizen_id || !!errors.password || !!errors.images;
  }, [errors.citizen_id, errors.password, errors.images]);

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
            name="citizen_id"
            control={control}
            defaultValue="123456789"
            render={({ field }) => (
              <TextField
                fullWidth
                helperText={
                  errors.citizen_id?.message ? errors.citizen_id?.message : null
                }
                autoComplete="on"
                error={errors.citizen_id?.message ? true : false}
                placeholder="123456789"
                {...field}
                sx={{ root: { height: '50px' }, mt: 1 }}
              />
            )}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Label required={true}></Label>
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
        <FileUploadImage
          title="Ảnh chụp CMND/CCCD 2 mặt"
          onImageChange={onImageChange}
          listImage={listImage}
          handleRemoveImage={handleRemoveImage}
          handleShowModalImage={handleShowModalImage}
          maxImage={maxImage}
          error={errors.images?.message}
        />
      </Box>
    </>
  );
};
