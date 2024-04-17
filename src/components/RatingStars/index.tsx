import { Star } from 'phosphor-react'
import { RatingStarsContainer } from './styles'
import { ComponentProps } from '@stitches/react'
import { useState } from 'react'

type RatingStarsProps = ComponentProps<typeof RatingStarsContainer> & {
  rating: number
  size?: 'sm' | 'md' | 'lg'
  setRating?: (rating: number) => void
}

export function RatingStars({
  rating,
  size = 'sm',
  setRating,
  ...props
}: RatingStarsProps) {
  const [previewValue, setPreviewValue] = useState(0)
  const isEditable = !!setRating
  const ratingValue = isEditable ? previewValue : rating
  function handlerMouseEnter(value: number) {
    if (isEditable) setPreviewValue(value)
  }
  function handlerMouseLeave() {
    if (isEditable) setPreviewValue(rating)
  }
  function handleSetValue() {
    if (isEditable) setRating(previewValue)
  }
  return (
    <RatingStarsContainer
      css={isEditable ? { cursor: 'pointer' } : undefined}
      size={size}
      {...props}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={`star-${i}`}
          weight={i + 1 <= ratingValue ? 'fill' : 'regular'}
          onMouseEnter={() => handlerMouseEnter(i + 1)}
          onMouseLeave={handlerMouseLeave}
          onClick={handleSetValue}
        />
      ))}
    </RatingStarsContainer>
  )
}
