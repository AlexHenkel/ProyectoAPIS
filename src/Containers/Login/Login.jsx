import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

class Login extends Component {
  componentDidMount() {
    const { userId, goHome } = this.props
    if (userId) {
      goHome('/')
    }
  }

  render() {
    return (
      <div>
        Login
      </div>
    )
  }
}

Login.propTypes = {
  userId: PropTypes.number,
  goHome: PropTypes.func.isRequired,
}

Login.defaultProps = {
  userId: null,
}

const mapStateToProps = state => ({
  userId: state.user.userId,
})

const mapDispatchToProps = dispatch => ({
  goHome: () => dispatch(push('/')),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
