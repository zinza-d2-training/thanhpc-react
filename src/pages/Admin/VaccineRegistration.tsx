import { VaccineRegistrationTable } from '../../components/VaccineRegistrationTable/VaccineRegistrationTable';
import { Trans } from 'react-i18next';
import { StyledButton } from '../../components';
import { colors } from '@mui/material';
import { useGetVaccineRegistration } from '../../hooks/useVaccineRegistration';
import { useState } from 'react';
import { VaccineRegistrationCreateDialog } from '../../components/VaccineRegistrationCreateDialog/VaccineRegistrationCreateDialog';

export const VaccineRegistration = () => {
  const { vaccineRegistrations, reFetchVaccineRegistrations } =
    useGetVaccineRegistration();
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const handleCloseCreateModal = () => setOpenCreateModal(false);
  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  return (
    <>
      <VaccineRegistrationCreateDialog
        onClose={handleCloseCreateModal}
        open={openCreateModal}
        handleRefetch={reFetchVaccineRegistrations}
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
        <Trans>Thêm bản đăng ký</Trans>
      </StyledButton>
      <VaccineRegistrationTable
        dataBody={vaccineRegistrations}
        handleRefetch={reFetchVaccineRegistrations}
      />
    </>
  );
};
