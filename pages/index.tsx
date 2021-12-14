import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
const Home: NextPage = () => {
  const router = useRouter()
  useEffect(() => {
    setTimeout(() => {
      router.push('/contact-us')
    }, 2000)
  }, [])
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="S.Sanctus" />
        {<link rel="icon" href="FirstLogo.png" />}
      </Head>
      <main className="w-full h-screen flex justify-center items-center">
        <Image src="/FirstLogo.png" alt="ssanctus" width={280} height={181} />
      </main >
    </div >
  )
}

export default Home
