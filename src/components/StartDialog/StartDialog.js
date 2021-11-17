import React, { useContext, useState, useEffect } from 'react';
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
} from '@material-ui/core';

import Base from './Base';
import { AppContext, ReferenceContext } from '../../context';

import { useStyles } from './style';
import { resetWorkspace } from '../../helper';

function StartDialog() {
  const { t } = useTranslation();
  const classes = useStyles();

  const {
    actions: { setOpenStartDialog, setLoadIntro, setAppConfig, setLanguageResources },
    state: { openStartDialog, currentLanguage },
  } = useContext(AppContext);

  const {
    state: {
      referenceSelected: { bookId },
    },
    actions: { goToBookChapterVerse },
  } = useContext(ReferenceContext);

  const [activeStep, setActiveStep] = useState(0);
  const [openDialog, setOpenDialog] = useState(openStartDialog);

  const handleClose = () => {
    setOpenStartDialog(false);
    setOpenDialog(false);
    setLoadIntro(true);
  };

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <SelectLanguage style={{ maxWidth: '250px' }} />;
      case 1:
        return <SelectResourcesLanguages />;
      default:
        return '';
    }
  };

  const steps = [
    { label: t('Interface_lang'), instruction: t('Choose_language') },
    {
      label: t('Resource_langs'),
      instruction: t('Choose_languages_resources'),
    },
  ];

  useEffect(() => {
    if (activeStep > steps.length - 1) {
      resetWorkspace({
        bookId,
        setAppConfig,
        setLanguageResources,
        goToBookChapterVerse,
        currentLanguage,
        resetAll: true,
      });
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep, steps.length]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <DialogUI style={{ fullWidth: true }} open={openDialog} onClose={handleClose}>
      <Base>
        <div className={classes.positionCenter}>
          {activeStep < steps.length && (
            <Typography variant="h5">{steps[activeStep].label}</Typography>
          )}
        </div>
        <Divider className={classes.divider} />
        <div className={classes.root}>
          <Stepper
            activeStep={activeStep}
            className={classes.myStepper}
            orientation={'vertical'}
          >
            {steps.map((step) => (
              <Step key={step.label}>
                <StepLabel>{step.instruction}</StepLabel>
                <StepContent>{getStepContent(activeStep)}</StepContent>
              </Step>
            ))}
          </Stepper>
          <Divider className={classes.divider} />
          <div className={classes.buttonBlock}>
            <Button
              onClick={activeStep === 0 ? handleClose : handleBack}
              className={classes.backButton}
            >
              {activeStep === 0 ? t('Cancel') : t('Previous')}
            </Button>
            <Button variant="contained" color="primary" onClick={handleNext}>
              {activeStep < steps.length - 1 ? t('Next') : t('Finish')}
            </Button>
          </div>
        </div>
      </Base>
    </DialogUI>
  );
}

export default StartDialog;
