import React from 'react'
import styled from 'styled-components'
import { Typography as OriginalTypography } from 'material-ui'

const Typography = styled(OriginalTypography)`
  margin-top: 50px !important;
  margin-bottom: 50px !important;
`

export default () => (
  <Typography type="subheading" color="primary" gutterBottom align="center">
    No se encontraron resultados <span>:(</span>
  </Typography>
)
