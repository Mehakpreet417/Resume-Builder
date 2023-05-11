import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import { useReactToPrint } from "react-to-print";

import { Paper, Grid, Typography, Button } from "@material-ui/core";
import { createNonNullExpression } from "typescript";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  ParentResumePaper: {
    margin: "auto",
    marginTop: "1%",
    textAlign: "left",
    padding: "15px",
    maxWidth: "1000px"
  },

  ParentResumeModel: {
    margin: "auto",
    marginTop: "1%",
    padding: "15px",
    maxWidth: "1000px",
    borderColor: "pink"
  },
  ParentSkillSection: {
    textAlign: "left"
  },

  header: {
    textAlign: "left"
  },
  content: {
    textAlign: "left",
    margin: "8px 3px"
  }
}));
const ResumeModel = (props) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });
  const classes = useStyles();

  return (
    <div>
      <Button color="secondary" variant="contained" onClick={handlePrint}>
        Download / Preview
      </Button>
      <Paper className={classes.ParentResumeModel} elevation={1}>
        <div
          ref={componentRef}
          elevation={1}
          className={classes.ParentResumePaper}
        >
          <Grid container spacing={3}>
            {/* ---------------------------------------------------------------------------------------------------------------------------- */}
            {/* PHOTO , NAME AND ADDRESS */}

            <Grid item xs={9}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h4" component="h2">
                    {props.profileData.Data
                      ? props.profileData.Data.fname
                      : null}{" "}
                    {props.profileData.Data
                      ? props.profileData.Data.lname
                      : null}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    Address :{" "}
                    {props.profileData.Data
                      ? props.profileData.Data.address
                      : null}
                  </Typography>
                  <Typography variant="subtitle1">
                    Phone Number:{" "}
                    {props.profileData.Data
                      ? props.profileData.Data.phone
                      : null}
                  </Typography>
                  <Typography variant="subtitle1">
                    Email id:{" "}
                    {props.profileData.Data
                      ? props.profileData.Data.email
                      : null}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            {/* ---------------------------------------------------------------------------------------------------------------------------- */}

            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <Grid container spacing={3}>
                    {/* Skills */}
                    <Grid item xs={12}>
                      <div className={classes.ParentSkillSection}>
                        <Typography variant="h5" component="h2">
                          Skills
                        </Typography>
                        <Divider />
                        {props.SkillsFormData.Data &&
                          props.SkillsFormData.Data.length > 0 &&
                          props.SkillsFormData.Data.map((item) => (
                            <li>{item}</li>
                          ))}
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={9}>
                  <Grid container spacing={3}>
                    {/* Education */}
                    <Grid item xs={12}>
                      <div className={classes.header}>
                        <Typography variant="h5" component="h2">
                          Education
                        </Typography>
                      </div>
                      <Divider />

                      {props.educationFormData.Data &&
                        props.educationFormData.Data.length > 0 &&
                        props.educationFormData.Data.map((instance) => (
                          <div className={classes.content}>
                            <Typography variant="h6" component="h2">
                              {instance.college ? instance.college : null}
                            </Typography>
                            <Typography variant="body2">
                              {instance.completionYear
                                ? " Graduation Year : " +
                                  instance.completionYear
                                : null}
                            </Typography>
                            <Typography variant="body2">
                              {instance.courseName ? instance.courseName : null}
                            </Typography>
                            <Typography variant="body2">
                              {instance.percentage
                                ? " Percentage : " + instance.percentage + "%"
                                : null}
                            </Typography>
                          </div>
                        ))}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={9}>
                  <Grid container spacing={3}>
                    {/* Experience */}
                    <Grid item xs={12}>
                      <div className={classes.header}>
                        <Typography variant="h5" component="h2">
                          Experience
                        </Typography>
                      </div>
                      <Divider />

                      {props.experienceFormData.Data &&
                        props.experienceFormData.Data.length > 0 &&
                        props.experienceFormData.Data.map((instance) => (
                          <div className={classes.content}>
                            <Typography variant="h6" component="h2">
                              {instance.company ? instance.company : null}
                            </Typography>
                            <Typography variant="body2">
                              {instance.tittle ? instance.tittle : null}
                            </Typography>

                            <Typography variant="body2">
                              {instance.startingYear
                                ? " Starting Year : " + instance.startingYear
                                : null}
                            </Typography>
                            <Typography variant="body2">
                              {instance.completionYear
                                ? " Completion Year : " +
                                  instance.completionYear
                                : null}
                            </Typography>
                          </div>
                        ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => ({
  educationFormData: state.Education,
  experienceFormData: state.Experience,
  profileData: state.Profile,
  SkillsFormData: state.Skills
});

export default connect(mapStateToProps, {})(ResumeModel);
