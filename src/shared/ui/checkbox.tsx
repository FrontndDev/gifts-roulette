import type {
  CheckboxGroupProps as CheckboxGroupPrimitiveProps,
  CheckboxProps as CheckboxPrimitiveProps,
  ValidationResult,
} from 'react-aria-components'
import {
  CheckboxGroup as CheckboxGroupPrimitive,
  Checkbox as CheckboxPrimitive,
  composeRenderProps,
} from 'react-aria-components'
import { tv } from 'tailwind-variants'

import { twMerge } from 'tailwind-merge'
import { Check, Minus } from 'lucide-react'
import { Description, FieldError, Label } from '@/shared/ui/field'
import { composeTailwindRenderProps } from '@/shared/primitive'
import { cn } from '@/shared/libs'

interface CheckboxGroupProps extends CheckboxGroupPrimitiveProps {
  label?: string
  description?: string
  errorMessage?: string
}

const CheckboxGroup = ({
  className,
  children,
  ...props
}: CheckboxGroupProps) => {
  return (
    <CheckboxGroupPrimitive
      {...props}
      className={composeTailwindRenderProps(className, 'flex flex-col gap-y-2')}
    >
      {(values) => (
        <>
          {props.label && <Label>{props.label}</Label>}
          {typeof children === 'function' ? children(values) : children}
          {props.description && (
            <Description className="block">{props.description}</Description>
          )}
          {props.errorMessage && <FieldError>{props.errorMessage}</FieldError>}
        </>
      )}
    </CheckboxGroupPrimitive>
  )
}

const checkboxStyles = tv({
  base: 'group flex text-white items-center gap-2 text-sm transition',
  variants: {
    isDisabled: {
      true: 'opacity-50',
    },
  },
})

const boxStyles = tv({
  base: 'flex size-5 transition-all shrink-0 cursor-pointer items-center justify-center bg-white rounded border-[2.3px] border-[#B0B5BA] rounded-full transition *:data-[slot=icon]:size-3',
  variants: {
    isSelected: {
      false: 'bg-white',
      true: [
        'border-primary',
        'group-invalid:bg-danger group-invalid:text-danger-fg',
      ],
    },
    isFocused: {
      true: ['group-invalid:border-danger/70 group-invalid:text-danger-fg'],
    },
    isInvalid: {
      true: 'border-danger/70 bg-danger/20 text-danger-fg',
    },
  },
})

interface CheckboxProps extends CheckboxPrimitiveProps {
  description?: string
  label?: string
  isCheck?: boolean
}

const Checkbox = ({
  className,
  children,
  description,
  label,
  isCheck = false,
  ...props
}: CheckboxProps) => {
  return (
    <CheckboxPrimitive
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        checkboxStyles({ ...renderProps, className }),
      )}
    >
      {({ isSelected, isIndeterminate, ...renderProps }) => (
        <div
          className={twMerge(
            'flex gap-x-2',
            description ? 'items-start' : 'items-center',
          )}
        >
          <div
            className={cn(
              boxStyles({
                ...renderProps,
                isSelected: isSelected || isIndeterminate,
              }),
              isCheck && 'border-gray-outline !size-5 !rounded bg-transparent',
              isSelected && isCheck && 'bg-primary border-primary',
            )}
          >
            {isIndeterminate && (
              <Minus className="size-3.5" data-slot="checkbox-indicator" />
            )}
            {isSelected && isCheck && (
              <Check
                className="size-3.5 stroke-[3px]"
                data-slot="checkbox-indicator"
              />
            )}
            {isSelected && !isCheck && (
              <div
                className="bg-primary size-3 rounded-full"
                data-slot="checkbox-indicator"
              />
            )}
          </div>

          <div className="flex flex-col gap-1">
            <>
              {label ? (
                <Label
                  className={twMerge(description && 'text-sm/4 font-normal')}
                >
                  {label}
                </Label>
              ) : (
                children
              )}
              {description && <Description>{description}</Description>}
            </>
          </div>
        </div>
      )}
    </CheckboxPrimitive>
  )
}

export type { CheckboxGroupProps, CheckboxProps }
export { CheckboxGroup, Checkbox }
