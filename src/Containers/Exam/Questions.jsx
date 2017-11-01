import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Typography, Grid } from 'material-ui'
import Loading from '../../Components/Common/Loading'
import ExamQuestions from '../../Components/Student/Questions'

import StudentStateActions from '../../Data/Redux/StudentStateRedux'
import ExamQuestionsActions from '../../Data/Redux/ExamQuestionsRedux'

class Questions extends Component {
  componentDidMount() {
    const { match: { params: { id } } } = this.props
    this.props.getQuestions(id)
    this.props.getState()
  }

  componentWillReceiveProps(nextProps) {
    const { successIntent, goHome, setFreeOnState, resetIntent,
      match: { params: { id } } } = this.props
    if (nextProps.successIntent && !successIntent) {
      setFreeOnState(id)
      resetIntent()
    } else if (!nextProps.successIntent && successIntent) {
      goHome(id)
    }
  }

  handleMoveForward = (answers) => {
    const { match: { params: { id } } } = this.props
    this.props.createExamIntent({
      id,
      student_id: 1,
      answers,
    })
  }

  render() {
    const { loading, studentState: { state, examId },
      questions: { name, questions }, match: { params: { id } } } = this.props
    const isInvalid = (state === 'onExam' && examId !== Number(id)) || state === 'onResource'
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={2} />
        <Grid item xs={12} sm={8}>
          {loading && <Loading />}
          {!loading && (
            <div>
              {isInvalid && (
                <div>
                  <Typography type="display2" align="center">Lo sentimos.</Typography>
                  <Typography type="display2" align="center" color="accent">Tienes abierto otro examen.</Typography>
                  <Typography type="display2" align="center" color="primary">Es necesario que termines el examen actual para poder responder otro.</Typography>
                </div>
              )}
              {!isInvalid && (
                <div>
                  <Typography type="display2" gutterBottom>Examen - {name}</Typography>
                  <ExamQuestions questions={questions} onFinish={this.handleMoveForward} />
                </div>
              )}
            </div>
          )}
        </Grid>
      </Grid>
    )
  }
}

Questions.propTypes = {
  loading: PropTypes.bool.isRequired,
  studentState: PropTypes.object.isRequired,
  getQuestions: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  questions: PropTypes.object.isRequired,
  goHome: PropTypes.func.isRequired,
  setFreeOnState: PropTypes.func.isRequired,
  createExamIntent: PropTypes.func.isRequired,
  successIntent: PropTypes.bool.isRequired,
  resetIntent: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  loading: state.studentState.getOne.fetching || state.examQuestions.getOne.fetching ||
    state.examQuestions.create.fetching,
  studentState: state.studentState.getOne.result,
  questions: state.examQuestions.getOne.result,
  successIntent: state.examQuestions.create.success,
})

const mapDispatchToProps = dispatch => ({
  getQuestions: id => dispatch(ExamQuestionsActions.getOneRequest(id)),
  getState: () => dispatch(StudentStateActions.getOneRequest(1)),
  goHome: () => dispatch(push('/')),
  setFreeOnState: id => dispatch(StudentStateActions.updateRequest(1, {
    state: 'free',
    examId: id,
  })),
  createExamIntent: data => dispatch(ExamQuestionsActions.createRequest(data)),
  resetIntent: () => dispatch(ExamQuestionsActions.createReset()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Questions)

