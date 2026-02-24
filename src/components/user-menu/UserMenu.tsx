'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { DropdownMenu, Avatar, Text } from '@radix-ui/themes';
import {
  PersonIcon,
  GearIcon,
  ExitIcon,
  CaretDownIcon,
} from '@radix-ui/react-icons';
import * as Styled from './UserMenu.styled';

export default function UserMenu() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) return null;

  const userName = session.user?.name || session.user?.email || 'User';
  const initials = userName.slice(0, 2).toUpperCase();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Styled.TriggerButton>
          <Avatar
            size="2"
            fallback={initials}
            radius="full"
            variant="soft"
          />
          <Text size="2" weight="medium">
            {userName}
          </Text>
          <CaretDownIcon />
        </Styled.TriggerButton>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content align="end" sideOffset={8}>
        <DropdownMenu.Item onSelect={() => router.push('/settings')}>
          <PersonIcon /> Profile
        </DropdownMenu.Item>
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
