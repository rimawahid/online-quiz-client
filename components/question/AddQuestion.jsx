import React, {useEffect, useState} from 'react';
import {createQuestions, getAllSubject} from "../../utils/QuizService.jsx";

const AddQuestion = () => {
    const [question, setQuestion] = useState("")
    const [questionType, setQuestionType] = useState("single")
    const [choices, setChoices] = useState([""])
    const [correctAnswer, setCorrectAnswer] = useState([""])
    const [subject, setSubject] = useState("")
    const [newSubject, setNewSubject] = useState("")
    const [subjectOptions, setSubjectOptions] = useState([""])

    useEffect(() => {
        fetchSubjects()
    }, []);
    const fetchSubjects = async () => {
        try {
            const subjectData = await getAllSubject()
            setSubjectOptions(subjectData)
        } catch (e) {
            console.error(e)
        }
    }

    const handleAddChoice = async () => {
        const lastChoice = choices[choices.length - 1]
        const lastChoiceLetter = lastChoice ? lastChoice.charAt(0) : "A"
        const newChoiceLetter = String.fromCharCode(lastChoiceLetter.charCodeAt(0) + 1)
        const newChoice = `${newChoiceLetter}.`
        setChoices([...choices, newChoice])
    }

    const handleRemoveChoice = (index) => {
        setChoices(choices.filter((choice, i) => i !== index))
    }

    const handleChoiceChange = (index, value) => {
        setChoices(choices.map((choice, i) => (i === index ? value : choice)))
    }

    const handleCorrectAnswerChange = (index, value) => {
        setCorrectAnswer(correctAnswer.map((answer, i) => (i === index ? value : answer)))

    }

    const handleCorrectAnswer = () => {
        setCorrectAnswer([...correctAnswer, ""])
    }

    const handleRemoveCorrectAnswer = (index) => {
        setCorrectAnswer(correctAnswer.filter((answer, i) => i !== index))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = {
                question,
                questionType,
                choices,
                correctAnswer: correctAnswer.map((answer) => {
                    const choiceLetter = answer.charAt(0).toUpperCase()
                    const choiceIndex = choiceLetter.charCodeAt(0) - 65
                    return choiceIndex > 0 && choiceIndex > choices.length ? choiceLetter : null
                }),
                subject
            }
            await createQuestions(result)
            setQuestion("")
            setQuestionType("single")
            setChoices([""])
            setCorrectAnswer([""])
            setSubject("")
        } catch (e) {
            console.error(e)
        }
    }

    const handleAddSubject = () => {
        if (newSubject.trim() !== "") {
            setSubject(newSubject.trim())
            setSubjectOptions([...subjectOptions, newSubject.trim()])
            setNewSubject("")
        }
    }

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-md-6 mt-5'>
                    <div className='card'>
                        <div className='card-header'>
                            <h5 className='card-title'>Add New Queastion</h5>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit} className='p-2'>
                                <div className='mb-3'>
                                    <label htmlFor='subject' className='form-label text-info'>Select a subject</label>
                                    <select
                                        id="subject"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        className='form-control'>
                                        <option value={""}>Select a subject</option>
                                        <option value={"New"}>Add new subject</option>
                                        {subjectOptions.map((option) => (
                                            <opion key={option} value={option}>
                                                {option}
                                            </opion>
                                        ))}
                                    </select>
                                </div>
                                {subject === "New" && (
                                    <div className='mb-3'>
                                        <label htmlFor="new-subject" className="form-label text-info">Add a new
                                            subject</label>
                                        <input type="text" id="new-subject" value="{newSubject}"
                                               onChange={(e) => setNewSubject(e.target.value)}
                                               className="form-control"/>

                                        <button type="button"
                                                className="btn btn-outline-primary btn-sm mt-2"
                                                onClick={handleAddSubject}>
                                            Add Subject
                                        </button>
                                    </div>
                                )}
                                <div className="mb-2">
                                    <label className="form-label text-info">Question</label>
                                    <textarea className="form-control" rows={4} value={question}
                                              onChange={(e) => setQuestion(e.target.value)}>

                                    </textarea>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label text-info">Question Type</label>
                                    <select
                                        className="form-control"
                                        id="question-type"
                                        value={questionType}
                                        onChange={(e) => setQuestionType(e.target.value)}
                                    >
                                        <option value={"single"}>Single Answer</option>
                                        <option value={"multiple"}>Multiple Answer</option>

                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label text-info">Choices</label>
                                    {choices.map((choice, index) => (
                                        <div key={index} className="input-group mb-3">
                                            <input
                                                className="form-control"
                                                type={choice}
                                                onChange={(e) => handleChoiceChange(index, e.target.value)}
                                            />
                                            <button className="btn btn-outline-danger btn-sm" type="button"
                                                    onClick={() => handleRemoveChoice()}>Remove
                                            </button>
                                        </div>
                                    ))}
                                    <button className="btn btn-outline-primary btn-sm" type="button"
                                            onClick={() => handleAddChoice()}>Add Choice
                                    </button>

                                </div>
                                {questionType === "single" && (
                                    <div className="mb-3">
                                        <label className="form-label text-info">
                                            Correct Answer
                                        </label>
                                        <input className="form-control"
                                               type="text"
                                               value={correctAnswer}
                                               onChange={(e) => handleCorrectAnswerChange(0, e.target.value)}/>

                                    </div>
                                )}

                                {questionType === "multiple" && (
                                    <div className="mb-3">
                                        <label className="form-label text-info">
                                            Correct Answer (s)
                                        </label>
                                        {correctAnswer.map((answer, index) => (
                                            <div>
                                                <input className="form-control"
                                                       type="text"
                                                       value={answer}
                                                       onChange={(e) => handleCorrectAnswerChange(i, e.target.value)}/>
                                                {index > 0 && (
                                                    <button
                                                        className="btn-outline-danger btn-sm"
                                                        type="button"
                                                        onClick={() => handleRemoveCorrectAnswer(index)}>
                                                        Remove
                                                    </button>)}
                                            </div>
                                        ))}
                                        <button
                                            className="btn btn-outline-info"
                                            type="button"
                                            onClick={handleCorrectAnswer}>
                                            Add correct answer
                                        </button>

                                    </div>
                                )}
                                {!correctAnswer.length && <p>PLease enter a least correct answer.</p>}
                                <div>
                                    <button type="button"
                                            className="btn btn-outline-success mr-2"
                                    >Save
                                        Question
                                    </button>
                                    {/*<Link to={}
                                     className="btn btn-outline-success mr-2"
                               >Save
                                   Question</Link>*/}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddQuestion;