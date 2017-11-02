import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Grid } from 'material-ui'
import Quizes from './Quizes'
import Questions from './Questions'

import ExamsActions from '../../Data/Redux/ExamsRedux'
import QuestionsActions from '../../Data/Redux/QuestionsRedux'
import TagsActions from '../../Data/Redux/TagsRedux'

class Resources extends Component {
  componentDidMount() {
    const { user: { userId, isTeacher }, goLogin, getExams, getQuestions, getTags } = this.props
    if (!userId || !isTeacher) {
      goLogin()
    }
    getExams(userId)
    getQuestions(userId)
    getTags(userId)
  }

  render() {
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={4}>
          <Questions />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Quizes />
        </Grid>
      </Grid>
    )
  }
}

Resources.propTypes = {
  getExams: PropTypes.func.isRequired,
  getQuestions: PropTypes.func.isRequired,
  getTags: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  goLogin: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispatch => ({
  getExams: userId => dispatch(ExamsActions.getRequest(userId)),
  getQuestions: userId => dispatch(QuestionsActions.getRequest(userId)),
  getTags: userId => dispatch(TagsActions.getRequest(userId)),
  goLogin: () => dispatch(push('/login')),
})

export default connect(mapStateToProps, mapDispatchToProps)(Resources)

