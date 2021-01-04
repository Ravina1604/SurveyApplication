import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchSurveyById, submitSurvey } from '../../../store/actions/surveyActions';

const Preview = (props) => {
    let { survey } = useSelector(state => ({
        survey: state.surveys.toSubmitSurvey
      }));
    const dispatch = useDispatch();
    const [questions, setQuestions]  = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        if(!props.isPreview) {
            dispatch(fetchSurveyById(props.match.params.surveyId,true))
        } else {
            survey = props.previewSurvey;
        }
        
    },[]);

    useEffect(() => {
        setQuestions(survey.survey_data);
    }, [survey.survey_data]);

    const selectAnswer = (e, qIndex, ansIndex) => {
        let givenAmswers = {...answers};
        givenAmswers[questions[qIndex].question_id] = questions[qIndex].answers[ansIndex].answer_id;
        setAnswers(givenAmswers);
    }

    const onSubmitAnswers = () => {
        dispatch(submitSurvey(name, email, props.match.params.surveyId, answers ))
    }

    return <div className="question-form">
        <div className="question-form-section">
                <label className="question-form-section-title">
                {props.isPreview ? props.previewSurvey.survey_name : survey.survey_name}</label>
        </div>
        {
            !props.isPreview &&
            <div className="question-form-section">
                <div className="form-group" style={{width: '50%'}}>
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Name"
                        value={name}
                        required
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="form-group" style={{width: '50%'}}>
                    <label>Email</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Email"
                        value={email}
                        required
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
            </div>
        }
        {
            questions && questions.map((question, qIndex) => (
                <div key={"quest"+question.question_id} id={"quest"+question.question_id} className="question-form-section">
                    <div className="form-group">
                        <label >{question.question_text}</label>
                        
                        {question.answers.map((answer,ansIndex) => (
                                <div  id={"answer"+answer.answer_id} key={"answer"+answer.answer_id} className="form-check">
                                    <input className="form-check-input" type="radio" name={"exampleRadios"+qIndex} 
                                        disabled={props.isPreview}
                                        id={`option${qIndex}${ansIndex}`} value="option" 
                                        onChange={(e)=>{selectAnswer(e, qIndex,ansIndex)}} />
                                    <label className="form-check-label" htmlFor={`option${qIndex}${ansIndex}`}>
                                        {answer.answer_text}
                                    </label>            
                                </div>
                            ))
                        }
                    </div>
                </div>
            ))
        }
        {
            !props.isPreview && <button type="button" className="btn"
            onClick={onSubmitAnswers}>Submit</button>
        }
        {
            !props.isPreview && survey.submitted &&
            <div><label>Your response is submitted</label></div>
        }
        
    
    </div>
}
export default Preview;