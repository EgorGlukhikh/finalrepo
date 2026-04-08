'use client';

import { signOut } from 'next-auth/react';

import { ActionLink } from '@/components/layout';
import { Button } from '@/components/ui';

export type SessionMenuView = {
  displayName: string;
  roleLabel: string;
  homeHref: string;
  homeLabel: string;
  showAdminLink: boolean;
};

type SessionMenuProps = {
  view: SessionMenuView;
};

export function SessionMenu({ view }: SessionMenuProps) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <div className="hidden items-center gap-3 rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-muted-foreground sm:inline-flex">
        <span className="size-2 rounded-full bg-primary" />
        <span className="max-w-40 truncate">{view.displayName}</span>
        <span className="rounded-full bg-surface-muted px-2 py-0.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {view.roleLabel}
        </span>
      </div>
      <ActionLink href={view.homeHref} variant="secondary">
        {view.homeLabel}
      </ActionLink>
      {view.showAdminLink ? (
        <ActionLink href="/admin" variant="outline">
          Админка
        </ActionLink>
      ) : null}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          void signOut({ callbackUrl: '/' });
        }}
      >
        Выйти
      </Button>
    </div>
  );
}
