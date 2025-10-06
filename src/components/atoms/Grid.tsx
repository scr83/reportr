import React from 'react'
import { cn } from '@/lib/utils'

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  responsive?: {
    sm?: 1 | 2 | 3 | 4 | 5 | 6 | 12
    md?: 1 | 2 | 3 | 4 | 5 | 6 | 12
    lg?: 1 | 2 | 3 | 4 | 5 | 6 | 12
    xl?: 1 | 2 | 3 | 4 | 5 | 6 | 12
  }
  children: React.ReactNode
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(({
  cols = 1,
  gap = 'md',
  responsive,
  className,
  children,
  ...props
}, ref) => {
  const baseStyles = 'grid'

  const colsMap = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
    12: 'grid-cols-12',
  }

  const gapMap = {
    none: 'gap-0',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  }

  const responsiveClasses = responsive ? [
    responsive.sm && `sm:${colsMap[responsive.sm]}`,
    responsive.md && `md:${colsMap[responsive.md]}`,
    responsive.lg && `lg:${colsMap[responsive.lg]}`,
    responsive.xl && `xl:${colsMap[responsive.xl]}`,
  ].filter(Boolean).join(' ') : ''

  return (
    <div
      ref={ref}
      className={cn(
        baseStyles,
        colsMap[cols],
        gapMap[gap],
        responsiveClasses,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})

Grid.displayName = 'Grid'

export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 12
  colStart?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  colEnd?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13
  children: React.ReactNode
}

export const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(({
  colSpan,
  colStart,
  colEnd,
  className,
  children,
  ...props
}, ref) => {
  const colSpanMap = {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4',
    5: 'col-span-5',
    6: 'col-span-6',
    12: 'col-span-12',
  }

  const colStartMap = {
    1: 'col-start-1',
    2: 'col-start-2',
    3: 'col-start-3',
    4: 'col-start-4',
    5: 'col-start-5',
    6: 'col-start-6',
    7: 'col-start-7',
    8: 'col-start-8',
    9: 'col-start-9',
    10: 'col-start-10',
    11: 'col-start-11',
    12: 'col-start-12',
  }

  const colEndMap = {
    1: 'col-end-1',
    2: 'col-end-2',
    3: 'col-end-3',
    4: 'col-end-4',
    5: 'col-end-5',
    6: 'col-end-6',
    7: 'col-end-7',
    8: 'col-end-8',
    9: 'col-end-9',
    10: 'col-end-10',
    11: 'col-end-11',
    12: 'col-end-12',
    13: 'col-end-13',
  }

  return (
    <div
      ref={ref}
      className={cn(
        colSpan && colSpanMap[colSpan],
        colStart && colStartMap[colStart],
        colEnd && colEndMap[colEnd],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})

GridItem.displayName = 'GridItem'