import { PersonalInformationTable } from '../../components/PersonalInformationTable/PersonalInformationTable';
import { Trans } from 'react-i18next';
import { StyledButton } from '../../components';
import { colors } from '@mui/material';
import { useGetPersonalInformation } from '../../hooks/usePersonalInformation';
import { useState } from 'react';
import { PersonalInformationCreateDialog } from '../../components/PersonalInformationCreateDialog/PersonalInformationCreateDialog';

export const PersonalInformation = () => {
  const { personalInformations, reFetchPersonalInformations } =
    useGetPersonalInformation();
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const handleCloseCreateModal = () => setOpenCreateModal(false);
  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  return (
    <>
      <PersonalInformationCreateDialog
        onClose={handleCloseCreateModal}
        open={openCreateModal}
        handleRefetch={reFetchPersonalInformations}
      />
      <StyledButton
        sx={{
          background: colors.indigo['700'],
          color: '#fff',
          '&:hover': {
            background: colors.indigo['600']
          },
          display: 'block',
          marginLeft: 'auto'
        }}
        variant="contained"
        onClick={handleOpenCreateModal}>
        <Trans>Thêm Thông tin cá nhân</Trans>
      </StyledButton>
      <PersonalInformationTable
        dataBody={personalInformations}
        handleRefetch={reFetchPersonalInformations}
      />
    </>
  );
};
