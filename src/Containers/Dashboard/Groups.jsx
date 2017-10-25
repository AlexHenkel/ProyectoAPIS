import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Typography,
  Card as OriginalCard,
  CardContent,
  CardActions,
  Button,
} from 'material-ui'
import { withTheme } from 'material-ui/styles'
import AddIcon from 'material-ui-icons/Add'
import { AlignCenter } from '../../Components/Utils'
import ContextMenu, { ContextContainer } from '../../Components/ContextMenu'
import ModalSave from '../../Components/ModalSave'
import ModalRemove from '../../Components/ModalRemove'

const Card = styled(OriginalCard)`
  margin: 15px 0;
  ${({ active, theme }) => !active ? '' : `background-color: ${theme.palette.primary[500]} !important;`}
  position: relative;
`

const CardText = styled(Typography)`
  ${({ active }) => !active ? '' : 'color: rgba(255,255,255,0.75) !important;'}
`

const DisabledButton = styled(Button)`
  color: rgba(255,255,255,0.75) !important;
`
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
    const {
      theme,
      groups,
      selectActiveGroup,
      activeGroup,
    } = this.props
    const {
      modalSaveOpened,
      modalType,
      toModifyId,
      modalRemoveOpened,
    } = this.state
    return (
      <div>
        <Typography type="display1" gutterBottom>Mis cursos</Typography>
        {groups.map(({ id, name, activeQuizes }) => (
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
                Quizes activos: <b>{activeQuizes}</b>
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
        <AlignCenter>
          <Button color="accent" onClick={this.onAdd}>
            <AddIcon />
            Agregar grupo
          </Button>
        </AlignCenter>
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
  groups: PropTypes.array,
  activeGroup: PropTypes.number,
  selectActiveGroup: PropTypes.func,
}

Groups.defaultProps = {
  groups: [
    {
      id: 1,
      name: 'Física 1 - ENE/DIC 17',
      activeQuizes: 1,
    },
    {
      id: 2,
      name: 'Física 2 - ENE/DIC 17',
      activeQuizes: 1,
    },
  ],
  activeGroup: 1,
  selectActiveGroup: id => console.log('change group', id),
}

export default withTheme()(Groups)
