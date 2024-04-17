import { ReactNode } from 'react'
import { BookInfoContainer } from './styles'
import { Heading, Text } from '@/components/Typography'

type BookInfoProps = {
  icon: ReactNode
  title: string
  info: string
}

export function BookInfo({ icon, title, info }: BookInfoProps) {
  return (
    <BookInfoContainer>
      {icon}
      <div>
        <Text size="sm" color="gray-300">
          {title}
        </Text>
        <Heading size="sm" color="gray-200">
          {info}
        </Heading>
      </div>
    </BookInfoContainer>
  )
}
