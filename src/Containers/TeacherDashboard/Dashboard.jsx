import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Grid,
} from 'material-ui'
import Groups from './Groups'
import Exams from './Exams'
import Students from './Students'
import GroupCode from './GroupCode'
import GroupResult from './GroupResult'
import Top10 from '../../Components/Top10'

import GroupsActions from '../../Data/Redux/GroupsRedux'
import OverviewActions from '../../Data/Redux/OverviewRedux'
import ExamsActions from '../../Data/Redux/ExamsRedux'

class Dashboard extends Component {
  componentDidMount() {
    this.props.getGroups()
    this.props.getExams()
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
          <GroupCode />
          <GroupResult />
          <Students />
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
  getExams: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  activeGroup: state.groups.activeGroup,  
})

const mapDispatchToProps = dispatch => ({
  getGroups: () => dispatch(GroupsActions.getRequest({
    isTeacher: true,
    id: 1,
  })),
  getOverview: id => dispatch(OverviewActions.getOneRequest(id, { isTeacher: true })),
  getExams: () => dispatch(ExamsActions.getRequest(1)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
