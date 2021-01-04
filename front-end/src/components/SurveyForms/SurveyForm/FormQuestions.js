import React,{ useState } from 'react';

const FormQuestions = (props) => {
    const [questions, setQuestions] = useState(props.surveyData);
    const [surveyName, setSurveyName] = useState(props.surveyName);

    const addAnswer = (index) => {
        let quest = [...questions];
        quest[index].answers.push("Option");
        setQuestions(quest);
        props.saveInPreview(quest);
    }

    const changeAnswer = (e, qIndex, aIndex) => {
        let quest = [...questions];
        quest[qIndex].answers[aIndex] = e.target.value;
        setQuestions(quest);
        props.saveInPreview(quest);
    }

    const addQuestion = () => {
        let quest = [...questions];
        quest.push({
            question_text: 'Untitled question',
            answers: ["Option 1", "Option 2"],
            new: true
        });
        setQuestions(quest);
        props.saveInPreview(quest);
    }

    const chnageQuestion = (e, questionIndex) => {
        let quest = [...questions];
        quest[questionIndex].question_text = e.target.value;
        setQuestions(quest);
        props.saveInPreview(quest);
    }

    const saveChanges = () => {
        props.saveChanges([...questions]);
        let quest = questions.filter(item => !item.new);
        setQuestions(quest);
    }

    const deleteQuestion = (qIndex) => {
        let quest = [...questions]
        quest.splice(qIndex,1);
        props.deleteQuestion(questions[qIndex]);
        props.saveInPreview(quest);
    }

    return <div className="question-form">
        <div style={{'width': '100%'}}>
            <label> Link: http://localhost:3000/forms/{props.surveyId}</label>
            <button type="button" className="btn btn-link" style={{marginBottom: '1em', float: 'right'}}
                onClick={saveChanges}>Save Changes</button>
        </div>
        <div className="question-form-section">
            <div className="form-group">
                <label>Survey Title</label>
                <input
                    type="text"
                    className="form-control no-border"
                    placeholder="Enter title"
                    value={surveyName}
                    onChange={(e) => setSurveyName(e.target.value)}
                    onBlur={()=> props.changeSurveyName(surveyName)}
                    onKeyDown={(e) => {
                        if(e.key === 'Enter')
                            props.changeSurveyName(surveyName)
                    }}
                />
            </div>
        </div>
        {
            questions.length && questions.map((question, qIndex) => (
                <div key={"quest"+question.question_id+qIndex} id={"quest"+question.question_id} className="question-form-section">
                    <div className="form-group">
                        {
                            question.new 
                            ? <input
                                type="text"
                                className="form-control no-border"
                                placeholder="Enter title"
                                value={question.question_text}
                                onChange={(e)=> chnageQuestion(e, qIndex)}
                            />
                            :  <React.Fragment>
                                <label >{question.question_text}</label>
                                <button  style={{float: 'right'}} type="button" className="btn btn-link"
                                onClick={() => deleteQuestion(qIndex)}>Delete Question</button>
                                </React.Fragment>
                        }
                        
                        {
                            question.answers.map((answer,ansIndex) => (
                                <div  id={"answer"+answer.answer_id} key={"answer"+answer.answer_id+ansIndex} className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios" disabled/>
                                    {
                                        question.new
                                        ? <input
                                            type="text"
                                            className="form-control no-border"
                                            value={answer}
                                            onChange={(e)=> changeAnswer(e,qIndex, ansIndex)}
                                        />
                                       
                                       : <label>{answer.answer_text}</label>
                                            
                                    }
                                    
                                </div>
                            ))
                        }
                        {question.new &&
                            <button type="button" className="btn btn-link"
                                onClick={() => addAnswer(qIndex)}>Add Answer</button> 
                        } 
                    </div>
                </div>
            ))
        }
        <div className="question-form-bottom">
            <button type="button" className="btn btn-link"
                onClick={addQuestion}>Add Question</button>
        </div>
    </div>
}
export default FormQuestions;