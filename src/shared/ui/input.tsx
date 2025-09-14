import { Eye, EyeClosed } from 'lucide-react'
import { useState } from 'react'
import type {
  InputProps,
  TextFieldProps as TextFieldPrimitiveProps,
} from 'react-aria-components'
import {
  Button as ButtonPrimitive,
  TextField as TextFieldPrimitive,
} from 'react-aria-components'

import { composeTailwindRenderProps } from '../primitive'
import { Loader } from '@/shared/ui/loader'
import {
  Description,
  FieldError,
  FieldGroup,
  FieldProps,
  Input,
  Label,
} from '@/shared/ui/field'

type InputType = Exclude<InputProps['type'], 'password'>

interface BaseTextFieldProps extends TextFieldPrimitiveProps, FieldProps {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  isPending?: boolean
  className?: string
}

interface RevealableTextFieldProps extends BaseTextFieldProps {
  isRevealable: true
  type: 'password'
}

interface NonRevealableTextFieldProps extends BaseTextFieldProps {
  isRevealable?: never
  type?: InputType
}

type TextFieldProps = RevealableTextFieldProps | NonRevealableTextFieldProps

const TextField = ({
  placeholder,
  label,
  description,
  errorMessage,
  prefix,
  suffix,
  isPending,
  className,
  isRevealable,
  type,
  ...props
}: TextFieldProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const inputType = isRevealable
    ? isPasswordVisible
      ? 'text'
      : 'password'
    : type
  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev)
  }
  return (
    <TextFieldPrimitive
      validationBehavior={'aria'}
      type={inputType}
      {...props}
      className={composeTailwindRenderProps(
        className,
        'group flex flex-col gap-y-3',
      )}
    >
      {!props.children ? (
        <>
          {label && description && (
            <div className={'flex flex-col gap-0.5'}>
              {label && <Label>{label}</Label>}
              {description && <Description>{description}</Description>}
            </div>
          )}
          {label && !description && <Label>{label}</Label>}
          {description && !label && <Description>{description}</Description>}
          <FieldGroup
            isDisabled={props.isDisabled}
            isInvalid={!!errorMessage}
            data-loading={isPending ? 'true' : undefined}
          >
            {prefix && typeof prefix === 'string' ? (
              <span className="text-muted-fg ml-2">{prefix}</span>
            ) : (
              prefix
            )}
            <Input errorMessage={!!errorMessage} placeholder={placeholder} />
            {isRevealable ? (
              <ButtonPrimitive
                type="button"
                aria-label="Toggle password visibility"
                onPress={handleTogglePasswordVisibility}
                className="*:data-[slot=icon]:text-muted-fg focus-visible:*:data-[slot=icon]:text-primary relative grid shrink-0 cursor-pointer place-content-center border-transparent pr-1 outline-0"
              >
                {isPasswordVisible ? (
                  <EyeClosed className={'size-5.5'} strokeWidth={1.8} />
                ) : (
                  <Eye className={'size-5.5'} strokeWidth={1.8} />
                )}
              </ButtonPrimitive>
            ) : isPending ? (
              <Loader variant="spin" />
            ) : suffix ? (
              typeof suffix === 'string' ? (
                <span className="text-muted-fg mr-2">{suffix}</span>
              ) : (
                suffix
              )
            ) : null}
          </FieldGroup>
          {errorMessage && <FieldError>{errorMessage}</FieldError>}
        </>
      ) : (
        props.children
      )}
    </TextFieldPrimitive>
  )
}

export type { TextFieldProps }
export { TextField }
