import type {
  ListBoxProps,
  PopoverProps,
  SelectProps as SelectPrimitiveProps,
} from 'react-aria-components'
import {
  Button,
  ListBox,
  Select as SelectPrimitive,
  SelectValue,
} from 'react-aria-components'
import { twJoin } from 'tailwind-merge'
import {
  DropdownDescription,
  DropdownItem,
  DropdownLabel,
  DropdownSection,
  DropdownSeparator,
} from './dropdown'
import type { FieldProps } from './field'
import { Description, FieldError, Label } from './field'
import { composeTailwindRenderProps } from '@/shared/primitive'
import { PopoverContent } from '@/shared/ui/popover'
import { ChevronDown, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/shared/libs'

interface SelectProps<T extends object>
  extends SelectPrimitiveProps<T>,
    FieldProps {
  items?: Iterable<T>
}

const Select = <T extends object>({
  label,
  children,
  description,
  errorMessage,
  className,
  ...props
}: SelectProps<T>) => {
  return (
    <SelectPrimitive
      data-slot="select"
      {...props}
      className={composeTailwindRenderProps(
        className,
        'group/select flex w-full flex-col gap-y-3',
      )}
    >
      {(values) => (
        <>
          {label && description && (
            <div className={'flex flex-col gap-0.5'}>
              {label && <Label>{label}</Label>}
              {description && <Description>{description}</Description>}
            </div>
          )}
          {label && !description && <Label>{label}</Label>}
          {description && !label && <Description>{description}</Description>}
          {typeof children === 'function' ? children(values) : children}
          {errorMessage && <FieldError>{errorMessage}</FieldError>}
        </>
      )}
    </SelectPrimitive>
  )
}

interface SelectListProps<T extends object>
  extends Omit<ListBoxProps<T>, 'layout' | 'orientation'> {
  items?: Iterable<T>
  popover?: Omit<PopoverProps, 'children'>
}

const SelectList = <T extends object>({
  items,
  className,
  popover,
  ...props
}: SelectListProps<T>) => {
  return (
    <PopoverContent
      className={cn(popover?.className, 'w-min-[var(--trigger)] border-none')}
      {...popover}
    >
      <ListBox
        layout="stack"
        orientation="vertical"
        className={cn(
          className,
          'bg-dark-gray-card shadow-border ml-auto max-w-[37.31vw] min-w-[37.31vw] scroll-py-1 overflow-y-auto overscroll-contain !rounded-lg border-none !p-2',
          "grid w-full grid-cols-[auto_1fr] flex-col !p-2 outline-hidden *:[[role='group']+[role=group]]:mt-4 *:[[role='group']+[role=separator]]:mt-1",
        )}
        items={items}
        {...props}
      />
    </PopoverContent>
  )
}

interface SelectTriggerProps extends React.ComponentProps<typeof Button> {
  prefix?: React.ReactNode
  className?: string
}

const SelectTrigger = ({
  children,
  className,
  ...props
}: SelectTriggerProps) => {
  return (
    <Button
      className={cn(
        className,
        twJoin([
          'text-fg bg-dark-gray-button shadow-border flex h-[44px] w-full min-w-0 cursor-pointer items-center gap-x-2 rounded-lg px-3 text-start text-[3.73vw] leading-tight font-medium text-white outline-hidden transition duration-200',
          'forced-colors:group-disabled/select/select:text-[GrayText] group-disabled/select:opacity-50 forced-colors:group-disabled/select:inset-ring-[GrayText]',
          'group-open/select:invalid:inset-ring-danger/70 group-open/select:invalid:ring-danger/20 group-invalid/select:inset-ring-danger/70 group-invalid/select:ring-danger/20 group-focus/select:group-invalid/select:inset-ring-danger/70 group-focus/select:group-invalid/select:ring-danger/20 group-open/select:invalid:ring-3',
          'pressed:*:data-[slot=icon]:text-(--btn-icon-active) *:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:my-0.5 *:data-[slot=icon]:size-5 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:self-center *:data-[slot=icon]:text-(--btn-icon) hover:*:data-[slot=icon]:text-(--btn-icon-active)/90 focus-visible:*:data-[slot=icon]:text-(--btn-icon-active)/80 sm:*:data-[slot=icon]:my-1 sm:*:data-[slot=icon]:size-4 forced-colors:[--btn-icon:ButtonText] forced-colors:hover:[--btn-icon:ButtonText]',
          '*:data-[slot=loader]:-mx-0.5 *:data-[slot=loader]:my-0.5 *:data-[slot=loader]:size-5 *:data-[slot=loader]:shrink-0 *:data-[slot=loader]:self-center *:data-[slot=loader]:text-(--btn-icon) sm:*:data-[slot=loader]:my-1 sm:*:data-[slot=loader]:size-4',
          'forced-colors:group-invalid/select:inset-ring-[Mark] forced-colors:group-focus/select:inset-ring-[Highlight] forced-colors:group-focus/select:group-invalid/select:inset-ring-[Mark]',
          className,
        ]),
      )}
    >
      {(values) => (
        <>
          {props.prefix && (
            <span className="text-muted-fg">{props.prefix}</span>
          )}
          {typeof children === 'function' ? children(values) : children}

          {!children && (
            <>
              <SelectValue
                data-slot="select-value"
                className={twJoin([
                  'data-placeholder:text-muted-fg grid flex-1 grid-cols-[auto_1fr] items-center truncate [&_[slot=description]]:hidden',
                  'has-data-[slot=avatar]:gap-x-2 has-data-[slot=icon]:gap-x-2',
                  '*:data-[slot=icon]:size-4.5 sm:*:data-[slot=icon]:size-4',
                  '*:data-[slot=avatar]:*:size-5 *:data-[slot=avatar]:size-5 sm:*:data-[slot=avatar]:*:size-4.5 sm:*:data-[slot=avatar]:size-4.5',
                ])}
              />
              <ChevronsUpDown
                data-slot="chevron"
                className="-mr-1 size-[18px] shrink-0 text-white group-disabled/select:opacity-50"
              />
            </>
          )}
        </>
      )}
    </Button>
  )
}

const SelectSection = DropdownSection
const SelectSeparator = DropdownSeparator
const SelectLabel = DropdownLabel
const SelectDescription = DropdownDescription
const SelectOption = DropdownItem

Select.Description = SelectDescription
Select.Option = SelectOption
Select.Label = SelectLabel
Select.Separator = SelectSeparator
Select.Section = SelectSection
Select.Trigger = SelectTrigger
Select.List = SelectList

export { Select }
export type { SelectProps, SelectTriggerProps }
