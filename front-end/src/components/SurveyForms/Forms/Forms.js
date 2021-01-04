import React from 'react';

const Forms = (props) => {

    const deleteSurvey = (event,survey) => {
        event.stopPropagation();
        props.deleteSurvey(survey);
    }
    
    return <div className="forms-container">
        <div className="forms-container-header">
            <label>Created Surveys: </label>
            <button type="button" className="btn" onClick={props.createNewSurvey}>Create New</button>
        </div>
        <div className="forms-container-body">
            {
                props.surveys.length ? 
                props.surveys.map((survey, index) => (
                    <div key={survey.survey_name+index} className="forms-container-body-item" onClick={()=> {props.selectSurvey(survey)}}>
                        <label>{survey.survey_name}</label>
                        <i className="fa fa-trash" onClick={(e) => deleteSurvey(e,survey)}></i>
                        {/* <button type="button" className="btn btn-link"
                        onClick={(e) => deleteSurvey(e,survey)}>Delete Survey</button> */}
                    </div>
                )) :
                <p>There is no survey created yet.</p>
            }
        </div>
        
    </div> 
}

export default Forms;