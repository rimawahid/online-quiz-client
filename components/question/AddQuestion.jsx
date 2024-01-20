import React, {useState} from 'react';
import {createQuestions, getAllSubject} from "../../utils/QuizService.jsx";

const AddQuestion = () => {
    const [question, setQuestion] = useState("")
    const [questionType, setQuestionType] = useState("single")
    const [choices, setChoices] = useState([""])
    const [correctAnswer, setCorrectAnswer] = useState([""])
    const [subject, setSubject] = useState("")
    const [newSubject, setNewSubject] = useState("")
    const [subjectOptions, setSubjectOptions] = useState([""])


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
                                <div className="mb-2"></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddQuestion;