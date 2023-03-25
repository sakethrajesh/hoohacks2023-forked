import { useContext, useState } from 'react';
import UserForm from '../components/UserForm';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import Router  from 'next/router';

export default function SignUp() {
    const { login } = useAuth();

    const handleUserFormSubmit = async (userData) => {
        
        console.log(userData);
        try {
            const response = await fetch('/api/createUser', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
              }
          
              const data = await response.json();
              console.log(data);
        } catch (error) {
            console.error('Error creating user', error);
            // Handle errors, e.g., display an error message
        }
        login(userData.email, userData.password);
        Router.push('/')

    };

    return (
        <div>
            <h1>Create User</h1>
            <UserForm onSubmit={handleUserFormSubmit} />
        </div>
    );
}