import React from 'react'
import { signIn } from 'next-auth/react'

export default function signin() {
    // const {data: session, status} = useSession();

    // if(status == 'authenticated' && session) {
    //     return (
    //         <div>
    //             <h1>loggedin</h1>
    //             <button onClick={() => signOut()}>Sign Out</button>
    //         </div>
    //     )
    // }
  return (
    <div>
        <h1>SignIn</h1>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button onClick={() => signIn('google')} styles={{ backgroundColor: 'red' }}>Google</Button>
            <Button onClick={() => signIn('facebook')} styles={{ backgroundColor: 'blue' }}>Facebook</Button>
        </div>
    </div>
  )


  function Button({ children, onClick, styles }) {
    return (
        <button style={{ ...styles, margin: '20px auto', padding: '5px 10px', borderRadius: '10px', backgroundColor: 'Menu' }} onClick={onClick}>
            {children}
        </button>
    )
  }
}
