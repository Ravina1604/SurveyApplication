import React from 'react';

const SurveyResponses = (props) => {

    return <div className="question-form">
        <div className="question-form-section">
               <label style={{fontWeight:'bold', fontSize: '1.231em'}}>{props.surveyResults && props.surveyResults.fillers ? props.surveyResults.fillers.length : '0' } Response </label>
               {
                   props.surveyResults && props.surveyResults.fillers && props.surveyResults.fillers.length ?
                   props.surveyResults.fillers.map(filler=> (
                       <div key={filler.name} className="response-section-user"><label>{filler.email}{'     ('}{filler.name})</label></div>
                   )) : null
               }
        </div>
        {
            props.surveyResults && props.surveyResults.summary && Object.keys(props.surveyResults.summary).length &&
            Object.keys(props.surveyResults.summary).map((question) => (
                <div key={question} className="question-form-section response-section">
                    <label className="response-section-title">{question}</label>
                    {
                        Object.keys(props.surveyResults.summary[question]).map((answer)=> (
                            <label key={answer} className="response-section-key">
                                {answer}: 
                            <label className="response-section-value">{props.surveyResults.summary[question][answer]} Response</label></label>
                        ))
                    }
                </div>
            ))
        }
    </div>
}

export default SurveyResponses