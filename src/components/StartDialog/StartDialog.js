import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectLanguage, SelectResourcesLanguages, DialogUI } from '../../components/';

import {
  Button,
  Divider,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
  makeStyles,
} from '@material-ui/core';

import Base from './Base';
import { AppContext, ReferenceContext } from '../../context';

import { resetWorkspace } from '../../helper';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  divider: { marginTop: theme.spacing(2), marginBottom: theme.spacing(2) },
}));

function StartDialog() {
  const { t } = useTranslation();
  const {
    actions: { setOpenStartDialog, setLoadIntro, setAppConfig },
    state: { openStartDialog, currentLanguage },
  } = useContext(AppContext);
  const {
    state: {
      referenceSelected: { bookId },
    },
    actions: { goToBookChapterVerse },
  } = useContext(ReferenceContext);

  const handleClose = () => {
    setOpenStartDialog(false);
    setOpenDialog(false);
    setLoadIntro(true);
  };
  const [openDialog, setOpenDialog] = React.useState(openStartDialog);
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <SelectLanguage style={{ maxWidth: '250px' }} />;
      case 1:
        return <SelectResourcesLanguages />;
      default:
        return '';
    }
  }

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const steps = [
    { label: t('Interface_lang'), instruction: t('Choose_language') },
    {
      label: t('Resource_langs'),
      instruction: t('Choose_languages_resources'),
    },
  ];
  React.useEffect(() => {
    if (activeStep > steps.length - 1) {
      resetWorkspace({
        bookId,
        setAppConfig,
        goToBookChapterVerse,
        currentLanguage,
        resetAll: true,
      });
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep, setOpenStartDialog, steps.length]);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <DialogUI open={openDialog} onClose={handleClose}>
      <Base>
        <div style={{ textAlign: 'center' }}>
          {activeStep < steps.length && (
            <Typography variant="h5">{steps[activeStep].label}</Typography>
          )}
        </div>
        <Divider className={classes.divider} />
        <div className={classes.root} style={{ textAlign: 'center' }}>
          <Stepper
            activeStep={activeStep}
            style={{ padding: '20px 6px' }}
            orientation={'vertical'}
          >
            {/** TODO i tried to remove stepper to other component, but i can't raised state to up  */}
            {steps.map((step) => (
              <Step key={step.label}>
                <StepLabel>{step.instruction}</StepLabel>
                <StepContent>{getStepContent(activeStep)}</StepContent>
              </Step>
            ))}
          </Stepper>
          <Divider className={classes.divider} />
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button
              onClick={activeStep === 0 ? handleClose : handleBack}
              className={classes.backButton}
            >
              {activeStep === 0 ? 'Cancel' : 'Back'}
            </Button>
            <Button variant="contained" color="primary" onClick={handleNext}>
              {activeStep < steps.length - 1 ? 'Next' : 'Finish'}
            </Button>
          </div>
        </div>
      </Base>
    </DialogUI>
  );
}

export default StartDialog;
