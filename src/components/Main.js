import React from "react";
import Album from "./Album";
import { Button, Container } from "reactstrap";
import Tabs from "./Tabs";
import { useRouter } from 'next/router';



export const Main = ({ user, album }) => {
const router = useRouter();


  return (
    <main>
      <section
        className="jumbotron text-center"
        style={{ marginTop: 80, marginLeft: 300, marginRight: 300 }}
      >
        <Container color="primary" className="text-center">
          {user ? (
            <>
              <h1 className="jumbotron-heading"> Hello {user.name} </h1>
            </>
          ) : (
            <h1 className="jumbotron-heading"> Sign in To Make a Book!</h1>
          )}
          <p className="lead text-muted">
            It has never been easier to build your own story book. Capture your
            story Today!
          </p>
          <br></br>
          <p>
            {user ? (
              <Button onClick={() => router.push("/BuildBook")} color="primary" className="mx-1 my-2">
                Build a Book
              </Button>
            ) : (
              <>
                <Button color="secondary" className="mr-5 my-2" style={{marginRight: 15}} onClick={() => router.push('/Login')}>
                  Login
                </Button>

                <Button color="secondary" className="ml-5 my-2" onClick={() => router.push("/signup")}>
                  Sign Up
                </Button>
              </>
            )}
          </p>
        </Container>
      </section>

      <Tabs album={album} />
    </main>
  );
};
