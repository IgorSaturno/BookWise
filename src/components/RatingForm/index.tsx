import { useSession } from 'next-auth/react'
import {
  ActionsContainer,
  FormContainer,
  RatingFormContainer,
  UserDetails,
} from './styles'
import { Avatar } from '../UI/Avatar'
import { Heading } from '../Typography'
import { RatingStars } from '../RatingStars'
import { FormEvent, useState } from 'react'
import { TextArea } from '../UI/Form/TextArea'
import { ActionIcon } from '../UI/ActionIcon'
import { Check, X } from 'phosphor-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { queryClient } from '@/lib/react-query'

type RatingFormProps = {
  onCancel: () => void
  bookId: string
}

export function RatingForm({ onCancel, bookId }: RatingFormProps) {
  const { data: session } = useSession()

  const user = session?.user

  const [description, setDescription] = useState('')

  const [currentRate, setCurrentRate] = useState(0)

  const submitDisabled = !description.trim() || !currentRate

  const queryClient = useQueryClient()

  const handleBookRating = async () => {
    try {
      // Faça uma requisição POST para avaliar o livro
      await api.post(`/books/${bookId}/rate`, {
        description,
        rate: currentRate,
      })
      queryClient.invalidateQueries(['book', bookId])
      queryClient.invalidateQueries(['books'])
      onCancel()
      console.log('Livro avaliado com sucesso!')
    } catch (error) {
      console.error('Erro ao avaliar o livro:', error)
    }
  }

  // Função para lidar com o envio do formulário
  const handleSubmitForm = async (event: FormEvent) => {
    event.preventDefault()
    if (submitDisabled) return

    await handleBookRating()
  }

  const { mutateAsync: handleRate } = useMutation(handleBookRating)

  return (
    <RatingFormContainer>
      {user && (
        <UserDetails>
          <section>
            <Avatar alt={user.name} src={user.avatar_url} />
            <Heading size="xs">{user.name}</Heading>
          </section>
          <RatingStars
            size="lg"
            rating={currentRate}
            setRating={setCurrentRate}
          />
        </UserDetails>
      )}

      <FormContainer onSubmit={handleSubmitForm}>
        <TextArea
          placeholder="Descreva sua avaliação"
          maxLength={450}
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <ActionsContainer>
          <ActionIcon
            type="button"
            onClick={onCancel}
            iconColor="purple100"
            icon={<X />}
          />
          <ActionIcon
            type="submit"
            iconColor="green100"
            icon={<Check />}
            disabled={submitDisabled}
          />
        </ActionsContainer>
      </FormContainer>
    </RatingFormContainer>
  )
}
