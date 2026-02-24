'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Form } from 'radix-ui';
import { Button, Text, Separator, Avatar, Heading } from '@radix-ui/themes';
import {
  getUserProfile,
  updateUserProfile,
  changePassword,
} from '@/actions/userActions';
import { useFarms } from '@/hooks/useFarms';
import FarmList from '@/components/farm-selector/FarmList';
import * as Styled from './settings.styled';

export default function SettingsClient() {
  const { data: session, status, update: updateSession } = useSession();
  const router = useRouter();

  // Profile state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [registrationDate, setRegistrationDate] = useState('');
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMessage, setProfileMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // Farm state — reuse the same hook as FarmSelector
  const { farms, addNewFarm, deleteFarm, selectedFarmId, setSelectedFarm } =
    useFarms();

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth');
    }
  }, [status, router]);

  // Load profile on mount
  useEffect(() => {
    async function loadProfile() {
      const result = await getUserProfile();
      if (result.success && result.user) {
        setName(result.user.name);
        setEmail(result.user.email);
        setRegistrationDate(
          new Date(result.user.registrationDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        );
      }
    }
    if (status === 'authenticated') {
      loadProfile();
    }
  }, [status]);

  const handleProfileSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileMessage(null);

    try {
      const result = await updateUserProfile({ name, email });
      if (result.success) {
        setProfileMessage({ type: 'success', text: 'Profile updated!' });
        await updateSession();
      } else {
        setProfileMessage({
          type: 'error',
          text: result.error || 'Failed to update profile.',
        });
      }
    } catch {
      setProfileMessage({
        type: 'error',
        text: 'An unexpected error occurred.',
      });
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordMessage(null);

    if (newPassword !== confirmNewPassword) {
      setPasswordMessage({
        type: 'error',
        text: 'New passwords do not match.',
      });
      setPasswordLoading(false);
      return;
    }

    try {
      const result = await changePassword({
        currentPassword,
        newPassword,
      });
      if (result.success) {
        setPasswordMessage({
          type: 'success',
          text: 'Password changed successfully!',
        });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      } else {
        setPasswordMessage({
          type: 'error',
          text: result.error || 'Failed to change password.',
        });
      }
    } catch {
      setPasswordMessage({
        type: 'error',
        text: 'An unexpected error occurred.',
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  // Farm handlers
  const handleSelectFarm = (farmId: string) => {
    if (!farmId || farmId === '') {
      setSelectedFarm('');
    } else {
      setSelectedFarm(farmId);
    }
  };

  const handleAddFarm = async (farmName: string) => {
    const result = await addNewFarm(farmName);
    if (!result.success) {
      console.error(result.error);
    } else {
      setSelectedFarm(result.farm?.id ?? '');
    }
  };

  const handleDeleteFarm = async (farmId: string) => {
    const result = await deleteFarm(farmId);
    if (result.success && selectedFarmId === farmId) {
      setSelectedFarm('');
    } else if (result.error) {
      console.error(result.error);
    }
  };

  if (status === 'loading') {
    return (
      <Styled.SettingsContainer>
        <Styled.SettingsCard>
          <Text size="2" color="gray">
            Loading...
          </Text>
        </Styled.SettingsCard>
      </Styled.SettingsContainer>
    );
  }

  if (!session) return null;

  const initials = (name || session.user?.name || 'U')
    .slice(0, 2)
    .toUpperCase();

  return (
    <Styled.SettingsContainer>
      <Heading size="6" mb="4">
        Account Settings
      </Heading>

      {/* Profile Section */}
      <Styled.SettingsCard>
        <Heading size="4" mb="3">
          Profile
        </Heading>

        <Styled.AvatarRow>
          <Avatar size="5" fallback={initials} radius="full" variant="soft" />
          <div>
            <Text size="3" weight="medium">
              {name || session.user?.name}
            </Text>
            <br />
            <Text size="2" color="gray">
              Member since {registrationDate}
            </Text>
          </div>
        </Styled.AvatarRow>

        <Separator size="4" mb="3" />

        <Form.Root onSubmit={handleProfileSubmit}>
          <Styled.Field name="name">
            <Form.Label>Username</Form.Label>
            <Form.Control asChild>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={profileLoading}
              />
            </Form.Control>
            <Form.Message match="valueMissing">
              Name cannot be empty.
            </Form.Message>
          </Styled.Field>

          <Styled.Field name="email">
            <Form.Label>Email</Form.Label>
            <Form.Control asChild>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={profileLoading}
              />
            </Form.Control>
            <Form.Message match="valueMissing">
              Email cannot be empty.
            </Form.Message>
            <Form.Message match="typeMismatch">
              Please provide a valid email.
            </Form.Message>
          </Styled.Field>

          <Form.Submit asChild>
            <Button
              style={{ width: '100%', marginTop: '0.5rem' }}
              loading={profileLoading}
            >
              Save Changes
            </Button>
          </Form.Submit>

          {profileMessage && (
            <Styled.Message $type={profileMessage.type}>
              {profileMessage.text}
            </Styled.Message>
          )}
        </Form.Root>
      </Styled.SettingsCard>

      {/* Farms Section */}
      <Styled.SettingsCard>
        <Heading size="4" mb="3">
          Farms
        </Heading>
        <Text size="2" color="gray" mb="3" as="p">
          Manage your farms. The selected farm is used across the tracker and
          calendar.
        </Text>

        <Separator size="4" mb="3" />

        <Styled.FarmListContainer>
          {farms.length === 0 ? (
            <Text size="2" color="gray" as="p" mb="2">
              No farms yet. Add one below to get started.
            </Text>
          ) : null}
          <FarmList
            farms={farms}
            selectedFarmId={selectedFarmId}
            onSelectFarm={handleSelectFarm}
            onDeleteFarm={handleDeleteFarm}
            onAddFarm={handleAddFarm}
          />
        </Styled.FarmListContainer>
      </Styled.SettingsCard>

      {/* Password Section */}
      <Styled.SettingsCard>
        <Heading size="4" mb="3">
          Change Password
        </Heading>

        <Form.Root onSubmit={handlePasswordSubmit}>
          <Styled.Field name="currentPassword">
            <Form.Label>Current Password</Form.Label>
            <Form.Control asChild>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                disabled={passwordLoading}
              />
            </Form.Control>
            <Form.Message match="valueMissing">
              Please enter your current password.
            </Form.Message>
          </Styled.Field>

          <Styled.Field name="newPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control asChild>
              <input
                type="password"
                required
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={passwordLoading}
              />
            </Form.Control>
            <Form.Message match="valueMissing">
              Please enter a new password.
            </Form.Message>
            <Form.Message match="tooShort">
              Password must be at least 8 characters.
            </Form.Message>
          </Styled.Field>

          <Styled.Field name="confirmNewPassword">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control asChild>
              <input
                type="password"
                required
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                disabled={passwordLoading}
              />
            </Form.Control>
            <Form.Message match="valueMissing">
              Please confirm your new password.
            </Form.Message>
          </Styled.Field>

          <Text size="1" color="gray">
            Must be at least 8 characters with uppercase, lowercase, number, and
            special character.
          </Text>

          <Form.Submit asChild>
            <Button
              style={{ width: '100%', marginTop: '0.5rem' }}
              loading={passwordLoading}
            >
              Change Password
            </Button>
          </Form.Submit>

          {passwordMessage && (
            <Styled.Message $type={passwordMessage.type}>
              {passwordMessage.text}
            </Styled.Message>
          )}
        </Form.Root>
      </Styled.SettingsCard>
    </Styled.SettingsContainer>
  );
}
