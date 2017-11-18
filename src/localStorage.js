import { has, when } from 'ramda'

const isImmutable = has('asMutable')

const convertToJs = state => state.asMutable({ deep: true })

const fromImmutable = when(isImmutable, convertToJs)


export const loadState = () => {
  try {
    let state = localStorage.getItem('state') // eslint-disable-line
    if (state === null) {
      return undefined
    }
    return JSON.parse(state)
  } catch (e) {
    return undefined
  }
}

export const saveState = (state) => {
  try {
    localStorage.setItem('state', JSON.stringify(fromImmutable(state)))  // eslint-disable-line
  } catch (e) {
    // Ignore errors
  }
}

export const removeState = () => {
  try {
    localStorage.removeItem('state')  // eslint-disable-line
  } catch (e) {
    // Ignore errors
  }
}
