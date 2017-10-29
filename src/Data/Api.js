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

const getGroups = ({ isTeacher, id }) => isTeacher ? api.get(`teacher_groups/${id}`) : null
const createGroup = ({ isTeacher, ...data }) => isTeacher ? api.post('teacher_groups/', data) : null
const updateGroup = (id, { isTeacher, ...data }) => isTeacher ? api.patch('teacher_groups/', data) : null
const removeGroup = ({ isTeacher, id }) => isTeacher ? api.delete('teacher_groups/', { group_id: id }) : null

const getOneOverview = (id, { isTeacher }) => isTeacher ? api.get(`teacher_overview/${id}`) : null

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
}
