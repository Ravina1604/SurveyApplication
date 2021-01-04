import * as actionTypes from '../actions/constants';

const initialState = {
    isSurveyUpdated: false,
    allSurveyUpdated: false,
    craetedSurveys: [],
    selectedSurvey: {},
    previewSurvey: {},
    toSubmitSurvey: {},
    surveyResults: {}
}
const surveyReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_SURVEYS:
            return {
                ...state,
                craetedSurveys: action.payload.surveys,
                allSurveyUpdated: false
            }
        case actionTypes.FETCH_SURVEY_BY_ID:
            return {
                ...state,
                selectedSurvey: action.payload.survey,
                previewSurvey: action.payload.survey,
                isSurveyUpdated: false
            }
        case actionTypes.UPDATE_SURVEY_NAME:
             return {
                 ...state,
                 selectedSurvey: {
                     ...state.selectedSurvey,
                     survey_name: action.payload.surveyName
                 }
             }
        case actionTypes.UPDATE_SURVEY_FLAG:
            return {
                ...state,
                isSurveyUpdated: true
            }
        case actionTypes.UPDATE_ALL_SURVEY_FLAG:
            return {
                ...state,
                allSurveyUpdated: true
            }
        case actionTypes.DELETE_SURVEY: 
            let surveyCopy = state.craetedSurveys.filter(item => item.survey_id !== action.payload.surveyId)
            return {
                ...state,
                craetedSurveys: surveyCopy
            }
        case actionTypes.CLEAR_DATA:
            return {
                ...state,
                selectedSurvey: {}
            }
        case actionTypes.SAVE_PREVIEW:
            return {
                ...state,
                previewSurvey: action.payload.previewSurvey,
                toSubmitSurvey: {}
            }
        case actionTypes.FETCH_SUBMIT_SURVEY:
            return {
                ...state,
                toSubmitSurvey: action.payload.survey,
            }
        case actionTypes.FETCH_SURVEY_RESULTS:
            return {
                ...state,
                surveyResults: action.payload.surveyResults
            }
        case actionTypes.SUBMIT_SURVEY: 
            return {
                ...state,
                toSubmitSurvey: {
                    ...state.toSubmitSurvey,
                    submitted: true
                }
            }
        default:
            return state
    }
    // return state;
}

export default surveyReducer;