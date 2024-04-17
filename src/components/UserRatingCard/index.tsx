import Link from 'next/link'
import { UserDetails, UserRatingCardContainer } from './styles'
import { Rating, User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { Avatar } from '../UI/Avatar'
import { Heading, Text } from '../Typography'
import { getRelativeTimeString } from '@/utils/getRelativeTimeString'
import { RatingStars } from '../RatingStars'

export type RatingWithAuthor = Rating & {
  user: User
}

type UserRatingCardProps = {
  rating: RatingWithAuthor
}

export function UserRatingCard({ rating }: UserRatingCardProps) {
  const { data: session } = useSession()
  const distance = getRelativeTimeString(new Date(rating.created_at), 'pt-BR')
  const isOwner = session?.user?.id === rating.user_id

  return (
    <UserRatingCardContainer variant={isOwner ? 'highlight' : 'primary'}>
      <UserDetails>
        <section>
          <Link href={`/profile/${rating.user_id}`}>
            <Avatar alt="avatar" src={rating.user.avatar_url!} />
          </Link>
          <div>
            <Heading size="xs">{rating.user.name}</Heading>
            <Text size="sm" color="gray-400">
              {distance}
            </Text>
          </div>
        </section>

        <RatingStars rating={rating.rate} />
      </UserDetails>
      <Text size="sm" color="gray-300">
        {rating.description}
      </Text>
    </UserRatingCardContainer>
  )
}
