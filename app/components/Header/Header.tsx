'use client'; 
import { useState } from 'react'
import Link from 'next/link';
import styles from './Header.module.css'; 

export default function Header() {
  const [search, setSearch] = useState('');

  return (
    <header className={styles.header}>
      <h1><b>DEISI SHOP</b></h1>
      <nav className={styles.nav}>
        <Link href="/" >Home </Link>
        <Link href="/produtos" >Produtos</Link>
        <Link href="/carrinho" >Carrinho</Link>
      </nav>
    </header>
  );
}
