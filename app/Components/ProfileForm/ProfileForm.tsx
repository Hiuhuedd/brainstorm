// app/Components/ProfileForm/ProfileForm.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { useUser } from '@clerk/nextjs';
import { PRODUCTION_URL } from '@/app/utils/urls';

interface ProfileFormData {
  programCode: string;
  yearOfStudy: number;
  semester: number;
  userId: string;
  email: string;
  imgURL: string;
  firstName: string;
  lastName: string;
  isPremium: boolean;
  premiumDate: Date | null;
  premiumPlan: number;
}

function ProfileForm() {
  const router = useRouter();
  const { user } = useUser(); // Get user information from Clerk
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState<ProfileFormData>({
    programCode: '',
    yearOfStudy: 1,
    semester: 1,
    userId: user?.id || '',
    email: user?.emailAddresses[0]?.emailAddress || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    imgURL: user?.imageUrl || '',
    isPremium: false,
    premiumDate: null,
    premiumPlan: 0,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        ...formData,
        userId: user.id,
        email: user.emailAddresses[0]?.emailAddress || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        imgURL: user.imageUrl || '',
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${PRODUCTION_URL}/user-profile `, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Failed to save profile');
      }

      // Successfully saved profile
      setSuccess('Profile updated successfully!');
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Error saving profile:', error );
      setError( 'Failed to save profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <div className="form-container">
        <h1>Complete Your Profile</h1>
        <p>Please provide your academic information to continue</p>

        {error && <div className="error-message" role="alert">{error}</div>}
        {success && <div className="success-message" role="alert">{success}</div>}

        <div className="form-group">
          <label htmlFor="programCode">Program Code</label>
          <input
            type="text"
            id="programCode"
            value={formData.programCode}
            onChange={(e) => setFormData({ ...formData, programCode: e.target.value })}
            required
            placeholder="e.g., Enter your program code, e.g., CS101"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="yearOfStudy">Year of Study</label>
          <select
            id="yearOfStudy"
            value={formData.yearOfStudy}
            onChange={(e) => setFormData({ ...formData, yearOfStudy: parseInt(e.target.value) })}
            required
            disabled={isSubmitting}
          >
            {[1, 2, 3, 4, 5].map((year) => (
              <option key={year} value={year}>
                Year {year}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="semester">Semester</label>
          <select
            id="semester"
            value={formData.semester}
            onChange={(e) => setFormData({ ...formData, semester: parseInt(e.target.value) })}
            required
            disabled={isSubmitting}
          >
            {[1, 2, 3].map((sem) => (
              <option key={sem} value={sem}>
                Semester {sem}
              </option>
            ))}
          </select>
        </div>

        <button 
          type="submit" 
          className="submit-btn bg-sky500"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Complete Profile'}
        </button>
      </div>
    </FormStyled>
  );
}

const FormStyled = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: ${(props) => props.theme.colorBg2};

  .form-container {
    background: ${(props) => props.theme.colorBg};
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;

    h1 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: ${(props) => props.theme.colorPrimaryGreen};
    }

    p {
      color: ${(props) => props.theme.colorGrey2};
      margin-bottom: 2rem;
    }

    .error-message {
      color: #ef4444;
      margin-bottom: 1rem;
      padding: 0.5rem;
      border-radius: 0.25rem;
      background-color: #fee2e2;
    }

    .success-message {
      color: #4caf50;
      margin-bottom: 1rem;
      padding: 0.5rem;
      border-radius: 0.25rem;
      background-color: #e8f5e9;
    }

    .form-group {
      margin-bottom: 1.5rem;

      label {
        display: block;
        margin-bottom: 0.5rem;
        color: ${(props) => props.theme.colorGrey1};
      }

      input, select {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid ${(props) => props.theme.borderColor};
        border-radius: 0.5rem;
        background: ${(props) => props.theme.colorBg2};
        color: ${(props) => props.theme.colorGrey0};

        &:focus {
          outline: none;
          border-color: ${(props) => props.theme.colorPrimaryGreen};
        }

        &:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      }
    }

    .submit-btn {
      width: 100%;
      padding: 0.75rem;
      background: black;
      color: white;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      font-weight: 600;
      transition: opacity 0.2s;

      &:hover:not(:disabled) {
        opacity: 0.9;
      }

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }
  }
`;

export default ProfileForm;
