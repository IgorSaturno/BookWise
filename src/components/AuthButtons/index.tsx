import Image from 'next/image'
import { AuthButton, AuthButtonContainer } from './styles'
import GoogleIcon from '../../../public/images/icons/google.svg'
import GithubIcon from '../../../public/images/icons/github.svg'
import RocketIcon from '../../../public/images/icons/rocket.svg'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

type AuthButtonProps = {
  callbackUrl?: string
}

export function AuthButtons({ callbackUrl = '/' }: AuthButtonProps) {
  const router = useRouter()

  const handleSingIn = (provider?: string) => {
    if (!provider) {
      router.push(callbackUrl)
      return
    }
    signIn(provider, {
      callbackUrl,
    })
  }

  return (
    <AuthButtonContainer>
      <AuthButton onClick={() => handleSingIn('google')}>
        <Image src={GoogleIcon} alt="Google logo" />
        Entrar com Google
      </AuthButton>
      <AuthButton onClick={() => handleSingIn('github')}>
        <Image src={GithubIcon} alt="Github logo" />
        Entrar com Github
      </AuthButton>
      <AuthButton onClick={() => handleSingIn()}>
        <Image src={RocketIcon} alt="Rocket Icon" />
        Entrar como visitante
      </AuthButton>
    </AuthButtonContainer>
  )
}
