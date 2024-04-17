import { ComponentProps } from '@stitches/react'
import { TagContainer } from './styles'
import { ReactNode } from 'react'

type TagProps = ComponentProps<typeof TagContainer> & {
  children: ReactNode
  active?: boolean
}

export function Tag({ children, active, ...props }: TagProps) {
  return (
    <TagContainer active={active} {...props}>
      {children}
    </TagContainer>
  )
}
