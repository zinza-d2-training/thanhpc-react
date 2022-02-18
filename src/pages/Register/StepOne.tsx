import { useEffect, useState } from 'react';
import { ImageDialog } from '../../components/ImageDialog/ImageDialog';

import { Box, Typography, TextField, Button, colors } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Controller, useForm, useFormContext } from 'react-hook-form';

import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const Input = styled('input')({
  display: 'none'
});
interface Props {
  handleDisable: any;
}
interface IFile {
  file?: File | undefined;
  preview: string;
}
export const StepOne = (props: Props) => {
  const { handleDisable } = props;
  const { register } = useFormContext();
  const [listImage, setListImage] = useState<Array<IFile>>([]);
  const [showModalImage, setShowModalImage] = useState<boolean>(false);
  const [imageIsShowed, setImageIsShowed] = useState<any>();

  const {
    formState: { errors, isValid },
    control
  } = useFormContext();

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      const preview = URL.createObjectURL(img);
      setListImage((prev: Array<IFile>) => {
        return [...prev, { file: img, preview }];
      });
    }
  };
  const handleRemoveImage = (index: number) => {
    setListImage((prev: Array<IFile>) => {
      let newListImage = [...prev];
      newListImage.splice(index, 1);
      return newListImage;
    });
  };
  const handleShowModalImage = (image: any) => {
    setImageIsShowed(image);
    setShowModalImage(true);
  };
  const onCloseTitleDialog = () => {
    setShowModalImage(false);
  };
  useEffect(() => {
    handleDisable(isValid, listImage.length);
  }, [handleDisable, isValid, listImage]);
  return (
    <>
      <ImageDialog
        image={imageIsShowed}
        open={showModalImage}
        onClose={onCloseTitleDialog}
      />
      <Box>
        <Box sx={{ mb: 2, px: 14 }}>
          <Typography component="label" variant="body1">
            Chứng minh nhân dân/Căn cước công dân
          </Typography>
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
                error={errors.citizenId?.message ? true : false}
                placeholder="123456789"
                {...field}
                sx={{ root: { height: '50px' }, mt: 1 }}
              />
            )}
          />
        </Box>
        <Box sx={{ mb: 2, px: 14 }}>
          <Typography component="label" variant="body1">
            Mật khẩu
          </Typography>
          <Controller
            name="password"
            control={control}
            defaultValue="password123"
            render={({ field }) => (
              <TextField
                fullWidth
                type="password"
                placeholder="***********"
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
        <Box
          sx={{
            px: 14
          }}>
          <Typography component="label" variant="body1">
            Ảnh chụp CMND/CCCD 2 mặt
          </Typography>
          <Box
            sx={{
              mt: 2,
              border: '1px solid #D9D9D9',
              borderRadius: 1,
              p: 1,
              display: 'flex'
            }}>
            {listImage.length < 2 && (
              <Typography
                sx={{
                  m: 1,
                  '.image-input': {
                    display: 'none'
                  }
                }}
                component="label"
                htmlFor="contained-button-file">
                <input
                  // name="image"
                  // helperText={
                  //   errors.citizenId?.message ? errors.citizenId?.message : null
                  // }
                  // error={errors.citizenId?.message ? true : false}
                  className="image-input"
                  {...register('image')}
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={onImageChange}
                />
                <Button
                  component="span"
                  variant="outlined"
                  sx={{
                    width: '100px',
                    height: '100px',
                    background: colors.grey['100'],
                    border: '1px dashed #D9D9D9',
                    color: 'rgba(0, 0, 0, 0.87)',
                    '&:hover': {
                      border: '1px dashed #1E88E5'
                    }
                  }}>
                  + Upload
                </Button>
              </Typography>
            )}
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
          </Box>
        </Box>
      </Box>
    </>
  );
};
