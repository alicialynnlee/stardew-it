'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { DropdownMenu, Avatar, Text, Button } from '@radix-ui/themes';
import { GearIcon, ExitIcon, CaretDownIcon } from '@radix-ui/react-icons';

export default function UserMenu() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) return null;

  const userName = session.user?.name || session.user?.email || 'User';
  const initials = userName.slice(0, 2).toUpperCase();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="ghost" size="3" style={{ margin: '0 8px' }}>
          <Avatar size="1" fallback={initials} radius="full" variant="soft" />
          {userName}
          <CaretDownIcon />
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content align="end" sideOffset={8}>
        <DropdownMenu.Item onSelect={() => router.push('/settings')}>
          <GearIcon /> Settings
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item color="red" onSelect={() => signOut()}>
          <ExitIcon /> Logout
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
