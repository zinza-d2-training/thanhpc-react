import { VaccinationSiteTable } from '../../components/VaccinationSiteTable/VaccinationSiteTable';
import { Trans } from 'react-i18next';
import { StyledButton } from '../../components';
import { colors } from '@mui/material';
import { useGetVaccinationSite } from '../../hooks/useVaccinationSite';
import { useState } from 'react';
import { VaccinationSiteCreateDialog } from '../../components/VaccinationSiteCreateDialog/VaccinationSiteCreateDialog';

export const VaccinationSite = () => {
  const { vaccinationSites, reFetchVaccinationSites } = useGetVaccinationSite();
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const handleCloseCreateModal = () => setOpenCreateModal(false);
  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  return (
    <>
      <VaccinationSiteCreateDialog
        onClose={handleCloseCreateModal}
        open={openCreateModal}
        handleRefetch={reFetchVaccinationSites}
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
        <Trans>Thêm điểm tiêm</Trans>
      </StyledButton>
      <VaccinationSiteTable
        dataBody={vaccinationSites}
        handleRefetch={reFetchVaccinationSites}
      />
    </>
  );
};
