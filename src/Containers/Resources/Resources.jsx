import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid } from 'material-ui'
import Quizes from './Quizes'
import Questions from './Questions'

import ExamsActions from '../../Data/Redux/ExamsRedux'
import QuestionsActions from '../../Data/Redux/QuestionsRedux'
import TagsActions from '../../Data/Redux/TagsRedux'

class Resources extends Component {
  componentDidMount() {
    this.props.getExams()
    this.props.getQuestions()
    this.props.getTags()
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
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  getExams: () => dispatch(ExamsActions.getRequest(1)),
  getQuestions: () => dispatch(QuestionsActions.getRequest(1)),
  getTags: () => dispatch(TagsActions.getRequest(1)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Resources)

