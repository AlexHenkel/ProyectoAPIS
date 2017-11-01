import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import { Typography, Tab, Tabs } from 'material-ui'
import SwipeableViews from 'react-swipeable-views'
import { withTheme } from 'material-ui/styles'
import Exam from '../../Components/Student/Exam'
import Loading from '../../Components/Common/Loading'
import NoResults from '../../Components/Common/NoResults'

import StudentStateActions from '../../Data/Redux/StudentStateRedux'

export const TabContainer = ({ children }) => <div style={{ padding: 8 * 3 }}>{children}</div>
TabContainer.propTypes = { children: PropTypes.node.isRequired }

const Alert = styled(Typography)`
  background-color: #ff6e40;
  color: white !important;
  display: flex !important;
  justify-content: center;
  align-items: center;
  padding: 20px;
  flex-direction: column;
  border-radius: 3px;

  a {
    color: #444444;
    margin: 15px 0;
  }
`

class Exams extends Component {
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

  handleClickAlert = id => this.props.studentState === 'onResource' ? `/recurso/${id}` : `/examen/${id}`

  handleClickExam = id => () => {
    const { goToResource, activeGroup, setResourceOnState } = this.props
    setResourceOnState(id)
    goToResource(activeGroup)
  }

  render() {
    const { theme, loading, currentExams, pastExams, studentState, activeExamId } = this.props
    const { tabIndex } = this.state

    return (
      <div>
        <Typography type="display1" gutterBottom>Mis examenes</Typography>
        {studentState !== 'free' && (
          <Alert type="title">
            <div>Tienes un examen pendiente.</div>
            <Link to={this.handleClickAlert(activeExamId)}>Haz click aquí para continuarlo</Link>
            <small>Debes completar este intento para realizar otros examenes.</small>
          </Alert>
        )}
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
              <Tab label="Activos" />
              <Tab label="Pasados" />
            </Tabs>
            <SwipeableViews
              index={tabIndex}
              onChangeIndex={this.handleChangeIndex}
            >
              <TabContainer>
                {currentExams.length ? currentExams.map(data => (
                  <Exam
                    key={data.id}
                    data={data}
                    theme={theme}
                    noEdit
                    onClickButton={this.handleClickExam(data.id)}
                    noActions={studentState !== 'free'}
                  />
                )) : <NoResults />}
              </TabContainer>
              <TabContainer>
                {pastExams.length ? pastExams.map(data => (
                  <Exam
                    key={data.id}
                    data={data}
                    theme={theme}
                    noEdit
                    noActions
                  />
                )) : <NoResults />}
              </TabContainer>
            </SwipeableViews>
          </div>
        )}
      </div>
    )
  }
}

Exams.propTypes = {
  theme: PropTypes.object.isRequired,
  activeGroup: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  currentExams: PropTypes.array.isRequired,
  pastExams: PropTypes.array.isRequired,
  goToResource: PropTypes.func.isRequired,
  studentState: PropTypes.string.isRequired,
  activeExamId: PropTypes.number.isRequired,
  setResourceOnState: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  studentState: state.studentState.getOne.result.state,
  activeExamId: state.studentState.getOne.result.examId,
  activeGroup: state.groups.activeGroup,
  loading: state.overview.getOne.fetching,
  currentExams: state.overview.getOne.result.currentExams,
  pastExams: state.overview.getOne.result.pastExams,
})

const mapDispatchToProps = dispatch => ({
  goToResource: id => dispatch(push(`/recurso/${id}`)),
  setResourceOnState: id => dispatch(StudentStateActions.updateRequest(1, {
    state: 'onResource',
    examId: id,
  })),
})

export default connect(mapStateToProps, mapDispatchToProps)(withTheme()(Exams))
