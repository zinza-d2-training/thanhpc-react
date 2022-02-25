import { Typography, Button, colors } from '@mui/material';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface Props {
  register: UseFormRegister<FieldValues>;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validateField: string;
}

export const FileUpload = (props: Props) => {
  const { register, onImageChange, validateField } = props;

  return (
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
        {...register(validateField)}
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
  );
};
