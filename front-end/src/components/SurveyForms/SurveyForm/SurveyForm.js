import React,{ useState } from 'react';
import FormQuestions from './FormQuestions';
import SurveyResponses from './SurveyResponses';
const SurveyForm = (props) => {
    const [showResponse, setShowResponse] = useState(false);

    const getResponses = () => {
        setShowResponse(true);
        props.getResponses();
    }

    return <React.Fragment>
            <ul className="nav justify-content-center">
                <li
                    className={`nav-item ${!showResponse ? "active" : ""}`}
                    onClick={() => setShowResponse(false)}
                >
                    <label>Form Questions</label>
                </li>
                <li
                    className={`nav-item ${showResponse ? "active" : ""}`}
                    onClick={getResponses}
                >
                    <label>Responses</label>
                </li>
            </ul>
            <div className="survey-container-body-content" key={props.id} id={props.id}> 
                {
                    showResponse ? 
                    <SurveyResponses
                        surveyResults={props.surveyResults}
                    /> :
                    <FormQuestions
                        surveyData={[...props.surveyData]}
                        surveyName={props.surveyName}
                        surveyId={props.surveyId}
                        changeSurveyName={props.changeSurveyName}
                        saveChanges={props.saveChanges}
                        deleteQuestion={props.deleteQuestion}
                        saveInPreview={props.saveInPreview}
                    />
                }
            </div>
        </React.Fragment>
}


export default SurveyForm;