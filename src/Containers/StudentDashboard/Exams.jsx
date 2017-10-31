import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Typography, Tab, Tabs } from 'material-ui'
import SwipeableViews from 'react-swipeable-views'
import { withTheme } from 'material-ui/styles'
import Exam from '../../Components/Student/Exam'
import Loading from '../../Components/Common/Loading'

export const TabContainer = ({ children }) => <div style={{ padding: 8 * 3 }}>{children}</div>
TabContainer.propTypes = { children: PropTypes.node.isRequired }

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

  render() {
    const { theme, activeGroup, loading, currentExams, pastExams, goToExam } = this.props
    const { tabIndex } = this.state

    return (
      <div>
        <Typography type="display1" gutterBottom>Mis examenes</Typography>
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
                {currentExams.map(data => (
                  <Exam
                    key={data.id}
                    data={data}
                    theme={theme}
                    noEdit
                    onClickButton={() => goToExam(activeGroup)}
                  />
                ))}
              </TabContainer>
              <TabContainer>
                {pastExams.map(data => (
                  <Exam
                    key={data.id}
                    data={data}
                    theme={theme}
                    noEdit
                    noActions
                  />
                ))}
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
  goToExam: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  activeGroup: state.groups.activeGroup,
  loading: state.overview.getOne.fetching,
  currentExams: state.overview.getOne.result.currentExams,
  pastExams: state.overview.getOne.result.pastExams,
})

const mapDispatchToProps = dispatch => ({
  goToExam: id => dispatch(push(`/examen/${id}`)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withTheme()(Exams))
