import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectLanguage, SelectResourcesLanguages, DialogUI } from '../../components/';

import {
  Button,
  Divider,
  Stepper,
  Step,
  StepLabel,
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
  divider: { margin: `${theme.spacing(2)}px 0` },
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
        return <SelectLanguage />;
      case 1:
        return <SelectResourcesLanguages />;
      default:
        return '';
    }
  }

  const widthBase = 100;
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
      <Base
        style={{
          display: 'flex',
          flexDirection: 'column',

          alignItems: 'center',
        }}
        widthBase={widthBase}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',

            alignItems: 'center',
          }}
        >
          <div>
            {activeStep < steps.length && (
              <Typography variant="h5">{steps[activeStep].label} </Typography>
            )}
          </div>
          <Divider className={classes.divider} />
          <div
            style={{
              marginTop: '20px',
            }}
          >
            {getStepContent(activeStep)}
          </div>
        </div>
        <div className={classes.root} style={{ textAlign: 'center' }}>
          <div style={{ position: 'absolute', bottom: '0px', paddingBottom: '30px' }}>
            <div>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((step) => (
                  <Step key={step.label}>
                    <StepLabel>{step.instruction}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
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
        </div>
      </Base>
    </DialogUI>
  );
}

export default StartDialog;
