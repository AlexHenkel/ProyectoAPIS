import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import TeacherDashboard from './TeacherDashboard/Dashboard'
import StudentDashboard from './StudentDashboard/Dashboard'

class DashboardManager extends Component {
  componentDidMount() {
    const { user: { userId }, goLogin } = this.props
    if (!userId) {
      goLogin()
    }
  }

  render() {
    const { user: { userId, isTeacher } } = this.props
    return (
      <div>
        {isTeacher ?
          <TeacherDashboard userId={userId} /> :
          <StudentDashboard userId={userId} />
        }
      </div>
    )
  }
}

DashboardManager.propTypes = {
  user: PropTypes.object.isRequired,
  goLogin: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispatch => ({
  goLogin: () => dispatch(push('/login')),
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardManager)
