import Head from 'next/head'
import Image from 'next/image'
import Gift from '../components/Gift'
import Door from '../components/Door'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import DoorModel from '../model/Door'
import { atualizarPortas, criarPortas } from '../functions/doors'
import router from 'next/router'

export default function Home() {

  useEffect(() => {
    router.push("/login")
  }, []);

  const [doors, setDoors] = useState(criarPortas(5, 3));

  function renderizarPortas() {
    return doors.map(porta => {
        return <Door key={porta.number} value={porta}
            onChange={novaPorta => setDoors(atualizarPortas(doors, novaPorta))} />
    })
}

  return (
    <div className={styles.container}>
        {/* {
          renderizarPortas()
        } */}
        <span>
          Redirecionando...
        </span>
    </div>
  )
}
