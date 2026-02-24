'use server';

import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import bcrypt from 'bcryptjs';

// Reuse password complexity check from registration route
function isPasswordComplex(password: string): boolean {
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={};':"|,.<>/?~\\-])[A-Za-z\d!@#$%^&*()_+={};':"|,.<>/?~\\-]{8,}$/;
  return passwordPattern.test(password);
}

// --- Get Current User's Profile ---
export async function getUserProfile(): Promise<{
  success: boolean;
  user?: { id: string; name: string; email: string; registrationDate: Date };
  error?: string;
}> {
  const user = await getCurrentUser();
  if (!user?.id) {
    return { success: false, error: 'Unauthorized: User not found.' };
  }

  try {
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { id: true, name: true, email: true, registrationDate: true },
    });

    if (!dbUser) {
      return { success: false, error: 'User not found.' };
    }

    return { success: true, user: dbUser };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return { success: false, error: 'Failed to fetch profile.' };
  }
}

// --- Update Profile (name and/or email) ---
export async function updateUserProfile(data: {
  name?: string;
  email?: string;
}): Promise<{
  success: boolean;
  user?: { id: string; name: string; email: string };
  error?: string;
}> {
  const user = await getCurrentUser();
  if (!user?.id) {
    return { success: false, error: 'Unauthorized: User not found.' };
  }

  const updateData: { name?: string; email?: string } = {};

  if (data.name !== undefined) {
    const trimmedName = data.name.trim();
    if (!trimmedName) {
      return { success: false, error: 'Name cannot be empty.' };
    }
    updateData.name = trimmedName;
  }

  if (data.email !== undefined) {
    const trimmedEmail = data.email.trim().toLowerCase();
    if (!trimmedEmail || !/\S+@\S+\.\S+/.test(trimmedEmail)) {
      return { success: false, error: 'Please provide a valid email.' };
    }
    updateData.email = trimmedEmail;
  }

  if (Object.keys(updateData).length === 0) {
    return { success: false, error: 'No changes to save.' };
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: updateData,
      select: { id: true, name: true, email: true },
    });

    return { success: true, user: updatedUser };
  } catch (error: unknown) {
    // Handle unique constraint violation (email)
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 'P2002'
    ) {
      return { success: false, error: 'Email already in use.' };
    }
    console.error('Error updating profile:', error);
    return { success: false, error: 'Failed to update profile.' };
  }
}

// --- Change Password ---
export async function changePassword(data: {
  currentPassword: string;
  newPassword: string;
}): Promise<{
  success: boolean;
  error?: string;
}> {
  const user = await getCurrentUser();
  if (!user?.id) {
    return { success: false, error: 'Unauthorized: User not found.' };
  }

  if (!data.currentPassword || !data.newPassword) {
    return { success: false, error: 'All password fields are required.' };
  }

  if (!isPasswordComplex(data.newPassword)) {
    return {
      success: false,
      error:
        'Password must be at least 8 characters with uppercase, lowercase, number, and special character.',
    };
  }

  try {
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { password: true },
    });

    if (!dbUser) {
      return { success: false, error: 'User not found.' };
    }

    const passwordsMatch = await bcrypt.compare(
      data.currentPassword,
      dbUser.password
    );

    if (!passwordsMatch) {
      return { success: false, error: 'Current password is incorrect.' };
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return { success: true };
  } catch (error) {
    console.error('Error changing password:', error);
    return { success: false, error: 'Failed to change password.' };
  }
}
