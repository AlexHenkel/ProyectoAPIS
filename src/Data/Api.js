import { create } from 'axios'

const baseURL = 'http://private-anon-fdb02c9693-teclearn.apiary-mock.com/'

/**
 * Create a new API instance
 */
const api = create({
  baseURL,
  timeout: 10000,
})

/**
 * Define functions that call the api. The goal is to provide a wrapper
 * of the api layer, by providing nicer functions rather than get, post, etc.
 */

const getGroups = ({ isTeacher, id }) => isTeacher ? api.get(`teacher_groups/${id}`) : api.get(`student_groups/${id}`)
const createGroup = data => api.post('teacher_groups/', data)
const updateGroup = (id, data) => api.patch('teacher_groups/', data)
const removeGroup = id => api.delete('teacher_groups/', { group_id: id })

const getOneOverview = (id, { isTeacher }) => isTeacher ? api.get(`teacher_overview/${id}`) : api.get(`student_overview/${id}`)

const getExams = id => api.get(`teacher_exams/${id}`)
const createExam = data => api.post('teacher_exams/', data)
const updateExam = (id, data) => api.patch('teacher_exams/', { exam_id: id, ...data })
const removeExam = id => api.delete('teacher_exams/', { exam_id: id })

const createTeacherGroupExam = data => api.post('teacher_groups_exams/', data)
const updateTeacherGroupExam = (id, data) => api.patch('teacher_groups_exams/', { teacher_group_exam_id: id, ...data })
const removeTeacherGroupExam = id => api.delete('teacher_exams/', { teacher_group_exam_id: id })

const getQuestions = id => api.get(`teacher_questions/${id}`)
const createQuestion = data => api.post('teacher_questions/', data)
const updateQuestion = (id, data) => api.patch('teacher_questions/', { question_id: id, ...data })
const removeQuestion = id => api.delete('teacher_questions/', { question_id: id })

const getTags = id => api.get(`teacher_tags/${id}`)

const getOneGroupExamResult = ({ groupId, examId }) => api.get(`group_exam_results/${groupId}/${examId}`)

const getOneGroupResult = id => api.get(`group_results/${id}`)

const getOneStudentState = id => api.get(`student_state/${id}`)
const updateStudentState = (id, data) => api.post('student_state/', { id, ...data })

const getOneResource = id => api.get(`resources/${id}`)

const getOneExamQuestions = id => api.get(`exam/${id}`)
const createExamQuestions = data => api.post('exam/', data)


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
}
