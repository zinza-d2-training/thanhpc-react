import { Typography, Button, colors, Box } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Trans } from 'react-i18next';

import { Label } from '../Label';

export interface IFile {
  file?: File | undefined;
  preview: string;
}
interface Props {
  title?: string;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  listImage: IFile[];
  handleRemoveImage: (index: number) => void;
  handleShowModalImage: (image: IFile) => void;
  maxImage: number;
  error: string | undefined;
}

export const FileUploadImage = (props: Props) => {
  const {
    title,
    onImageChange,
    listImage,
    handleRemoveImage,
    handleShowModalImage,
    maxImage,
    error
  } = props;
  const maxWidth = 200 * maxImage;
  return (
    <Box sx={{ maxWidth: `${maxWidth}px` }}>
      {title && <Label required={true}>{title}</Label>}
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
              className="image-input"
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
      </Box>
      <Typography sx={{ color: colors.red['600'], mt: 1, ml: 0.5 }}>
        <Trans>{error}</Trans>
      </Typography>
    </Box>
  );
};
