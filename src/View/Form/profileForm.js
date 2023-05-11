import React, { useState, useEffect } from "react";
import { SaveProfileData } from "../../actions";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography
} from "@material-ui/core";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px"
  }
}));

const ProfileForm = (props) => {
  const classes = useStyles();

  const { profileData } = props;

  const handleChange = (event) => {
    const { name, value } = event.target;
    const prevdata = profileData.Data;

    prevdata[name] = value;

    props.SaveProfileData(prevdata);
  };

  return (
    <>
      <form autoComplete="off" noValidate>
        <Card className={classes.root}>
          <CardHeader subheader="Add your profile details" />
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                name="fname"
                defaultValue={profileData.Data ? profileData.Data.fname : ""}
                label="First Name"
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                name="lname"
                defaultValue={profileData.Data ? profileData.Data.lname : ""}
                label="Last Name"
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                type="number"
                defaultValue={profileData.Data ? profileData.Data.phone : null}
                name="phone"
                label="Phone Number"
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                name="address"
                defaultValue={
                  profileData.Data ? profileData.Data.address : null
                }
                label="Address"
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                name="email"
                defaultValue={profileData.Data ? profileData.Data.email : null}
                label="Email id"
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Card>
      </form>
    </>
  );
};

const mapStateToProps = (state) => ({
  profileData: state.Profile
});

export default connect(mapStateToProps, { SaveProfileData })(ProfileForm);
