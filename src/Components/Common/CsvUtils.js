import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from 'material-ui'
import { AlignCenter } from './Utils'

export const downloadCSV = (csv) => {
  const hiddenElement = document.createElement('a') // eslint-disable-line
  hiddenElement.href = `data:text/csv;charset=utf-8,${encodeURI(csv)}`
  hiddenElement.target = '_blank'
  hiddenElement.download = 'people.csv'
  hiddenElement.click()
}

export const getGroupCSV = (exams, grades) => {
  let csvString = `Alumno,${exams.map(i => i.name).join(',')},Calificación\n`
  grades.forEach((row) => {
    csvString += `${row.student},${row.grades.join(',')},${row.average}\n`
  })
  return csvString
}

export const getExamCSV = (questions, grades) => {
  let csvString = `Alumno,${questions.map(i => i.question).join(',')},Calificación\n`
  grades.forEach((row) => {
    csvString += `${row.student},${row.answers.map(i => i.answer).join(',')},${row.grade}\n`
  })
  return csvString
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
