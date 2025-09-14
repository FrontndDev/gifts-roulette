import { useEffect, useRef } from 'react'

import type { HeadingProps } from 'react-aria-components'
import {
  Button as ButtonPrimitive,
  Dialog as DialogPrimitive,
  Heading,
  Text,
} from 'react-aria-components'

import { twJoin, twMerge } from 'tailwind-merge'
import { Button, ButtonProps } from '@/shared/ui/button'
import { useMediaQuery } from '@/shared/hooks/useMediaQuery'
import { composeTailwindRenderProps } from '@/shared/primitive'
import { X } from 'lucide-react'
import { cn } from '@/shared/libs'

const Dialog = ({
  role = 'dialog',
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive>) => {
  return (
    <DialogPrimitive
      role={role}
      className={twMerge(
        'peer/dialog group/dialog relative flex max-h-[inherit] flex-col overflow-hidden outline-hidden [scrollbar-width:thin] [&::-webkit-scrollbar]:size-0.5',
        className,
      )}
      {...props}
    />
  )
}

const DialogTrigger = (props: React.ComponentProps<typeof ButtonPrimitive>) => (
  <ButtonPrimitive {...props} />
)

type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string
  description?: string
}

const DialogHeader = ({ className, ...props }: DialogHeaderProps) => {
  const headerRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const header = headerRef.current
    if (!header) {
      return
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        header.parentElement?.style.setProperty(
          '--dialog-header-height',
          `${entry.target.clientHeight}px`,
        )
      }
    })

    observer.observe(header)
    return () => observer.unobserve(header)
  }, [])

  return (
    <div
      data-slot="dialog-header"
      ref={headerRef}
      className={twMerge(
        'relative flex flex-col px-5 pt-5 [&[data-slot=dialog-header]:has(+[data-slot=dialog-footer])]:pb-0',
        className,
      )}
    >
      {props.title && <DialogTitle>{props.title}</DialogTitle>}
      {props.description && (
        <DialogDescription>{props.description}</DialogDescription>
      )}
      {!props.title && typeof props.children === 'string' ? (
        <DialogTitle {...props} />
      ) : (
        props.children
      )}
    </div>
  )
}

interface DialogTitleProps extends Omit<HeadingProps, 'level'> {
  level?: 1 | 2 | 3 | 4
  ref?: React.Ref<HTMLHeadingElement>
}
const DialogTitle = ({
  level = 2,
  className,
  ref,
  ...props
}: DialogTitleProps) => (
  <Heading
    slot="title"
    level={level}
    ref={ref}
    className={cn(
      'font-press-start text-xl leading-tight font-semibold tracking-tighter text-white',
      className,
    )}
    {...props}
  />
)

type DialogDescriptionProps = React.ComponentProps<'div'>
const DialogDescription = ({
  className,
  ref,
  ...props
}: DialogDescriptionProps) => (
  <Text
    slot="description"
    className={twMerge('mt-2 text-sm !font-medium text-white/60', className)}
    ref={ref}
    {...props}
  />
)

type DialogBodyProps = React.ComponentProps<'div'>
const DialogBody = ({ className, ref, ...props }: DialogBodyProps) => (
  <div
    data-slot="dialog-body"
    ref={ref}
    className={twMerge('isolate flex flex-1 flex-col px-5', className)}
    {...props}
  />
)

type DialogFooterProps = React.ComponentProps<'div'>
const DialogFooter = ({ className, ...props }: DialogFooterProps) => {
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const footer = footerRef.current

    if (!footer) {
      return
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        footer.parentElement?.style.setProperty(
          '--dialog-footer-height',
          `${entry.target.clientHeight}px`,
        )
      }
    })

    observer.observe(footer)
    return () => {
      observer.unobserve(footer)
    }
  }, [])
  return (
    <div
      ref={footerRef}
      data-slot="dialog-footer"
      className={twMerge(
        'isolate mt-auto flex flex-row justify-between gap-3 px-5 pb-8',
        className,
      )}
      {...props}
    />
  )
}

const DialogClose = ({
  className,
  intent = 'outline',
  ref,
  ...props
}: ButtonProps) => {
  return (
    <Button
      slot="close"
      className={className}
      ref={ref}
      intent={intent}
      {...props}
    />
  )
}

interface CloseButtonIndicatorProps extends Omit<ButtonProps, 'children'> {
  className?: string
  isDismissable?: boolean | undefined
}

const DialogCloseIcon = ({
  className,
  ...props
}: CloseButtonIndicatorProps) => {
  const isMobile = useMediaQuery('(max-width: 600px)')
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isMobile && buttonRef.current) {
      buttonRef.current.focus()
    }
  }, [isMobile])
  return props.isDismissable ? (
    <ButtonPrimitive
      ref={buttonRef}
      {...(isMobile ? { autoFocus: true } : {})}
      aria-label="Close"
      slot="close"
      className={composeTailwindRenderProps(
        className,
        'close absolute top-3 right-3 z-50 grid cursor-pointer place-content-center opacity-50',
      )}
    >
      <X className="size-5" />
    </ButtonPrimitive>
  ) : null
}

export type {
  DialogHeaderProps,
  DialogTitleProps,
  DialogBodyProps,
  DialogFooterProps,
  DialogDescriptionProps,
  CloseButtonIndicatorProps,
}
export {
  Dialog,
  DialogClose,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogCloseIcon,
}
