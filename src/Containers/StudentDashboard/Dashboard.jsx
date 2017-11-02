import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Grid,
} from 'material-ui'
import Groups from './Groups'
import Exams from './Exams'
import Grades from './Grades'
import Top10 from '../../Components/Top10'

import GroupsActions from '../../Data/Redux/GroupsRedux'
import OverviewActions from '../../Data/Redux/OverviewRedux'
import StudentStateActions from '../../Data/Redux/StudentStateRedux'

class Dashboard extends Component {
  componentDidMount() {
    const { userId, getGroups, getState } = this.props
    getGroups(userId)
    getState(userId)
  }

  componentWillReceiveProps({ activeGroup }) {
    const { activeGroup: prevGroup, getOverview } = this.props
    if (activeGroup >= 0 && activeGroup !== prevGroup) {
      getOverview(activeGroup)
    }
  }


  render() {
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={3}>
          <Groups />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Exams />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Grades />
          <Top10 />
        </Grid>
      </Grid>
    )
  }
}

Dashboard.propTypes = {
  activeGroup: PropTypes.number.isRequired,
  getGroups: PropTypes.func.isRequired,
  getOverview: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
}

const mapStateToProps = state => ({
  activeGroup: state.groups.activeGroup,
})

const mapDispatchToProps = dispatch => ({
  getGroups: userId => dispatch(GroupsActions.getRequest({
    isTeacher: false,
    id: userId,
  })),
  getOverview: id => dispatch(OverviewActions.getOneRequest(id, { isTeacher: false })),
  getState: userId => dispatch(StudentStateActions.getOneRequest(userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
