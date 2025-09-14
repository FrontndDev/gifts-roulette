import { composeRenderProps } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

function composeTailwindRenderProps<T>(
  className: string | ((v: T) => string) | undefined,
  tailwind: string,
): string | ((v: T) => string) {
  return composeRenderProps(className, (className) =>
    twMerge(tailwind, className),
  )
}

const focusRing = tv({
  variants: {
    isFocused: {
      true: 'outline-0',
    },
    isFocusVisible: { true: 'outline-0' },
    isInvalid: { true: '' },
  },
})

const focusStyles = tv({
  extend: focusRing,
  variants: {
    isFocused: {
      true: 'border-primary forced-colors:border-[Highlight]',
    },
    isInvalid: {
      true: 'shadow-border-error',
      false: 'bg-dark-gray-button',
    },
  },
})

export { composeTailwindRenderProps, focusRing, focusStyles }
