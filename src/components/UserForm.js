import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Router from 'next/router'
import { Form, Button } from 'react-bootstrap';


export default function SignUp({onSubmit}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleSignUp = async (event) => {
        event.preventDefault();
        console.log(`${email}, ${password}`);
        onSubmit({ email, password, username});



        // TODO: Implement the authentication method here
        // Once the user is authenticated, set the token in the auth context
        // const token = await signIn(email, password); // some authentication method that returns a token
        // Redirect the user to the home page


        
        // Router.push('/');
    }

    return (
        <div className="container">
            <h1>Sign up</h1>
            <Form onSubmit={handleSignUp}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(event) => setEmail(event.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" value={username} onChange={(event) => setUsername(event.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
        // your sign-in form JSX here
    );
}