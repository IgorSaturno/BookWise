import { Book } from '@prisma/client'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  BookCardContainer,
  BookCardDetails,
  BookCardImage,
  BookCardName,
  ReadBage,
} from './styles'
import { Text } from '../Typography'
import { RatingStars } from '../RatingStars'
import { RatingsDialog } from '../RatingsDialog'

export type BookWithAvgRating = Book & {
  avgRating: number
  alreadyRead: boolean
}

type BookCardProps = {
  book: BookWithAvgRating
  size?: 'md' | 'lg'
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function BookCard({ book, size = 'md' }: BookCardProps) {
  const IMAGE_SIZES = {
    md: {
      width: 64,
      heigth: 94,
    },
    lg: {
      width: 108,
      heigth: 151,
    },
  }

  const currentSize = IMAGE_SIZES[size]
  return (
    <RatingsDialog bookId={book?.id}>
      <BookCardContainer>
        {book.alreadyRead && <ReadBage>LIDO</ReadBage>}
        <BookCardImage
          width={currentSize.width}
          height={currentSize.heigth}
          css={{ minWidth: currentSize.width }}
          alt={book.name}
          src={book.cover_url}
        />
        <BookCardDetails>
          <div>
            <BookCardName size="xs">{book.name}</BookCardName>
            <Text size="sm" color="gray-400">
              {book.author}
            </Text>
          </div>
          <RatingStars rating={book.avgRating} />
        </BookCardDetails>
      </BookCardContainer>
    </RatingsDialog>
  )
}
