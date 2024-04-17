import { useQuery } from '@tanstack/react-query'
import { BookCard, BookWithAvgRating } from '../BookCard'
import { Text } from '../Typography'
import { Link } from '../UI/Link'
import { PopularBooksContainer } from './styles'
import { api } from '@/lib/axios'

export function PopularBooks() {
  const { data: popularBooks } = useQuery<BookWithAvgRating[]>({
    queryKey: ['popular-books'],
    queryFn: async () => {
      const { data } = await api.get('/books/popular')
      return data?.books ?? []
    },
  })
  return (
    <PopularBooksContainer>
      <header>
        <Text size="sm">Lívros populares</Text>
        <Link href="/explore" text="Ver todos" />
      </header>
      <section>
        {popularBooks?.map((book) => (
          <BookCard key={`popular-${book.id}`} book={book} />
        ))}
      </section>
    </PopularBooksContainer>
  )
}
