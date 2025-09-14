'use client'

import { useEffect, useMemo, useRef, useCallback } from 'react'
import lottie, { AnimationItem } from 'lottie-web'
import { ungzip } from 'pako'
import { baseURL } from '@/shared/api'
import { Gift } from '@/shared/api/types'

interface Props {
  data: Gift
  containerClassName?: string
  width?: number
  height?: number
}

export const LottieViewer = ({
  data,
  containerClassName,
  width = 200,
  height = 200,
}: Props) => {
  const container = useRef<HTMLDivElement>(null)
  const mainAnimation = useRef<AnimationItem | null>(null)

  useEffect(() => {
    if (!container.current) return

    const fetchLottie = async (url: string) => {
      const res = await fetch(url)
      const buffer = await res.arrayBuffer()

      try {
        const jsonBuffer = ungzip(new Uint8Array(buffer))
        return JSON.parse(new TextDecoder().decode(jsonBuffer))
      } catch {
        return JSON.parse(new TextDecoder().decode(buffer))
      }
    }

    const renderLotties = async () => {
      try {
        const mainUrl = `https://nft.fragment.com/gift/${data.slug}.tgs`

        const mainData = await fetchLottie(mainUrl)

        // Очищаем предыдущую анимацию перед созданием новой
        if (mainAnimation.current) {
          mainAnimation.current.destroy()
        }

        // Рендер основного стикера
        mainAnimation.current = lottie.loadAnimation({
          container: container.current!,
          renderer: 'svg',
          loop: false,
          autoplay: false,
          animationData: mainData,
        })
      } catch (err) {
        console.error('❌ Ошибка загрузки анимации:', err)
      }
    }

    renderLotties()

    // Cleanup функция для очистки анимации при размонтировании
    return () => {
      if (mainAnimation.current) {
        mainAnimation.current.destroy()
        mainAnimation.current = null
      }
    }
  }, [data])

  // Функции для управления анимацией
  const handleMouseEnter = useCallback(() => {
    if (mainAnimation.current) {
      mainAnimation.current.goToAndStop(0, true) // Перемотка в начало
      mainAnimation.current.play() // Запуск анимации
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (mainAnimation.current) {
      mainAnimation.current.stop() // Остановка анимации
      mainAnimation.current.goToAndStop(0, true) // Возврат в начальное состояние
    }
  }, [])

  return (
    <div
      className={containerClassName}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        width,
        height,
        overflow: 'hidden',
        borderRadius: 16,
        cursor: 'pointer',
      }}
    >
      <div
        ref={container}
        style={{
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  )
}
