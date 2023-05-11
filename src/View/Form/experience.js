import React, { useState, useEffect } from "react";
import { SaveExperienceData, ModifyExperienceCount } from "../../actions";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography,
  Paper
} from "@material-ui/core";

import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  deleteButton: {
    marginRight: "1%"
  },
  addButton: {},
  footer: {
    alignItems: "left",
    padding: "1%"
  },

  instance: {
    marginBottom: "1%",
    padding: "1%"
  }
}));

const ExperienceForm = (props) => {
  const classes = useStyles();

  const handleChange = (index) => (event) => {
    const { name, value } = event.target;
    const list = [...props.experienceFormData.Data];
    console.log(index + 1, list.length);
    if (index + 1 > list.length) {
      while (index + 1 !== list.length) {
        list.push({
          company: null,
          tittle: null,
          startingYear: null,
          completionYear: null
        });
      }
    }
    console.log(list);
    list[index][name] = value;
    props.SaveExperienceData(list);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const DeletExperience = () => {
    console.log("Decreasing count");
    const list = [...props.experienceFormData.Data];
    list.pop();
    props.SaveExperienceData(list);
    props.ModifyExperienceCount(props.experienceFormData.Count - 1);
  };

  const AddExperience = () => {
    const list = [...props.experienceFormData.Data];
    list.push({
      company: null,
      tittle: null,
      startingYear: null,
      completionYear: null
    });
    props.SaveExperienceData(list);
    props.ModifyExperienceCount(props.experienceFormData.Count + 1);
  };

  let Form = [];
  for (let i = 0; i < props.experienceFormData.Count; i++) {
    Form.push(
      <div className={classes.instance}>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <TextField
              required
              fullWidth
              name={`company`}
              defaultValue={
                props.experienceFormData.Data &&
                props.experienceFormData.Data[i]
                  ? props.experienceFormData.Data[i].company
                  : ""
              }
              label="Company Name"
              onChange={handleChange(i)}
              variant="outlined"
              formControlProps={{
                fullWidth: true
              }}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              required
              fullWidth
              defaultValue={
                props.experienceFormData.Data &&
                props.experienceFormData.Data[i]
                  ? props.experienceFormData.Data[i].tittle
                  : ""
              }
              name={`tittle`}
              label="Tittle"
              onChange={handleChange(i)}
              variant="outlined"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              required
              fullWidth
              name={`startingYear`}
              defaultValue={
                props.experienceFormData.Data &&
                props.experienceFormData.Data[i]
                  ? props.experienceFormData.Data[i].startingYear
                  : ""
              }
              label="Starting Year"
              type="number"
              onChange={handleChange(i)}
              variant="outlined"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              required
              fullWidth
              name={`completionYear`}
              defaultValue={
                props.experienceFormData.Data &&
                props.experienceFormData.Data[i]
                  ? props.experienceFormData.Data[i].completionYear
                  : ""
              }
              label="Completion Year"
              type="number"
              onChange={handleChange(i)}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Divider />
      </div>
    );
  }

  return (
    <>
      <form autoComplete="off" noValidate>
        <Card>
          <CardHeader subheader="Add your Experience Details" />
          <form>{Form.map((instance) => instance)}</form>
          <div className={classes.footer}>
            <Button
              disabled={props.experienceFormData.Count < 2}
              className={classes.deleteButton}
              onClick={DeletExperience}
              variant="outlined"
              color="primary"
            >
              Delete
            </Button>
            <Button
              className={classes.addButton}
              onClick={AddExperience}
              variant="contained"
              color="primary"
            >
              ADD EXPERIENCE
            </Button>
          </div>
        </Card>
      </form>
    </>
  );
};

const mapStateToProps = (state) => ({
  experienceFormData: state.Experience
});

export default connect(mapStateToProps, {
  SaveExperienceData,
  ModifyExperienceCount
})(ExperienceForm);
