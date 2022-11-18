import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth } from "../../lib/firebase";

function BasicExample() {
  const router = useRouter()
  const [authUser, setauthUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(authUser)
        setauthUser(user);
        // const uid = user.uid;u
        // ...
      } else {
        setauthUser(null)
      }
    }, [router, authUser]);
    // if (authUser) router.push("/");
  });
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {authUser ? (
            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link href="/" className="nav-link active">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/mood" className="nav-link active">
                  Mood
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/habit" className="nav-link active">
                  Habit
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/logout" className="nav-link active">
                  Logout
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
              {" "}
              <li className="nav-item">
                <Link href="/" className="nav-link active">
                  Home
                </Link>
              </li>{" "}
              <li className="nav-item">
                <Link href="/login" className="nav-link active">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/register" className="nav-link active">
                  Register
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default BasicExample;
