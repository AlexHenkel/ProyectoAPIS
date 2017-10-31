import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Typography } from 'material-ui'
import Loading from '../../Components/Common/Loading'
import Group from '../../Components/Group'
import GroupsActions from '../../Data/Redux/GroupsRedux'

class Groups extends Component {
  componentWillReceiveProps({ loading, groups }) {
    const { loading: currLoading, selectActiveGroup } = this.props
    if (!loading && currLoading) {
      if (groups.length) {
        selectActiveGroup(groups[0].id, groups[0].name)
      }
    }
  }

  render() {
    const { loading, groups } = this.props
    return (
      <div>
        <Typography type="display1" gutterBottom>Mis grupos</Typography>
        {loading && <Loading />}
        {!loading && groups.map((group, index) => (
          <Group
            key={index}
            allowEdit={false}
            {...group}
          />
        ))}
      </div>
    )
  }
}

Groups.propTypes = {
  loading: PropTypes.bool.isRequired,
  groups: PropTypes.array.isRequired,
  selectActiveGroup: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  loading: state.groups.get.fetching,
  groups: state.groups.get.results,
})

const mapDispatchToProps = dispatch => ({
  selectActiveGroup: (id, name) => dispatch(GroupsActions.selectActiveGroup(id, name)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Groups)
