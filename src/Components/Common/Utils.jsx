import styled from 'styled-components'
import { Button, Card as OriginalCard, Typography } from 'material-ui'

export const AlignCenter = styled.div`
  display: flex;
  justify-content: center;
`

export const AlignMiddle = styled.div`
  display: flex;
  align-items: center;
`

export const DisabledButton = styled(Button)`
  color: rgba(255,255,255,0.75) !important;
`

export const Card = styled(OriginalCard)`
  margin: 15px 0;
  ${({ active, theme }) => !active ? '' : `background-color: ${theme.palette.primary[500]} !important;`}
  position: relative;
  padding-right: 30px;
`

export const CardText = styled(Typography)`
  ${({ active }) => !active ? '' : 'color: rgba(255,255,255,0.75) !important;'}
`
