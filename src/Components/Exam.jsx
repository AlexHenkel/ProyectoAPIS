import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Typography,
  CardContent,
  Grid,
  CardActions as OriginalCardActions,
} from 'material-ui'
import moment from 'moment'
import { AlignCenter, Card, CardText } from './Common/Utils'
import ContextMenu, { ContextContainer } from './Common/ContextMenu'

const Date = styled(Typography)`
  line-height: 1 !important;
`

const CardActions = styled(OriginalCardActions)`
  justify-content: flex-end;
`

const LimitText = styled(Typography)`
  color: ${({ theme }) => theme.palette.grey[500]} !important;
`

const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC']

const Exam = ({ data: { id, name, expiresAt },
  onEdit, onRemove, theme, noEdit, children, actions }) => (
    <Card key={id}>
      <CardContent>
        {!noEdit && (
          <ContextContainer>
            <ContextMenu
              value={id}
              handleEdit={onEdit}
              handleRemove={onRemove}
            />
          </ContextContainer>
        )}
        <Grid container spacing={24}>
          <Grid item xs={12} sm={3}>
            <AlignCenter>
              <Date type="display3">{moment(expiresAt).date()}</Date>
            </AlignCenter>
            <AlignCenter>
              <Typography type="subheading">{months[moment(expiresAt).month()]}</Typography>
            </AlignCenter>
            <AlignCenter>
              <LimitText type="body2" theme={theme}>Fecha límite</LimitText>
            </AlignCenter>
          </Grid>
          <Grid item xs={12} sm={9}>
            <CardText type="display1" component="h2" gutterBottom>
              {name}
            </CardText>
            {children}
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        {actions}
      </CardActions>
    </Card>
)

Exam.propTypes = {
  data: PropTypes.object.isRequired,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
  theme: PropTypes.object.isRequired,
  noEdit: PropTypes.bool,
  children: PropTypes.node.isRequired,
  actions: PropTypes.node.isRequired,
}

Exam.defaultProps = {
  onEdit: null,
  onRemove: null,
  noEdit: false,
}

export default Exam
