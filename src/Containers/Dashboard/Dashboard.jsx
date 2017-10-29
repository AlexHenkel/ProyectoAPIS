import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Grid,
} from 'material-ui'
import Groups from './Groups'
import Exams from './Exams'
import Students from './Students'
import Top10 from './Top10'
import GroupCode from './GroupCode'

import GroupsActions from '../../Data/Redux/GroupsRedux'
import OverviewActions from '../../Data/Redux/OverviewRedux'

class Dashboard extends Component {
  componentDidMount() {
    this.props.getGroups()
    this.props.getOverview()
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
          <Students />
          <Top10 />
        </Grid>
      </Grid>
    )
  }
}

Dashboard.propTypes = {
  getGroups: PropTypes.func.isRequired,
  getOverview: PropTypes.func.isRequired,
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  getGroups: () => dispatch(GroupsActions.getRequest({
    isTeacher: true,
    id: 1,
  })),
  getOverview: () => dispatch(OverviewActions.getOneRequest(1, {
    isTeacher: true,
  })),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
