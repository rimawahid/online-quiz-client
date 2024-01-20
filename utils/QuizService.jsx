import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080/api/quizzes"
})

export const createQuestions = async (quizQuestion) => {
    try {
        const response = await api.post("/create-new-question", quizQuestion)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const getAllQuestions = async () => {
    try {
        const response = await api.get("/all-question")
        return response.data
    } catch (e) {
        console.error(e)
    }
}

export const fetchQuizForUser = async (number, subject) => {
    try {
        const response = await api.get(`/fetch-question-for-user?numOfQuestion=${number}&subject=${subject}`)
        return response.data;
    } catch (e) {
        console.error(e)
        return []
    }
}

export const getAllSubject = async () => {
    try {
        const response = await api.get("/subjects")
        return response.data
    } catch (e) {
        console.error(e)
    }
}

export const updateQuestion = async (id, question) => {
    try {
        const response = await api.put(`/quiz/${id}/update`,question)
        return response.data
    } catch (e) {
        console.error(e)
    }
}

export const getQuestionById = async (id) => {
    try {
        const response = await api.get(`/question/${id}`)
        return response.data
    } catch (e) {
        console.error(e)
    }
}

export const deleteQuestion = async (id) => {
    try {
        const response = await api.delete(`/${id}/delete`)
        return response.data
    } catch (e) {
        console.error(e)
    }
}