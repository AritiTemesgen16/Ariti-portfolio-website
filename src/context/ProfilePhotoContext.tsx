import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PROFILE } from '../data/portfolioData';

interface ProfilePhotoContextType {
  photoUrl: string;
  isCustom: boolean;
  isLoading: boolean;
  error: string | null;
  uploadPhoto: (file: File) => Promise<{ success: boolean; message?: string }>;
  resetPhoto: () => Promise<{ success: boolean; message?: string }>;
  refreshPhoto: () => Promise<void>;
}

const ProfilePhotoContext = createContext<ProfilePhotoContextType | undefined>(undefined);

export const ProfilePhotoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [photoUrl, setPhotoUrl] = useState<string>(PROFILE.profileImage);
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivePhoto = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch('/api/profile-photo/active');
      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          setPhotoUrl(data.url);
          setIsCustom(Boolean(data.isCustom));
          PROFILE.profileImage = data.url;
        }
      }
    } catch (err) {
      console.error('[PROFILE PHOTO FETCH ERROR]', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivePhoto();
  }, [fetchActivePhoto]);

  const uploadPhoto = async (file: File): Promise<{ success: boolean; message?: string }> => {
    try {
      setError(null);

      // Client-side MIME validation
      const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
      if (!allowedMimes.includes(file.type.toLowerCase())) {
        return {
          success: false,
          message: 'Invalid file format. Please select a valid JPEG, PNG, WebP, or GIF image.'
        };
      }

      // Client-side size validation (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        return {
          success: false,
          message: 'File size exceeds 5MB limit. Please choose a smaller image file.'
        };
      }

      // Convert file to base64
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error('Failed to read image file content.'));
        reader.readAsDataURL(file);
      });

      const response = await fetch('/api/profile-photo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: base64Data,
          mimeType: file.type,
          fileName: file.name
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        const errorMsg = result.error || result.message || 'Failed to upload new profile photo.';
        setError(errorMsg);
        return { success: false, message: errorMsg };
      }

      // Single source of truth update across application
      setPhotoUrl(result.url);
      setIsCustom(true);
      PROFILE.profileImage = result.url;

      return {
        success: true,
        message: result.message || 'Profile photo successfully replaced.'
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred during upload.';
      setError(msg);
      return { success: false, message: msg };
    }
  };

  const resetPhoto = async (): Promise<{ success: boolean; message?: string }> => {
    try {
      setError(null);
      const response = await fetch('/api/profile-photo', {
        method: 'DELETE',
      });
      const result = await response.json();

      if (response.ok && result.success) {
        setPhotoUrl(result.url);
        setIsCustom(false);
        PROFILE.profileImage = result.url;
        return { success: true, message: 'Profile photo reset to default.' };
      }

      const errorMsg = result.error || 'Failed to reset profile photo.';
      setError(errorMsg);
      return { success: false, message: errorMsg };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error resetting profile photo.';
      setError(msg);
      return { success: false, message: msg };
    }
  };

  return (
    <ProfilePhotoContext.Provider
      value={{
        photoUrl,
        isCustom,
        isLoading,
        error,
        uploadPhoto,
        resetPhoto,
        refreshPhoto: fetchActivePhoto,
      }}
    >
      {children}
    </ProfilePhotoContext.Provider>
  );
};

export const useProfilePhoto = () => {
  const context = useContext(ProfilePhotoContext);
  if (!context) {
    throw new Error('useProfilePhoto must be used within a ProfilePhotoProvider');
  }
  return context;
};
