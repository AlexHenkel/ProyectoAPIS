import React from 'react'
import PropTypes from 'prop-types'
import {
  Typography,
  Card,
  CardContent,
} from 'material-ui'
import { AlignCenter } from '../../Components/Utils'

const GroupCode = ({ groupCode }) => (
  <div>
    <Typography type="display1" gutterBottom>Código de grupo</Typography>
    <Card>
      <CardContent>
        <AlignCenter>
          <Typography type="display2" color="accent" gutterBottom>{groupCode}</Typography>
        </AlignCenter>
        <Typography>
          Comparte este código con tus alumnos para que se inscriban a este grupo.
        </Typography>
      </CardContent>
    </Card>
  </div>
)

GroupCode.propTypes = {
  groupCode: PropTypes.string,
}

GroupCode.defaultProps = {
  groupCode: '1FS4B',
}

export default GroupCode
