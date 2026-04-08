'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useId, useState } from 'react';

import { cn } from '@/lib/cn';

type TabsContextValue = {
  baseId: string;
  value: string;
  setValue: (value: string) => void;
};

const TabsContext = createContext<TabsContextValue | null>(null);

type TabsProps = {
  children: ReactNode;
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
};

export function Tabs({ children, defaultValue, value, onValueChange, className }: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const baseId = useId();
  const currentValue = value ?? internalValue;

  const setValue = (nextValue: string) => {
    if (value === undefined) {
      setInternalValue(nextValue);
    }

    onValueChange?.(nextValue);
  };

  return (
    <TabsContext.Provider value={{ baseId, value: currentValue, setValue }}>
      <div className={cn('w-full', className)}>{children}</div>
    </TabsContext.Provider>
  );
}

function useTabs() {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error('Tabs components must be used within <Tabs>.');
  }

  return context;
}

type TabsListProps = {
  children: ReactNode;
  className?: string;
};

export function TabsList({ children, className }: TabsListProps) {
  return (
    <div
      role="tablist"
      className={cn('inline-flex w-full rounded-lg border border-border bg-surface-muted p-1', className)}
    >
      {children}
    </div>
  );
}

type TabsTriggerProps = {
  children: ReactNode;
  value: string;
  className?: string;
};

export function TabsTrigger({ children, value, className }: TabsTriggerProps) {
  const { baseId, value: currentValue, setValue } = useTabs();
  const active = currentValue === value;

  return (
    <button
      type="button"
      role="tab"
      id={`${baseId}-tab-${value}`}
      aria-selected={active}
      aria-controls={`${baseId}-panel-${value}`}
      tabIndex={active ? 0 : -1}
      onClick={() => setValue(value)}
      className={cn(
        'inline-flex flex-1 items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ease-[var(--ease-standard)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        active ? 'bg-surface text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
        className,
      )}
    >
      {children}
    </button>
  );
}

type TabsPanelProps = {
  children: ReactNode;
  value: string;
  className?: string;
};

export function TabsPanel({ children, value, className }: TabsPanelProps) {
  const { baseId, value: currentValue } = useTabs();

  if (currentValue !== value) {
    return null;
  }

  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      className={cn('mt-4', className)}
    >
      {children}
    </div>
  );
}

