import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Typography,
  Card,
  CardContent,
} from 'material-ui'
import { AlignCenter } from '../../Components/Utils'
import Loading from '../../Components/Loading'

const GroupCode = ({ loading, groupCode }) => (
  <div>
    <Typography type="display1" gutterBottom>Código de grupo</Typography>
    {loading && <Loading />}
    {!loading && (
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
    )}
  </div>
)

GroupCode.propTypes = {
  loading: PropTypes.bool.isRequired,
  groupCode: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  loading: state.overview.getOne.fetching,
  groupCode: state.overview.getOne.result.groupCode,
})

export default connect(mapStateToProps)(GroupCode)
