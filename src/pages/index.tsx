import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Taxami - Consulente Fiscale AI</title>
        <meta name="description" content="Consulente Fiscale AI con 300+ normative italiane" />
      </Head>
      <main style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
        <h1>Benvenuto su Taxami 👋</h1>
        <p>Il consulente fiscale più intelligente d'Italia.</p>
      </main>
    </>
  )
}
