import Head from 'next/head'
import Image from 'next/image'
//import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <ul>
      <li>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </li>
      <li>
        <Link href="/upload">
          <a>Upload</a>
        </Link>
      </li>
      {/* <li>
        <Link href="/dashboard">
          <a>Dashboard</a>
        </Link>
      </li> */}
      
    </ul>
  )

}
