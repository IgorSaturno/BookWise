import { ReactNode } from 'react'
import { ActionIconContainer } from './styles'
import { theme } from '../../../../stitches.config'
import { ComponentProps } from '@stitches/react'

type ActionIconProps = ComponentProps<typeof ActionIconContainer> & {
  icon: ReactNode
  iconColor: keyof typeof theme.colors
}

export function ActionIcon({ icon, iconColor, ...props }: ActionIconProps) {
  return (
    <ActionIconContainer {...props} css={{ color: `$${iconColor}` }}>
      {icon}
    </ActionIconContainer>
  )
}
