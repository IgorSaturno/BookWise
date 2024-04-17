import { Fragment, useState } from 'react'
import { Text } from '../Typography'
import { Link } from '../UI/Link'
import { RatingWithAuthor, UserRatingCard } from '../UserRatingCard'
import { BookRatingsContainer } from './styles'
import { RatingForm } from '../RatingForm'
import { useSession } from 'next-auth/react'
import { LoginDialog } from '../LoginDialog'

type BookRatingsProps = {
  ratings: RatingWithAuthor[]
  bookId: string
}

export function BookRatings({ ratings, bookId }: BookRatingsProps) {
  const { status, data: session } = useSession()
  const [showForm, setShowForm] = useState(false)

  const isAuthenticated = status === 'authenticated'

  function handleRate() {
    if (!isAuthenticated) return
    setShowForm(true)
  }

  const RatingWrapper = isAuthenticated ? Fragment : LoginDialog

  const sortedRatingsByDate = ratings.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })

  const canRate = ratings.every((x) => x.user_id !== session?.user?.id)

  return (
    <BookRatingsContainer>
      <header>
        <Text>Avaliações</Text>
        {canRate && (
          <RatingWrapper>
            <Link withoutIcon onClick={handleRate} text="Avaliar" />
          </RatingWrapper>
        )}
      </header>
      <section>
        {showForm && (
          <RatingForm bookId={bookId} onCancel={() => setShowForm(false)} />
        )}
        {sortedRatingsByDate.map((rating) => (
          <UserRatingCard key={rating.id} rating={rating} />
        ))}
      </section>
    </BookRatingsContainer>
  )
}
