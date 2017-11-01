import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Grid, Tab, Tabs } from 'material-ui'
import SwipeableViews from 'react-swipeable-views'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import OriginalPaper from 'material-ui/Paper'
import DialogResults from '../../Components/Teacher/DialogResults'
import Loading from '../../Components/Common/Loading'
import NoResults from '../../Components/Common/NoResults'
import { TabContainer } from './Exams'
import GroupExamResultsActions from '../../Data/Redux/GroupExamResultsRedux'

export const Paper = styled(OriginalPaper)`
  width: 100%;
  overflow-x: auto;
`

export const AnswerCell = styled(TableCell)`
  color: ${({ correct }) => !correct ? 'red' : 'green'};
`

export const ExamResultTable = ({ questions, grades }) => (
  <Paper>
    {grades.length ?
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Alumno</TableCell>
            {questions.map(({ id: questionId, question }) => (
              <TableCell key={questionId} numeric>{question}</TableCell>
            ))}
            <TableCell><b>Cal.</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {grades.map(grade => (
            <TableRow key={grade.id}>
              <TableCell>{grade.student}</TableCell>
              {grade.answers.map(({ answer, isCorrect }, index) => (
                <AnswerCell key={index} correct={isCorrect ? 'yes' : ''} numeric>{answer}</AnswerCell>
              ))}
              <TableCell><b>{grade.grade}</b></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    : <NoResults />}
  </Paper>
)
ExamResultTable.propTypes = {
  questions: PropTypes.array.isRequired,
  grades: PropTypes.array.isRequired,
}

class ExamResult extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabIndex: 0,
    }
  }

  handleChange = (event, tabIndex) => {
    this.setState({ tabIndex })
  }

  handleChangeIndex = (tabIndex) => {
    this.setState({ tabIndex })
  }

  render() {
    const { loading, title, questions, highestGrades, recentGrades, getResults } = this.props
    const { tabIndex } = this.state
    return (
      <DialogResults
        title={`Resultados del examen ${title}`}
        buttonText="Ver Resultados"
        onOpen={getResults}
      >
        <Grid container spacing={24}>
          <Grid item xs={12} sm={2} />
          <Grid item xs={12} sm={8}>
            {loading && <Loading />}
            {!loading && (
              <div>
                <Tabs
                  value={tabIndex}
                  onChange={this.handleChange}
                  indicatorColor="accent"
                  textColor="primary"
                  centered
                >
                  <Tab label="Calificación más alta" />
                  <Tab label="Calificación más reciente" />
                </Tabs>
                <SwipeableViews
                  index={tabIndex}
                  onChangeIndex={this.handleChangeIndex}
                >
                  <TabContainer>
                    <ExamResultTable questions={questions} grades={highestGrades} />
                  </TabContainer>
                  <TabContainer>
                    <ExamResultTable questions={questions} grades={recentGrades} />
                  </TabContainer>
                </SwipeableViews>
              </div>
            )}
          </Grid>
        </Grid>
      </DialogResults>
    )
  }
}

ExamResult.propTypes = {
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  questions: PropTypes.array.isRequired,
  highestGrades: PropTypes.array.isRequired,
  recentGrades: PropTypes.array.isRequired,
  getResults: PropTypes.func.isRequired,
}


const mapStateToProps = state => ({
  loading: state.groupExamResults.getOne.fetching,
  questions: state.groupExamResults.getOne.result.questions,
  highestGrades: state.groupExamResults.getOne.result.highestGrades,
  recentGrades: state.groupExamResults.getOne.result.recentGrades,
})

const mapDispatchToProps = (dispatch, { groupId, examId }) => ({
  getResults: () => dispatch(GroupExamResultsActions.getOneRequest({ groupId, examId })),
})


export default connect(mapStateToProps, mapDispatchToProps)(ExamResult)
