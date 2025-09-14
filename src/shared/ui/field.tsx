import type { HTMLAttributes } from 'react'
import type {
  GroupProps,
  InputProps as InputPrimitiveProps,
  LabelProps,
  TextFieldProps as TextFieldPrimitiveProps,
  TextProps,
} from 'react-aria-components'
import {
  composeRenderProps,
  Group,
  Input as InputPrimitive,
  Label as LabelPrimitive,
  Text,
} from 'react-aria-components'
import { tv } from 'tailwind-variants'
import { composeTailwindRenderProps, focusStyles } from '@/shared/primitive'
import { cn } from '@/shared/libs'

interface FieldProps {
  label?: string
  placeholder?: string
  description?: string
  errorMessage?: string | null
  'aria-label'?: TextFieldPrimitiveProps['aria-label']
  'aria-labelledby'?: TextFieldPrimitiveProps['aria-labelledby']
}

const fieldStyles = tv({
  slots: {
    description: 'text-pretty font-medium text-white/50 text-xs',
    label: 'w-fit cursor-default font-semibold text-white text-sm',
    fieldError: 'text-error text-xs',
  },
})

const { description, label, fieldError } = fieldStyles()

const Label = ({ className, ...props }: LabelProps) => {
  return <LabelPrimitive {...props} className={label({ className })} />
}

interface DescriptionProps extends TextProps {
  isWarning?: boolean
  ref?: React.RefObject<HTMLElement>
}

const Description = ({ ref, className, ...props }: DescriptionProps) => {
  const isWarning = props.isWarning ?? false
  return (
    <Text
      ref={ref}
      {...props}
      slot="description"
      className={description({
        className: isWarning ? 'text-warning' : className,
      })}
    />
  )
}

const FieldError = ({ ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return <span {...props} className={fieldError()} />
}

const fieldGroupStyles = tv({
  base: [
    '[--gutter-x:--spacing(2.5)] font-medium bg-dark-gray [--padding-inset:--spacing(6)]',
    'group flex h-[48px] px-1 items-center overflow-hidden rounded-xl transition-all',
    'relative',
    '[&>[role=progressbar]:first-child]:ml-(--gutter-x) [&>[role=progressbar]:last-child]:mr-(--gutter-x)',
    '*:data-[slot=icon]:z-10 **:data-[slot=icon]:size-4 **:data-[slot=icon]:shrink-0 **:[button]:shrink-0',
    '[&>button:has([data-slot=icon]):first-child]:left-0 [&>button:has([data-slot=icon]):last-child]:right-0 [&>button:has([data-slot=icon])]:absolute',
    '*:data-[slot=icon]:pointer-events-none *:data-[slot=icon]:absolute *:data-[slot=icon]:top-[calc(var(--spacing)*2.7)] *:data-[slot=icon]:text-muted-fg',
    '[&>[data-slot=icon]:first-child]:left-(--gutter-x) [&>[data-slot=icon]:last-child]:right-(--gutter-x)',
    '[&:has([data-slot=icon]+input)]:pl-(--padding-inset) [&:has(input+[data-slot=icon])]:pr-(--padding-inset)',
    '[&:has([data-slot=icon]+[role=group])]:pl-(--padding-inset) [&:has([role=group]+[data-slot=icon])]:pr-(--padding-inset)',
    'has-[[data-slot=icon]:last-child]:[&_input]:pr-[calc(var(--padding-inset)+1)]',
    '*:[button]:h-8',
    '[&>button:first-child]:ml-[calc(var(--spacing)*0.7)] [&>button:last-child]:mr-[calc(var(--spacing)*0.7)]',
  ],
  variants: {
    isFocusWithin: focusStyles.variants.isFocused,
    isInvalid: focusStyles.variants.isInvalid,
    isDisabled: {
      true: 'opacity-50 forced-colors:border-[GrayText]',
    },
  },
})

interface FieldGroupProps extends GroupProps {
  ref?: React.RefObject<HTMLDivElement>
}
const FieldGroup = ({ className, ref, ...props }: FieldGroupProps) => {
  return (
    <Group
      {...props}
      ref={ref}
      className={composeRenderProps(className, (className, renderProps) =>
        fieldGroupStyles({
          ...renderProps,
          className,
        }),
      )}
    />
  )
}

interface InputProps extends InputPrimitiveProps {
  ref?: React.RefObject<HTMLInputElement>
  errorMessage: boolean
}

const Input = ({ className, ref, errorMessage, ...props }: InputProps) => {
  return (
    <InputPrimitive
      ref={ref}
      {...props}
      className={composeTailwindRenderProps(
        className,
        cn(
          'h-full w-full min-w-0 pl-3 text-[15px] leading-tight font-medium text-white !placeholder-white/50 outline-0 [&::-ms-reveal]:hidden [&::-webkit-search-cancel-button]:hidden',
        ),
      )}
    />
  )
}

export type { DescriptionProps, FieldProps, InputProps }
export { Description, FieldError, FieldGroup, fieldStyles, Input, Label }
