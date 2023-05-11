import {
  EDUCATION,
  MODIFY_COUNT,
  EXPERIENCE,
  MODIFY_EXP_COUNT,
  MODIFY_SKILLS_COUNT,
  PROFILE,
  SKILLS
} from "../Constants/constant";

export const SaveEducationData = (data) => (dispatch) => {
  dispatch({
    type: EDUCATION,
    payload: data
  });
};

export const ModifyEducationCount = (count) => (dispatch) => {
  dispatch({
    type: MODIFY_COUNT,
    payload: count
  });
};
export const SaveExperienceData = (data) => (dispatch) => {
  dispatch({
    type: EXPERIENCE,
    payload: data
  });
};

export const ModifyExperienceCount = (count) => (dispatch) => {
  dispatch({
    type: MODIFY_EXP_COUNT,
    payload: count
  });
};

export const ModifySkillsCount = (count) => (dispatch) => {
  dispatch({
    type: MODIFY_SKILLS_COUNT,
    payload: count
  });
};

export const SaveProfileData = (data) => (dispatch) => {
  dispatch({
    type: PROFILE,
    payload: data
  });
};

export const SaveSkillsData = (data) => (dispatch) => {
  dispatch({
    type: SKILLS,
    payload: data
  });
};
