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
                    <Button dense color="accent" onClick={selectActiveGroup(id)}>Ver Más</Button>
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
          fields={[
            {
              type: 'textField',
              id: 1,
              name: 'name',
              label: 'Nombre del grupo',
              required: true,
            },
            {
              type: 'textField',
              id: 2,
              name: 'startDate',
              inputType: 'datetime-local',
              label: 'Fecha de inicio',
              required: true,
            },
            {
              type: 'textField',
              id: 3,
              name: 'endDate',
              inputType: 'datetime-local',
              label: 'Fecha de fin',
              required: true,
            },
          ]}
        />
        <ModalRemove
          open={modalRemoveOpened}
          onRequestClose={this.onCloseModalRemove}
          toRemoveId={toModifyId}
        />
      </div>
    )
  }
}

Groups.propTypes = {
  theme: PropTypes.object.isRequired,
  loading: PropTypes.object.isRequired,
  groups: PropTypes.array.isRequired,
  activeGroup: PropTypes.number,
  selectActiveGroup: PropTypes.func,
}

Groups.defaultProps = {
  activeGroup: 1,
  selectActiveGroup: id => console.log('change group', id),
}

const mapStateToProps = state => ({
  loading: state.groups.get.fetching,
  groups: state.groups.get.results,
})

export default connect(mapStateToProps)(withTheme()(Groups))
