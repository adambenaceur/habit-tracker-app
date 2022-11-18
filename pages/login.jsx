import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../lib/firebase";
import Head from "next/head";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const HandleSubmit = (event) => {
    setError(null);

    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(false);
        router.push("/");
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        console.log(errorCode);
        if (errorCode === "auth/wrong-password") {
          setError("Incorrect Password ");
          //  block of code to be executed if condition1 is true
        } else if (errorCode === "auth/user-not-found") {
          setError("User not found");

          //  block of code to be executed if the condition1 is false and condition2 is true
        } else {
          setError("Invailid Credentials");

          //  block of code to be executed if the condition1 is false and condition2 is false
        }


        // ..
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
        // const uid = user.uid;
        // ...
      }
    });
    // if (authUser) router.push("/");
  }, [loading, router]);
  setTimeout(() => {
    setError(null);
  }, 9000);

  return (<>
    <Head>
      <title>Login</title>
    
    </Head>

    <div className="container text-center">
      <div className="form-signin w-100 m-auto pt-5">
        {error}
        {loading}

        <form onSubmit={HandleSubmit}>
          <img
            className="mb-4"
            src="/images/icon.svg"
            alt=""
            width="72"
            height="57"
          />
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

          <div className="form-floating mb-2">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={(event) => setEmail(event.target.value)}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-2">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <p className="text-danger">{error} </p>
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign in
          </button>

          <div className="pt-5">
            <Link href="/register" className="mt-5 mb-3 text-muted">
              <span className="nav-link active h4 ">Register Now</span>
            </Link>
          </div>
        </form>
      </div>
    </div>  </>
  );
}

export default Login;
