import { NavigationContainer, NavItemContainer } from './styles'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useMemo } from 'react'
import { Binoculars, ChartLineUp, User } from 'phosphor-react'

const NAV_ITEMS = [
  {
    label: 'Início',
    href: '/',
    icon: <ChartLineUp size={24} />,
  },
  {
    label: 'Explorar',
    href: '/explore',
    icon: <Binoculars size={24} />,
  },
]

export function Navigation() {
  const router = useRouter()

  const { data: session } = useSession()

  const navItems = useMemo(() => {
    if (session) {
      return NAV_ITEMS.concat({
        label: 'Perfil',
        href: `/profile/${session.user.id}`,
        icon: <User size={24} />,
      })
    }

    return NAV_ITEMS
  }, [session])

  return (
    <NavigationContainer>
      {navItems.map(({ href, label, icon }) => (
        <NavItemContainer
          href={href}
          key={label}
          active={router.asPath === href}
        >
          {icon}
          {label}
        </NavItemContainer>
      ))}
    </NavigationContainer>
  )
}
