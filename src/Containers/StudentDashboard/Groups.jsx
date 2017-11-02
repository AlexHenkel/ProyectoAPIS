import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Typography, Button } from 'material-ui'
import AddIcon from 'material-ui-icons/Add'
import Loading from '../../Components/Common/Loading'
import Group from '../../Components/Group'
import { AlignCenter } from '../../Components/Common/Utils'
import NoResults from '../../Components/Common/NoResults'
import ModalSave from '../../Components/Common/ModalSave'
import GroupsActions from '../../Data/Redux/GroupsRedux'

class Groups extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalSaveOpened: false,
    }
  }

  componentWillReceiveProps({ loading, groups }) {
    const { loading: currLoading, selectActiveGroup } = this.props
    if (!loading && currLoading) {
      if (groups.length) {
        selectActiveGroup(groups[0].id, groups[0].name)
      }
    }
  }

  // /** Fired on add item. Open modal */
  onAdd = () => this.setState({ modalSaveOpened: true })

  onCloseModalSave = () => {
    this.setState({ modalSaveOpened: false })
  }

  render() {
    const { loading, groups, userId } = this.props
    const { modalSaveOpened } = this.state
    return (
      <div>
        <Typography type="display1" gutterBottom>Mis grupos</Typography>
        {loading && <Loading />}
        {!loading && (
          <div>
            <AlignCenter>
              <Button color="accent" onClick={this.onAdd}>
                <AddIcon />
                Inscribir grupo
              </Button>
            </AlignCenter>
            {groups.length ? groups.map((group, index) => (
              <Group
                key={index}
                allowEdit={false}
                {...group}
              />
            )) : <NoResults />}
          </div>
        )}
        <ModalSave
          open={modalSaveOpened}
          title="Grupo"
          onRequestClose={this.onCloseModalSave}
          modalType="create"
          statePath="groups"
          typePrefix="GROUPS"
          fields={[
            {
              type: 'textField',
              id: 1,
              name: 'student_id',
              inputType: 'hidden',
              value: userId,
            },
            {
              type: 'textField',
              id: 1,
              name: 'groupCode',
              label: 'Código del grupo',
              required: true,
            },
          ]}
        />
      </div>
    )
  }
}

Groups.propTypes = {
  loading: PropTypes.bool.isRequired,
  groups: PropTypes.array.isRequired,
  selectActiveGroup: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
}

const mapStateToProps = state => ({
  loading: state.groups.get.fetching,
  groups: state.groups.get.results,
  userId: state.user.userId,
})

const mapDispatchToProps = dispatch => ({
  selectActiveGroup: (id, name) => dispatch(GroupsActions.selectActiveGroup(id, name)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Groups)
