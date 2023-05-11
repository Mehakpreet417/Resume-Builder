import { combineReducers } from "redux";
import educationData from "./Education/educationData";
import experienceData from "./Experience/experienceData";
import profileData from "./Profile/profileData";
import skillsData from "./Skills/skillsData";

export default combineReducers({
  Education: educationData,
  Experience: experienceData,
  Profile: profileData,
  Skills: skillsData
});
