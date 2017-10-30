import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Typography,
  CardContent,
  CardActions,
  Button,
} from 'material-ui'
import { withTheme } from 'material-ui/styles'
import AddIcon from 'material-ui-icons/Add'
import { AlignCenter, DisabledButton, Card, CardText } from '../../Components/Utils'
import ContextMenu, { ContextContainer } from '../../Components/ContextMenu'
import ModalSave from '../../Components/ModalSave'
import ModalRemove from '../../Components/ModalRemove'
import Loading from '../../Components/Loading'
import GroupsActions from '../../Data/Redux/GroupsRedux'

class Groups extends Component {
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
    const { theme, loading, groups, selectActiveGroup, activeGroup } = this.props
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
            {groups.map(({ id, name, activeExams }) => (
              <Card key={id} active={activeGroup === id ? 'yes' : ''} theme={theme}>
                <CardContent>
                  <ContextContainer>
                    <ContextMenu
                      value={id}
                      handleEdit={this.onEdit}
                      handleRemove={this.onRemove}
                    />
                  </ContextContainer>
                  <CardText type="headline" component="h2" gutterBottom active={activeGroup === id ? 'yes' : ''}>
                    {name}
                  </CardText>
                  <CardText type="body1" gutterBottom active={activeGroup === id ? 'yes' : ''}>
                    Quizes activos: <b>{activeExams}</b>
                  </CardText>
                </CardContent>
                <CardActions>
                  {activeGroup === id && (
                    <DisabledButton disabled>Seleccionado</DisabledButton>
                  )}
                  {activeGroup !== id && (
                    <Button dense color="accent" onClick={() => selectActiveGroup(id)}>Ver Más</Button>
                  )}
                </CardActions>
              </Card>
            ))}
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
              type: 'textField',
              id: 2,
              name: 'startDate',
              path: 'startDate',
              inputType: 'datetime-local',
              label: 'Fecha de inicio',
              required: true,
            },
            {
              type: 'textField',
              id: 3,
              name: 'endDate',
              path: 'endDate',
              inputType: 'datetime-local',
              label: 'Fecha de fin',
              required: true,
            },
            {
              type: 'textField',
              id: 4,
              name: 'teacher_id',
              inputType: 'hidden',
              value: 1, // TODO: Change this for user id
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
  theme: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  groups: PropTypes.array.isRequired,
  activeGroup: PropTypes.number.isRequired,
  selectActiveGroup: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  loading: state.groups.get.fetching,
  groups: state.groups.get.results,
  activeGroup: state.groups.activeGroup,
})

const mapDispatchToProps = dispatch => ({
  selectActiveGroup: (id, name) => dispatch(GroupsActions.selectActiveGroup(id, name)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withTheme()(Groups))
