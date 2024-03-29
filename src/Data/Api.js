import { create } from 'axios'
import tagManipulator from './Utils'

const baseURL = process.env.REACT_APP_API_URL

/**
 * Create a new API instance
 */
const api = create({
  baseURL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

/**
 * Define functions that call the api. The goal is to provide a wrapper
 * of the api layer, by providing nicer functions rather than get, post, etc.
 */

const getGroups = ({ isTeacher, id }) => isTeacher ? api.get(`teacher_groups/${id}`) : api.get(`student_groups/${id}`)
const createGroup = ({ isTeacher, ...data }) => isTeacher ? api.post('teacher_groups', data) : api.post('student_groups', data)
const updateGroup = (id, data) => api.patch(`teacher_groups/${id}`, data)
const removeGroup = id => api.delete('teacher_groups', { id })

const getOneOverview = (id, { isTeacher, groupId }) => isTeacher ? api.get(`teacher_overview/${id}`) : api.get(`student_overview/${id}/${groupId}`)

const getExams = id => api.get(`teacher_exams/${id}`)
const createExam = data => api.post('teacher_exams', data)
const updateExam = (id, data) => api.patch('teacher_exams', { id, ...data })
const removeExam = id => api.delete('teacher_exams', { id })

// Only return the brand new created item
const createTeacherGroupExam = data => api.post('teacher_groups_exams', data)
const updateTeacherGroupExam = (id, data) => api.patch('teacher_groups_exams', { id, ...data })
const removeTeacherGroupExam = id => api.delete('teacher_exams', { id })

const getQuestions = id => api.get(`teacher_questions/${id}`)
const createQuestion = data => api.post('teacher_questions', tagManipulator(data))
const updateQuestion = (id, data) => api.patch('teacher_questions', { id, ...tagManipulator(data) })
const removeQuestion = id => api.delete('teacher_questions', { id })

const getTags = id => api.get(`teacher_tags/${id}`)

const getOneGroupExamResult = ({ groupId, examId }) => api.get(`group_exam_results/${groupId}/${examId}`)

const getOneGroupResult = id => api.get(`group_results/${id}`)

// Add another attribute in DB to store id of current exam
const getOneStudentState = id => api.get(`student_state/${id}`)
const updateStudentState = (id, data) => api.post('student_state', { id, ...data })

const getOneResource = id => api.get(`resources/${id}`)

const getOneExamQuestions = id => api.get(`exam/${id}`)
const createExamQuestions = data => api.post('exam', data)

const login = (data, isTeacher) => isTeacher ? api.post('teacher_login', data) : api.post('student_login', data)
const register = (data, isTeacher) => isTeacher ? api.post('teacher_register', data) : api.post('student_register', data)

/**
 * Create a collection of the previous functions to be exposed
 */
export default {
  groups: {
    get: getGroups,
    create: createGroup,
    update: updateGroup,
    remove: removeGroup,
  },
  overview: {
    getOne: getOneOverview,
  },
  exams: {
    get: getExams,
    create: createExam,
    update: updateExam,
    remove: removeExam,
  },
  teacherGroupExams: {
    create: createTeacherGroupExam,
    update: updateTeacherGroupExam,
    remove: removeTeacherGroupExam,
  },
  questions: {
    get: getQuestions,
    create: createQuestion,
    update: updateQuestion,
    remove: removeQuestion,
  },
  tags: {
    get: getTags,
  },
  groupExamResults: {
    getOne: getOneGroupExamResult,
  },
  groupResults: {
    getOne: getOneGroupResult,
  },
  studentState: {
    getOne: getOneStudentState,
    update: updateStudentState,
  },
  resource: {
    getOne: getOneResource,
  },
  examQuestions: {
    getOne: getOneExamQuestions,
    create: createExamQuestions,
  },
  user: {
    login,
    register,
  },
}
