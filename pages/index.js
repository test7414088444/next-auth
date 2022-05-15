import { signOut, useSession } from 'next-auth/react';
import React from 'react'

export default function index() {
  const {data: session, status} = useSession({ required: true });

    if(status == 'authenticated' && session) {
        return (
            <div>
                <h1>{status}</h1>
                <div>
                  <p>{session.user.name}</p>
                  <p>{session.user.email}</p>
                  <p><img src={session.user.image} /></p>
                </div>
                <button onClick={() => signOut()}>Sign Out</button>
            </div>
        )
    }
  return (
    <div>index</div>
  )
}
