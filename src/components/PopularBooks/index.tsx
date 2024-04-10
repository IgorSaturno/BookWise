import { BookCard } from '../BookCard'
import { Text } from '../Typography'
import { Link } from '../UI/Link'
import { PopularBooksContainer } from './styles'

export function PopularBooks() {
  return (
    <PopularBooksContainer>
      <header>
        <Text size="sm">Lívros populares</Text>
        <Link href="/explore" text="Ver todos" />
      </header>
      <section>
        {Array.from({ length: 4 }).map((_, i) => (
          <BookCard
            key={`popular-${i}`}
            book={{
              author: 'John Doe',
              avgRating: 4,
              cover_url: 'https://github.com/igorsaturno.png',
              created_at: new Date(),
              id: '',
              name: 'lorem ipsum dolor sit',
              summary: 'lorem ipsum dolor sit amet, consectetur adipiscing',
              total_pages: 100,
            }}
          />
        ))}
      </section>
    </PopularBooksContainer>
  )
}
