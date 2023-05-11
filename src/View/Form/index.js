import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ProfileForm from "./profileForm";
import EducationForm from "./education";
import ExperienceForm from "./experience";
import Skills from "./skills";
import Resume from "../Resume/index";

import { connect } from "react-redux";
import { TrendingUpRounded } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%"
  },
  button: {
    marginRight: theme.spacing(1)
  },
  completed: {
    display: "inline-block"
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

function getSteps() {
  return [
    "Profile Section",
    "Education Section",
    "Experience Section",
    "Skills Sector"
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <ProfileForm />;
    case 1:
      return <EducationForm />;
    case 2:
      return <ExperienceForm />;
    case 3:
      return <Skills />;
    default:
      return "Unknown step";
  }
}

const ResumeForm = (props) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const steps = getSteps();

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const ValidateProfileDetails = () => {
    if (!props.profileData) {
      return false;
    }
    if (
      !props.profileData.Data.fname ||
      !props.profileData.Data.lname ||
      !props.profileData.Data.phone ||
      !props.profileData.Data.address ||
      !props.profileData.Data.email
    ) {
      alert("Please fill all the data");
      return false;
    }

    if (
      props.profileData.Data.fname.length < 1 ||
      props.profileData.Data.lname.length < 1 ||
      props.profileData.Data.address.length < 1 ||
      props.profileData.Data.email.length < 1
    ) {
      alert("Please fill all the data. ");
      return false;
    }

    if (
      props.profileData.Data.phone.length !== 10 &&
      props.profileData.Data.phone.length !== 12
    ) {
      alert("Enter a valid phone number.");
      return false;
    }
    return true;
  };

  const validateEducationDetails = () => {
    if (!props.educationFormData) return false;
    const Data = props.educationFormData.Data;
    for (let i = 0; i < Data.length; i++) {
      const instance = Data[i];
      if (
        !instance.courseName ||
        !instance.completionYear ||
        !instance.college ||
        !instance.percentage
      ) {
        alert("Please fill all the data");
        return false;
      }

      if (
        instance.courseName.length < 1 ||
        instance.completionYear.length !== 4 ||
        instance.college.length < 1 ||
        instance.percentage.length < 1
      ) {
        alert("Incomplete or invalid data");
        return false;
      }
    }

    return true;
  };

  const validateExperienceDetails = () => {
    if (!props.experienceFormData) return false;
    const Data = props.experienceFormData.Data;
    for (let i = 0; i < Data.length; i++) {
      const instance = Data[i];
      if (
        !instance.company ||
        !instance.tittle ||
        !instance.startingYear ||
        !instance.completionYear
      ) {
        alert("Please fill all the data");
        return false;
      }

      if (
        instance.company.length < 1 ||
        instance.tittle.length < 1 ||
        instance.startingYear.length !== 4 ||
        instance.completionYear.length !== 4
      ) {
        alert("Incomplete or invalid data");
        return false;
      }
    }
    return true;
  };

  const validateSkills = () => {
    console.log(props.SkillsFormData.Data.length);
    if (props.SkillsFormData.Data.length < 1) {
      alert("Please enter your skill");
      return false;
    }
    for (let i = 0; i < props.SkillsFormData.Data.length; i++) {
      console.log(props.SkillsFormData.Data[i]);
      if (
        !props.SkillsFormData.Data[i] ||
        (props.SkillsFormData.Data[i] &&
          props.SkillsFormData.Data[i].length < 1)
      ) {
        alert("Please fill all skills");
        return false;
      }
    }
    return true;
  };

  const handleComplete = () => {
    let flag = true;
    console.log(activeStep);
    const action = getSteps()[activeStep];

    if (action === "Profile Section") {
      console.log("validating profile");
      flag = ValidateProfileDetails();
      console.log(flag);
    } else if (action === "Education Section") {
      flag = validateEducationDetails();
    } else if (action === "Experience Section") {
      flag = validateExperienceDetails();
    } else if (action === "Skills Sector") {
      flag = validateSkills();
    }

    if (flag) {
      const newCompleted = completed;
      newCompleted[activeStep] = true;
      setCompleted(newCompleted);
      handleNext();
    }
  };

  const handleReset = () => {
    window.location.reload(false);
  };

  const handleEdit = () => {
    setCompleted({});
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton
              color="secondary"
              onClick={handleStep(index)}
              completed={completed[index]}
            >
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - your resume is ready!!
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
            <Button onClick={handleEdit}>Edit</Button>
            <Resume />
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleNext}
                className={classes.button}
              >
                Next
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleComplete}
              >
                {completedSteps() === totalSteps() - 1
                  ? "Finish"
                  : "Save and Continue"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  educationFormData: state.Education,
  experienceFormData: state.Experience,
  profileData: state.Profile,
  SkillsFormData: state.Skills
});

export default connect(mapStateToProps, {})(ResumeForm);
