import { create } from 'axios'

const baseURL = 'https://private-f1f1a-teclearn.apiary-mock.com/'

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

const getGroups = (isTeacher, id) => {
  if (isTeacher) {
    return api.get(`teacher_groups/${id}`)
  }
  return null
}
const createGroup = (isTeacher, data) => {
  if (isTeacher) {
    return api.post('teacher_groups/', data)
  }
  return null
}
const updateGroup = (isTeacher, id, data) => {
  if (isTeacher) {
    return api.patch('teacher_groups/', data)
  }
  return null
}
const removeGroup = (isTeacher, id) => {
  if (isTeacher) {
    return api.delete('teacher_groups/', {
      group_id: id,
    })
  }
  return null
}

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
}
