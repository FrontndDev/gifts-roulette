import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
  composeRenderProps,
} from 'react-aria-components'
import { tv } from 'tailwind-variants'
import { Variants } from 'motion'

export const buttonVariantsMotion: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 280,
      damping: 20,
      mass: 1,
    },
  },
  exit: {
    opacity: 0,
    y: 30,
    transition: { duration: 0.15, ease: 'easeIn' },
  },
  tap: {
    scale: 0.98,
    transition: { type: 'spring', stiffness: 600, damping: 30 },
  },
}
export const buttonVariantsMotion2: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 280,
      damping: 20,
      mass: 1,
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: { duration: 0.15, ease: 'easeIn' },
  },
  tap: {
    scale: 0.98,
    transition: { type: 'spring', stiffness: 600, damping: 30 },
  },
}

const buttonStyles = tv({
  base: [
    'whitespace-nowrap relative isolate active:scale-[0.97] inline-flex transition-all cursor-pointer items-center font-medium justify-center gap-x-[4px]',
    'bg-(--btn-bg) text-(--btn-fg)',
    'forced-colors:[--btn-icon:ButtonText]',
    '*:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:my-1 *:data-[slot=icon]:size-4 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:text-current/60 pressed:*:data-[slot=icon]:text-current *:data-[slot=icon]:transition',
    '*:data-[slot=avatar]:-mx-0.5 *:data-[slot=avatar]:my-1 *:data-[slot=avatar]:*:size-4 *:data-[slot=avatar]:size-4 *:data-[slot=avatar]:shrink-0',
  ],
  variants: {
    intent: {
      primary: [
        '[--btn-bg:var(--color-primary)] text-text [--btn-fg:var(--color-error)] [--btn-overlay:var(--color-primary-hover)]',
      ],
      secondary: [
        '[--btn-bg:var(--color-dark-gray-button)] text-white [--btn-fg:var(--color-secondary-fg)] [--btn-overlay:var(--color-dark-gray-button-hover)]',
      ],
      warning: [
        '[--btn-bg:var(--color-warning)]/95 [--btn-fg:var(--color-warning-fg)] [--btn-overlay:var(--color-warning)]',
      ],
      danger: [
        '[--btn-bg:var(--color-danger)]/95 [--btn-fg:var(--color-danger-fg)] [--btn-overlay:var(--color-danger)]',
      ],
      outline: [
        'outline-primary [--btn-fg:var(--color-primary)] border-1 border-primary',
      ],
      plain: [
        '[--btn-fg:var(--color-black)] bg-neutral-20 [--btn-overlay:var(--color-neutral-30)]',
      ],
    },
    size: {
      'extra-small':
        'h-8 px-[calc(var(--spacing)*2.7)] text-xs/4 **:data-[slot=avatar]:*:size-3.5 **:data-[slot=avatar]:size-3.5 **:data-[slot=icon]:size-3 lg:text-[0.800rem]/4',
      small: 'h-9 px-3 text-sm',
      medium: 'min-h-11 px-4 text-[15px] leading-tight !rounded-xl',
      large: 'h-[52px] px-4 !rounded-2xl text-[15px] leading-tight',
      'square-petite': 'min-w-11 min-h-11 !rounded-xl shrink-0',
    },
    shape: {
      square: 'rounded-lg',
      circle: 'rounded-full',
    },
    isDisabled: {
      true: 'bg-white/4 text-white active:scale-[100%] cursor-not-allowed',
    },
    isPending: {
      true: 'opacity-50',
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'medium',
    shape: 'square',
  },
})

interface ButtonProps extends ButtonPrimitiveProps {
  intent?: 'primary' | 'secondary' | 'danger' | 'warning' | 'outline' | 'plain'
  size?: 'medium' | 'large' | 'square-petite' | 'extra-small' | 'small'
  shape?: 'square' | 'circle'
  ref?: React.Ref<HTMLButtonElement>
}

const Button = ({
  className,
  intent,
  size,
  shape,
  ref,
  ...props
}: ButtonProps) => {
  return (
    <ButtonPrimitive
      ref={ref}
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        buttonStyles({
          ...renderProps,
          intent,
          size,
          shape,
          className,
        }),
      )}
    >
      {(values) => (
        <>
          {typeof props.children === 'function'
            ? props.children(values)
            : props.children}
        </>
      )}
    </ButtonPrimitive>
  )
}

export type { ButtonProps }
export { Button, buttonStyles }
