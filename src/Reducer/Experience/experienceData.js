import {
  EXPERIENCE,
  CLEAR_EXPERIENCE,
  MODIFY_EXP_COUNT
} from "../../Constants/constant";
const initialState = {
  Data: [
    { company: null, tittle: null, startingYear: null, completionYear: null }
  ],
  Count: 1
};

export default function (state = initialState, action) {
  if (action) {
    switch (action.type) {
      case EXPERIENCE:
        return {
          ...state,
          Data: action.payload
        };
      case MODIFY_EXP_COUNT:
        return {
          ...state,
          Count: action.payload
        };

      case CLEAR_EXPERIENCE:
        return {};
      default:
        return state;
    }
  }
}
