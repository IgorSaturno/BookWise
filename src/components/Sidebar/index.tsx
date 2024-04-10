import Image from 'next/image'
import { LoginButton, SidebarContainer, UserDetails } from './styles'

import LogoImg from '../../../public/images/logo.svg'
import { Navigation } from '../Navigation'
import { signOut, useSession } from 'next-auth/react'
import { SignIn, SignOut } from 'phosphor-react'
import { Text } from '../Typography'
import { Avatar } from '../UI/Avatar'
import { useRouter } from 'next/router'

export function Sidebar() {
  const { data: session } = useSession()

  const router = useRouter()

  const user = session?.user

  function handleOpenProfile() {
    router.push(`/profile/${user?.id}`)
  }

  return (
    <SidebarContainer>
      <div>
        <Image className="logo" src={LogoImg} alt="BookWise Logo" />
        <Navigation />
      </div>
      <footer>
        {!user ? (
          <LoginButton href="/login">
            Fazer Login
            <SignIn size={24} />
          </LoginButton>
        ) : (
          <UserDetails>
            <Avatar
              size="sm"
              src={user.avatar_url}
              alt={user?.name}
              onClick={handleOpenProfile}
              css={{ cursor: 'pointer' }}
            />
            <Text size="sm">{user?.name}</Text>
            <SignOut size={20} color="#F75A68" onClick={() => signOut()} />
          </UserDetails>
        )}
      </footer>
    </SidebarContainer>
  )
}
