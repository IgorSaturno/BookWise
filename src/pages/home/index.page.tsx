import { NextPageWithLayout } from '../_app.page'
import { DefaultLayout } from '@/layouts/DefaultLayout'
import { HomeContainer } from './styles'
import { LatestRatings } from '@/components/LatestRatings'
import { PopularBooks } from '@/components/PopularBooks'

const HomePage: NextPageWithLayout = () => {
  return (
    <HomeContainer>
      <LatestRatings />
      <PopularBooks />
    </HomeContainer>
  )
}

HomePage.getLayout = (page) => {
  return <DefaultLayout title="Início">{page}</DefaultLayout>
}

export default HomePage
