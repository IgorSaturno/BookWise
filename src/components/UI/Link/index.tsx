import { ComponentProps } from '@stitches/react'
import { LinkContainer } from './styles'
import { CaretLeft, CaretRight } from 'phosphor-react'

type LinkProps = Omit<ComponentProps<typeof LinkContainer>, 'href'> & {
  text: string
  href?: string
  onClick?: () => void
  withoutIcon?: boolean
}

export function Link({
  text,
  href,
  onClick,
  iconSide = 'right',
  withoutIcon,
  ...props
}: LinkProps) {
  return (
    <LinkContainer
      {...props}
      href={href!}
      iconSide={iconSide}
      onClick={onClick}
      as={onClick ? 'button' : undefined}
    >
      {text}
      {!withoutIcon && (iconSide === 'right' ? <CaretRight /> : <CaretLeft />)}
    </LinkContainer>
  )
}
