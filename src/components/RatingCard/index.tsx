import Link from 'next/link'
import {
  BookContent,
  BookDetails,
  RatingBookImage,
  RatingCardContainer,
  ToggleShowMoreButton,
  UserDetails,
} from './styles'
import { Avatar } from '../UI/Avatar'
import { Book, Rating, User } from '@prisma/client'
import { Heading, Text } from '../Typography'
import { getRelativeTimeString } from '@/utils/getRelativeTimeString'
import { RatingStars } from '../RatingStars'
import { useToggleShowMore } from '@/hooks/useToggleShowMore'

export type RatingWithAuthorAndBook = Rating & {
  user: User
  book: Book
}

const MAX_SUMMARY_LENGHT = 180

type RatingCardProps = {
  rating: RatingWithAuthorAndBook
}

export function RatingCard({ rating }: RatingCardProps) {
  const distance = getRelativeTimeString(new Date(rating.created_at), 'pt-BR')

  const {
    text: bookSummary,
    isShowingMore,
    toggleShowMore,
  } = useToggleShowMore(rating.book.summary, MAX_SUMMARY_LENGHT)

  return (
    <RatingCardContainer>
      <UserDetails>
        <section>
          <Link href={`/profile/${rating.user_id}`}>
            <Avatar src={rating.user.avatar_url!} alt={rating.user.name} />
          </Link>
          <div>
            <Text>{rating.user.name}</Text>
            <Text size="sm" color="gray-400">
              {distance}
            </Text>
          </div>
        </section>
        <RatingStars rating={rating.rate} />
      </UserDetails>
      <BookDetails>
        <Link href={`/explore?book=${rating.book_id}`}>
          <RatingBookImage
            width={108}
            height={152}
            alt={rating.book.name}
            src={rating.book.cover_url}
          />
        </Link>
        <BookContent>
          <div>
            <Heading size="xs">{rating.book.name}</Heading>
            <Text size="sm" color="gray-400">
              {rating.book.author}
            </Text>
          </div>

          <Text
            size="sm"
            color="gray-300"
            css={{
              marginTop: '$5',
            }}
          >
            {bookSummary}
            {rating.book.summary.length > MAX_SUMMARY_LENGHT && (
              <ToggleShowMoreButton onClick={toggleShowMore}>
                {isShowingMore ? 'Ver menos' : 'Ver mais'}
              </ToggleShowMoreButton>
            )}
          </Text>
        </BookContent>
      </BookDetails>
    </RatingCardContainer>
  )
}
