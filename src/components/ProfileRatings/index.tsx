import { Book, CategoriesOnBooks, Category, Rating } from '@prisma/client'
import { ProfileRatingsContainer, RatingsList } from './styles'
import { PageTitle } from '../UI/PageTitle'
import { MagnifyingGlass, User } from 'phosphor-react'
import { Link } from '../UI/Link'
import { Input } from '../UI/Form/Input'
import { useMemo, useState } from 'react'
import { ProfileRatingCard } from './ProfileRatingCard'
import { Text } from '../Typography'

export type ProfileRating = Rating & {
  book: Book & {
    categories: CategoriesOnBooks &
      {
        category: Category
      }[]
  }
}

type ProfileRatingsProps = {
  ratings: ProfileRating[]
  isOwnProfile?: boolean
}

export function ProfileRatings({ isOwnProfile, ratings }: ProfileRatingsProps) {
  const [search, setSearch] = useState('')

  const filteredRatings = useMemo(() => {
    return ratings.filter((rating) => {
      return rating.book.name.toLowerCase().includes(search.toLowerCase())
    })
  }, [ratings, search])

  return (
    <ProfileRatingsContainer>
      {isOwnProfile ? (
        <PageTitle title="Perfil" icon={<User size={25} />} />
      ) : (
        <Link
          href="/"
          text="Voltar"
          iconSide="left"
          color="white"
          css={{ alignSelf: 'flex-start' }}
        />
      )}
      <Input
        placeholder="Buscar livro avaliado"
        icon={<MagnifyingGlass size={20} />}
        css={{ marginTop: 40, marginBottom: 32 }}
        value={search}
        onChange={({ target }) => setSearch(target.value)}
      />
      <RatingsList>
        {filteredRatings.map((rating) => (
          <ProfileRatingCard key={rating.id} rating={rating} />
        ))}
        {filteredRatings.length <= 0 && (
          <Text color="gray-400" css={{ textAlign: 'center' }}>
            {search
              ? 'Nenhum resultado encontrado'
              : 'Nenhuma avaliação encontrada'}
          </Text>
        )}
      </RatingsList>
    </ProfileRatingsContainer>
  )
}
