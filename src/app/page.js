"use client"
import styles from "./page.module.css";
import React, { useContext } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithGoogle, signOut } from "../../lib/firebase";
import { auth } from "../../lib/firebase";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main className={styles.main}>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}</p>
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      ) : (
        <button onClick={() => signInWithGoogle()}>Sign In with Google</button>
      )}
    </main>
  );
}
