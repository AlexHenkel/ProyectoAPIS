import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Typography, Button } from 'material-ui'
import AddIcon from 'material-ui-icons/Add'
import { AlignCenter } from '../../Components/Common/Utils'
import ModalSave from '../../Components/Common/ModalSave'
import ModalRemove from '../../Components/Common/ModalRemove'
import Loading from '../../Components/Common/Loading'
import NoResults from '../../Components/Common/NoResults'
import Group from '../../Components/Group'
import GroupsActions from '../../Data/Redux/GroupsRedux'

export class Groups extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalType: 'create',
      modalSaveOpened: false,
      modalRemoveOpened: false,
      toModifyId: -1,
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

  // /** Fired on add item. Set type of modal and then open modal */
  onAdd = () => this.setState({
    modalType: 'create',
  }, () => this.setState({ modalSaveOpened: true }))

  // /** Fired on update item. Set type of modal, id and then open modal */
  onEdit = id => this.setState({
    modalType: 'update',
    toModifyId: id,
  }, () => this.setState({ modalSaveOpened: true }))

  // /** Function fired on remove item */
  onRemove = id => this.setState({
    toModifyId: id,
    modalRemoveOpened: true,
  })

  onCloseModalSave = () => {
    this.setState({ modalSaveOpened: false })
  }

  onCloseModalRemove = () => {
    this.setState({ modalRemoveOpened: false })
  }

  render() {
    const { loading, groups, userId } = this.props
    const { modalSaveOpened, modalType, toModifyId, modalRemoveOpened } = this.state
    return (
      <div>
        <Typography type="display1" gutterBottom>Mis grupos</Typography>
        {loading && <Loading />}
        {!loading && (
          <div>
            <AlignCenter>
              <Button color="accent" onClick={this.onAdd}>
                <AddIcon />
                Agregar grupo
              </Button>
            </AlignCenter>
            {groups.length ? groups.map((group, index) => (
              <Group
                key={index}
                onEdit={this.onEdit}
                onRemove={this.onRemove}
                allowEdit
                {...group}
              />
            )) : <NoResults />}
          </div>
        )}
        <ModalSave
          open={modalSaveOpened}
          title="Grupo"
          onRequestClose={this.onCloseModalSave}
          modalType={modalType}
          toUpdateId={toModifyId}
          statePath="groups"
          typePrefix="GROUPS"
          getOnePath="groups.get.results"
          extraParamsSave={{
            isTeacher: true,
          }}
          fields={[
            {
              type: 'textField',
              id: 1,
              name: 'name',
              path: 'name',
              label: 'Nombre del grupo',
              required: true,
            },
            {
              type: 'datepicker',
              id: 2,
              name: 'startDate',
              path: 'startDate',
              label: 'Fecha de inicio',
              required: true,
              help: 'A partir de esta fecha, el quiz estará disponible para tí y tus alumnos',
            },
            {
              type: 'datepicker',
              id: 3,
              name: 'endDate',
              path: 'endDate',
              inputType: 'datetime-local',
              label: 'Fecha de fin',
              required: true,
              help: 'Después de esta fecha, el grupo se cerrará automáticamente',
            },
            {
              type: 'textField',
              id: 4,
              name: 'teacherId',
              inputType: 'hidden',
              value: userId,
              specificFor: 'create',
            },
          ]}
        />
        <ModalRemove
          open={modalRemoveOpened}
          onRequestClose={this.onCloseModalRemove}
          toRemoveId={toModifyId}
          statePath="groups"
          typePrefix="GROUPS"
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
