import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from 'material-ui'
import { AlignCenter } from './Utils'

const downloadCSV = (csv, name, type) => {
  const hiddenElement = document.createElement('a') // eslint-disable-line
  hiddenElement.href = `data:text/csv;charset=utf-8,${encodeURI(csv)}`
  hiddenElement.target = '_blank'
  hiddenElement.download = `Resultados(${type === 'higher' ? 'Más altos' : 'Más recientes'})-${name}.csv`
  hiddenElement.click()
}

export const downloadGroupCSV = (exams, grades, type, name) => {
  let csvString = `Alumno,${exams.map(i => i.name).join(',')},Calificación\n`
  grades.forEach((row) => {
    csvString += `${row.student},${row.grades.join(',')},${row.average}\n`
  })
  return downloadCSV(csvString, name, type)
}

export const downloadExamCSV = (questions, grades, type, name) => {
  let csvString = `Alumno,${questions.map(i => i.question).join(',')},Calificación\n`
  grades.forEach((row) => {
    csvString += `${row.student},${row.answers.map(i => i.answer).join(',')},${row.grade}\n`
  })
  return downloadCSV(csvString, name, type)
}

const ExcelButtonCont = styled(AlignCenter)`
  margin-bottom: 20px;
`

export const ExcelButton = ({ onClick }) => (
  <ExcelButtonCont>
    <Button raised color="primary" onClick={onClick}>Descargar resultados en Excel</Button>
  </ExcelButtonCont>
)

ExcelButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}
