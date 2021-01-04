import * as CONSTANTS from "./constants";
import { fetchFormUrl } from './apiCall.js';

export const fetchSurveys = (publisherId) => {
    return (dispatch) => {
      fetchFormUrl({ action: "get_surveys", publisher_id: publisherId },(res)=> {
        dispatch({
          type: CONSTANTS.FETCH_SURVEYS,
          payload: {
            surveys: res
          },
        });
      })
    };
}

export const fetchSurveyById = (surveyId, forSubmit = false) => {
  return (dispatch) => {
    fetchFormUrl({ action: "get_survey", survey_id: surveyId },(res)=> {
      let type = forSubmit ? CONSTANTS.FETCH_SUBMIT_SURVEY : CONSTANTS.FETCH_SURVEY_BY_ID
      dispatch({
          type,
          payload: {
            survey: res
          },
      });
    })
  };
}

export const createSurvey = (publisherId, surveyName, survey) => {
  return (dispatch) => {
    fetchFormUrl({ action: "create_survey", publisher_id: publisherId, survey_name: surveyName, survey},(res)=> {
      if(res.survey_id !== -1) {
          dispatch({
            type: CONSTANTS.UPDATE_ALL_SURVEY_FLAG
          });
      }
    })
  };
}

export const updateSurveyName = (surveyId, surveyName) => {
  return (dispatch) => {
    fetchFormUrl({ action: "update_survey_name", survey_id: surveyId, survey_name: surveyName },(res)=> {
        if(res.success) {
          dispatch({
            type: CONSTANTS.UPDATE_SURVEY_NAME,
            payload: {
              surveyName
            },
          });
        }
    })
  };
}

export const addSurveyQuestions = (questions, surveyId) => {
  return (dispatch) => {
    fetchFormUrl({ action: "add_questions", survey_id: surveyId, questions },(res)=> {
        if(res.success === "True") {
          dispatch({
            type: CONSTANTS.UPDATE_SURVEY_FLAG
          });
        }
    })
  };
}

export const deleteQuestion = (question) => {
  return (dispatch) => {
    fetchFormUrl({ action: "delete_question", question_id: question.question_id },(res)=> {
        if(res.success === "True") {
          dispatch({
            type: CONSTANTS.UPDATE_SURVEY_FLAG
          });
        }
    })
  };
}

export const deleteSurveyById = (surveyId) => {
  return (dispatch) => {
    fetchFormUrl({ action: "delete_survey", survey_id: surveyId },(res)=> {
        if(res.success === "True") {
          dispatch({
            type: CONSTANTS.DELETE_SURVEY,
            payload: {
              surveyId
            }
          });
        }
    })
  };
}

export const savePreview = (previewSurvey) => {
  return {
    type: CONSTANTS.SAVE_PREVIEW,
    payload: {previewSurvey}
  }
}

export const clearData = () => {
  return {
    type: CONSTANTS.CLEAR_DATA
  }
}

export const submitSurvey = (name, email_id, survey_id, survey) => {
  return (dispatch) => {
    fetchFormUrl({ action: "submit_survey", name, email_id, survey_id, survey},(res)=> {
        if(res) {
          dispatch({
            type: CONSTANTS.SUBMIT_SURVEY
          });
        }
    })
  };
}

export const getSurveyResults = (survey_id) => {
  return (dispatch) => {
    fetchFormUrl({ action: "get_survey_results", survey_id},(res)=> {
        if(res) {
          dispatch({
            type: CONSTANTS.FETCH_SURVEY_RESULTS,
            payload: {
              surveyResults: res
            }
          });
        }
    })
  };
}
