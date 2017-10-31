import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { CardContent, CardActions, Button } from 'material-ui'
import { withTheme } from 'material-ui/styles'
import { DisabledButton, Card, CardText } from './Common/Utils'
import ContextMenu, { ContextContainer } from './Common/ContextMenu'
import GroupsActions from '../Data/Redux/GroupsRedux'

const Group = ({ id, allowEdit, onEdit, onRemove, activeGroup, theme,
  name, activeExams, selectActiveGroup }) => (
    <Card key={id} active={activeGroup === id ? 'yes' : ''} theme={theme}>
      <CardContent>
        {allowEdit && (
          <ContextContainer>
            <ContextMenu
              value={id}
              handleEdit={onEdit}
              handleRemove={onRemove}
            />
          </ContextContainer>
        )}
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
)

Group.propTypes = {
  id: PropTypes.number.isRequired,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
  activeGroup: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  activeExams: PropTypes.number.isRequired,
  selectActiveGroup: PropTypes.func.isRequired,
  allowEdit: PropTypes.bool.isRequired,
}

Group.defaultProps = {
  onEdit: () => null,
  onRemove: () => null,
}

const mapStateToProps = state => ({
  activeGroup: state.groups.activeGroup,
})

const mapDispatchToProps = dispatch => ({
  selectActiveGroup: (id, name) => dispatch(GroupsActions.selectActiveGroup(id, name)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withTheme()(Group))
