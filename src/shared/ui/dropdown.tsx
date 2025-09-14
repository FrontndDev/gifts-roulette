import type {
  ListBoxItemProps,
  SectionProps,
  SeparatorProps,
  TextProps,
} from 'react-aria-components'
import {
  Collection,
  composeRenderProps,
  Header,
  ListBoxItem as ListBoxItemPrimitive,
  ListBoxSection,
  Separator,
  Text,
} from 'react-aria-components'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'
import { Check } from 'lucide-react'

const dropdownItemStyles = tv({
  base: [
    'col-span-full h-[26px] !text-sm cursor-pointer grid grid-cols-[auto_1fr_1.5rem_0.5rem_auto] supports-[grid-template-columns:subgrid]:grid-cols-subgrid sm:px-2.5 sm:py-1.5',
    'not-has-[[slot=description]]:items-center has-[[slot=description]]:**:data-[slot=check-indicator]:mt-[1.5px]',
    'group relative select-none rounded-[calc(var(--radius-lg)-1px)] text-fg outline-0',
    '**:data-[slot=avatar]:*:mr-1.5 **:data-[slot=avatar]:*:size-6 **:data-[slot=avatar]:mr-(--mr-icon) **:data-[slot=avatar]:size-6 sm:**:data-[slot=avatar]:*:size-5 sm:**:data-[slot=avatar]:size-5',
    '*:data-[slot=icon]:mr-(--mr-icon) **:data-[slot=icon]:size-5 **:data-[slot=icon]:shrink-0 **:data-[slot=icon]:text-muted-fg sm:**:data-[slot=icon]:size-4',
    '[&>[slot=label]+[data-slot=icon]]:absolute [&>[slot=label]+[data-slot=icon]]:right-1',
    'data-danger:text-danger data-danger:**:data-[slot=icon]:text-danger/60',
    'forced-color-adjust-none forced-colors:text-[CanvasText] forced-colors:**:data-[slot=icon]:text-[CanvasText] forced-colors:group-focus:**:data-[slot=icon]:text-[CanvasText]',
  ],
  variants: {
    isDisabled: {
      true: 'text-muted-fg forced-colors:text-[GrayText]',
    },
    isSelected: {
      true: '**:data-[slot=avatar]:*:hidden **:data-[slot=avatar]:hidden **:data-[slot=icon]:hidden **:data-[slot=icon]:text-accent-fg',
    },
    isDanger: {
      true: [
        'text-danger focus:text-danger **:data-[slot=icon]:text-danger/70 focus:**:data-[slot=icon]:text-danger',
        'focus:*:[[slot=description]]:text-danger/80 focus:*:[[slot=label]]:text-danger',
        'focus:bg-danger/10 focus:text-danger focus:**:data-[slot=icon]:text-danger forced-colors:focus:text-[Mark]',
      ],
    },
    isFocused: {
      true: [
        '**:data-[slot=icon]:text-accent-fg **:[kbd]:text-accent-fg',
        'bg-accent text-accent-fg forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]',
        '[&_.text-muted-fg]:text-accent-fg/80 *:[[slot=description]]:text-accent-fg *:[[slot=label]]:text-accent-fg',
      ],
    },
  },
})

const dropdownSectionStyles = tv({
  slots: {
    section: 'col-span-full grid grid-cols-[auto_1fr]',
    header:
      'col-span-full px-3.5 py-2 font-medium text-muted-fg text-sm/6 sm:px-3 sm:py-1.5 sm:text-xs/6',
  },
})

const { section, header } = dropdownSectionStyles()

interface DropdownSectionProps<T> extends SectionProps<T> {
  title?: string
}

const DropdownSection = <T extends object>({
  className,
  children,
  ...props
}: DropdownSectionProps<T>) => {
  return (
    <ListBoxSection className={section({ className })}>
      {'title' in props && <Header className={header()}>{props.title}</Header>}
      <Collection items={props.items}>{children}</Collection>
    </ListBoxSection>
  )
}

type DropdownItemProps = ListBoxItemProps

const DropdownItem = ({ className, children, ...props }: DropdownItemProps) => {
  const textValue = typeof children === 'string' ? children : undefined
  return (
    <ListBoxItemPrimitive
      textValue={textValue}
      className={composeRenderProps(className, (className, renderProps) =>
        dropdownItemStyles({ ...renderProps, className }),
      )}
      {...props}
    >
      {composeRenderProps(children, (children, { isSelected }) => (
        <>
          {isSelected && (
            <Check className="mr-2 size-4" data-slot="check-indicator" />
          )}
          {typeof children === 'string' ? (
            <DropdownLabel>{children}</DropdownLabel>
          ) : (
            children
          )}
        </>
      ))}
    </ListBoxItemPrimitive>
  )
}

interface DropdownLabelProps extends TextProps {
  ref?: React.Ref<HTMLDivElement>
}

const DropdownLabel = ({ className, ref, ...props }: DropdownLabelProps) => (
  <Text
    slot="label"
    ref={ref}
    className={twMerge('col-start-2', className)}
    {...props}
  />
)

interface DropdownDescriptionProps extends TextProps {
  ref?: React.Ref<HTMLDivElement>
}

const DropdownDescription = ({
  className,
  ref,
  ...props
}: DropdownDescriptionProps) => (
  <Text
    slot="description"
    ref={ref}
    className={twMerge('text-muted-fg col-start-2 text-sm', className)}
    {...props}
  />
)

const DropdownSeparator = ({ className, ...props }: SeparatorProps) => (
  <Separator
    orientation="horizontal"
    className={twMerge(
      'bg-gray-outline/15 col-span-full -mx-1 my-1 h-px',
      className,
    )}
    {...props}
  />
)

/**
 * Note: This is not exposed component, but it's used in other components to render dropdowns.
 * @internal
 */
export type {
  DropdownSectionProps,
  DropdownItemProps,
  DropdownLabelProps,
  DropdownDescriptionProps,
}
export {
  DropdownSeparator,
  DropdownItem,
  DropdownLabel,
  DropdownDescription,
  dropdownItemStyles,
  DropdownSection,
  dropdownSectionStyles,
}
