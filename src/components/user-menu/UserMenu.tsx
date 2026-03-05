'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { DropdownMenu, Avatar } from '@radix-ui/themes';
import { mainDarkText } from '@/styles/colors';
import { Button as ButtonUI } from '@/components';

export default function UserMenu() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) return null;

  const userName = session.user?.name || session.user?.email || 'User';
  const initials = userName.slice(0, 2).toUpperCase();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <ButtonUI variant="ghost" size="sm" color={mainDarkText}>
          <Avatar size="1" fallback={initials} radius="full" variant="solid" />
          {userName}
        </ButtonUI>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content align="end" sideOffset={8} variant="soft">
        <DropdownMenu.Item onSelect={() => router.push('/settings')}>
          Settings
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item color="red" onSelect={() => signOut()}>
          Logout
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
