import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../store/actions/authActions';
import { fetchSurveys, 
    fetchSurveyById, 
    updateSurveyName, 
    addSurveyQuestions, 
    deleteQuestion, 
    deleteSurveyById, 
    createSurvey, 
    clearData, 
    savePreview,
    getSurveyResults } from '../store/actions/surveyActions';
import Forms from '../components/SurveyForms/Forms/Forms';
import Preview from '../components/SurveyForms/SurveyForm/Preview';
import SurveyForm from '../components/SurveyForms/SurveyForm/SurveyForm';
import "./SurveyContainer.scss";
import 'font-awesome/css/font-awesome.min.css';

const SurveyContainer = () => {
    let { publisher, surveys, selectedSurvey, 
        isSurveyUpdated, allSurveyUpdated, 
        previewSurvey, surveyResults } = useSelector(state => ({
            isAuthenticated: state.auth.isAuthenticated,
            publisher: state.auth.loggedPublisher,
            surveys: state.surveys.craetedSurveys,
            selectedSurvey: state.surveys.selectedSurvey,
            isSurveyUpdated: state.surveys.isSurveyUpdated,
            allSurveyUpdated: state.surveys.allSurveyUpdated,
            previewSurvey: state.surveys.previewSurvey,
            surveyResults: state.surveys.surveyResults
      }));
    const dispatch = useDispatch();
    const [showPreview, setShowPreview] = useState(false);
    const [showSelectedsurvey, setShowSelectedsurvey] = useState(false);

    useEffect(() => {
        dispatch(fetchSurveys(publisher.publisher_id))
    }, []);

    useEffect(() => {
        if(isSurveyUpdated) {
            dispatch(fetchSurveyById(selectedSurvey.survey_id));
        }
        if(allSurveyUpdated) {
            dispatch(fetchSurveys(publisher.publisher_id));
        }
    });

    const saveChanges = (questions) => {
        let newQuestions = questions.filter(item => item.new)
        newQuestions = newQuestions.map(item => ({
                    answer_texts: item.answers,
                    question_text: item.question_text
                })
        );
        dispatch(addSurveyQuestions(newQuestions,selectedSurvey.survey_id))
    }

    const deleteQuest = (question) => {
        dispatch(deleteQuestion(question))
    }
    
    const deleteSurvey = (survey) => {
        dispatch(deleteSurveyById(survey.survey_id))
    }

    const createNewSurvey = () => {
        let templateSurvey = [
            {
                question_text: "Unitled question",
                answer_texts: ['Option1']
            }]
        dispatch(createSurvey(publisher.publisher_id, "Untitled", templateSurvey))
    }

    const saveInPreview = (questions) => {
        let previewTemplate = {
            survey_name : selectedSurvey.survey_name,
            survey_data: questions
        }
        dispatch(savePreview(previewTemplate))
    }

    const getResponses = () => {
        dispatch(getSurveyResults(selectedSurvey.survey_id))
    }

    const logOut = () => {
        dispatch(logout())
        dispatch(clearData())
    }
    
    return <div className="survey-container">
    <div className="survey-container-header">
        <div className="survey-container-header-left">
            {
                showSelectedsurvey &&  <i className="fa fa-arrow-left" 
                onClick={() => showPreview ? setShowPreview(false) : setShowSelectedsurvey(false)}></i>
            }
           
            <label>{selectedSurvey && selectedSurvey.survey_name 
                ? selectedSurvey.survey_name 
                : 'Forms'}
            </label>
        </div>
        <div className="survey-container-header-right">
            {showSelectedsurvey && selectedSurvey && selectedSurvey.survey_name &&
                    <button type="button" className="btn btn-link" onClick={()=>setShowPreview(true)}>
                        Preview
                    </button>
            }
            
            <label>{publisher.email}</label>
            <button type="button" className="btn btn-link"
                onClick={logOut}>Logout</button>
        </div>
    </div> 
    {
        showPreview 
        ? <Preview
            previewSurvey={previewSurvey}
            isPreview={true}
        />
        :  <div className="survey-container-body">
            {
                showSelectedsurvey 
                ? selectedSurvey && selectedSurvey.survey_name && 
                <SurveyForm
                    surveyData={[...selectedSurvey.survey_data]}
                    surveyName={selectedSurvey.survey_name}
                    surveyId={selectedSurvey.survey_id}
                    id={selectedSurvey.survey_data ? selectedSurvey.survey_data.length : 'id'}
                    surveyResults={surveyResults}
                    changeSurveyName={(val)=>{ dispatch(updateSurveyName(selectedSurvey.survey_id, val))}}
                    saveChanges={saveChanges}
                    deleteQuestion={deleteQuest}
                    saveInPreview={saveInPreview}
                    getResponses={getResponses}
                />
                : <Forms
                    surveys={surveys}
                    selectSurvey={(survey) => {
                        dispatch(fetchSurveyById(survey.survey_id));
                        setShowSelectedsurvey(true);
                    }}
                    deleteSurvey={deleteSurvey}
                    createNewSurvey={createNewSurvey}
                />
            }
        </div>
    }
   
</div>
}

export default SurveyContainer;