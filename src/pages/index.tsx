import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useContext, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Logout from './logout';
import {createImage, segmentStory} from './api/test.js';

const inter = Inter({ subsets: ['latin'] })

const prompt = 'yellow ferrari'

export default function Home() {
  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(text);
    // Handle form submission here
    const Book = await segmentStory(text);
    // console.log(Book.title + "\n");
    console.log(Book);

  };

  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <Head>
        <title>HooHacks</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {/* <button onClick={() => createImage(prompt)}>
          Hello
        </button> */}
        <form onSubmit={handleSubmit}>
          <label>
            Input Text:
            <input type="text" value={text} onChange={handleChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
        <h1>{user ? `Hello ${user.name}`: "Hello Guest"}</h1>

        {user ? <Logout/> : <></>}
             

        
      </main>
    </>
  )
}