import React from 'react'
import { toast as sonnerToast, type ExternalToast } from 'sonner'
import { Check, AlertCircle, Info, X, Trophy } from 'lucide-react'
import { cn } from '@/shared/libs'
import { Icons } from '@/shared/ui/icons'

interface CustomToastProps {
  title: string
  description?: string
  type?: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}

const ToastComponent = ({
  title,
  description,
  type = 'success',
  ...props
}: CustomToastProps & { id?: string | number }) => {
  const icons = {
    success: <Icons.Complete className="fill-dark-gray size-4" />,
    error: <X className="stroke-dark-gray size-3.5" />,
    info: <Info className="stroke-dark-gray size-3.5" />,
    warning: <AlertCircle className="stroke-dark-gray size-3.5" />,
  }

  const bgColors = {
    success: 'bg-[#77F39E]',
    error: 'bg-error',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500',
  }

  return (
    <div className="bg-dark-gray-card flex min-h-[48px] items-center gap-3 rounded-xl px-4 py-3">
      <div
        className={cn(
          'flex min-h-6 min-w-6 items-center justify-center rounded-full',
          bgColors[type],
        )}
      >
        {icons[type]}
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium text-white">{title}</span>
        {description && (
          <span className="text-sm font-medium text-white/70">
            {description}
          </span>
        )}
      </div>
    </div>
  )
}

export const toast = {
  success: (title: string, description?: string, options?: ExternalToast) => {
    return sonnerToast.custom(
      (id) => (
        <ToastComponent
          id={id}
          title={title}
          description={description}
          type="success"
        />
      ),
      {
        duration: 4000,
        ...options,
      },
    )
  },

  error: (title: string, description?: string, options?: ExternalToast) => {
    return sonnerToast.custom(
      (id) => (
        <ToastComponent
          id={id}
          title={title}
          description={description}
          type="error"
        />
      ),
      {
        duration: 4000,
        ...options,
      },
    )
  },

  info: (title: string, description?: string, options?: ExternalToast) => {
    return sonnerToast.custom(
      (id) => (
        <ToastComponent
          id={id}
          title={title}
          description={description}
          type="info"
        />
      ),
      {
        duration: 4000,
        ...options,
      },
    )
  },

  warning: (title: string, description?: string, options?: ExternalToast) => {
    return sonnerToast.custom(
      (id) => (
        <ToastComponent
          id={id}
          title={title}
          description={description}
          type="warning"
        />
      ),
      {
        duration: 4000,
        ...options,
      },
    )
  },

  custom: sonnerToast.custom,
  dismiss: sonnerToast.dismiss,
  promise: sonnerToast.promise,
  loading: sonnerToast.loading,
}
