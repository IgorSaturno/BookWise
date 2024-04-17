import { ChartLineUp } from 'phosphor-react'
import { PageTitle } from '../UI/PageTitle'
import { LatestContainer, LatestRatingsContainer } from './styles'
import { Text } from '../Typography'
import { RatingCard, RatingWithAuthorAndBook } from '../RatingCard'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { useSession } from 'next-auth/react'
import { Link } from '../UI/Link'

export function LatestRatings() {
  const { data: ratings } = useQuery<RatingWithAuthorAndBook[]>({
    queryKey: ['latest-ratings'],
    queryFn: async () => {
      const { data } = await api.get('/ratings/latest')
      return data?.ratings ?? []
    },
  })

  const { data: session } = useSession()

  const userId = session?.user?.id

  const { data: latestUserRating } = useQuery<RatingWithAuthorAndBook>({
    queryKey: ['latest-user-rating', userId],
    queryFn: async () => {
      const { data } = await api.get('/ratings/user-latest')
      return data?.rating ?? null
    },
    enabled: !!userId,
  })

  return (
    <LatestRatingsContainer>
      <PageTitle
        title="Início"
        icon={<ChartLineUp size={32} />}
        css={{ marginBottom: 40 }}
      />

      {latestUserRating && (
        <LatestContainer>
          <header>
            <Text size="sm">Sua última leitura</Text>

            <Link text="Ver todas" href={`/profile/${userId}`} />
          </header>

          <RatingCard variant="compact" rating={latestUserRating} />
        </LatestContainer>
      )}

      <Text size="sm">Avaliações mais recentes</Text>

      <section>
        {ratings?.map((rating) => (
          <RatingCard variant="compact" key={rating.id} rating={rating} />
        ))}
      </section>
    </LatestRatingsContainer>
  )
}
