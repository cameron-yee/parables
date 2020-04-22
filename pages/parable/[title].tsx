import Head from 'next/head'
import Link from 'next/link'

import fetch from 'node-fetch'

import { GetStaticProps, GetStaticPaths } from 'next'

import fs from 'fs'
import path from 'path'

const Parable = ({parable, parable_content}) => {
  return (
    <div className="container">
      <Head>
        <title>Parables | {parable.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Link href="/"><a><button>Back to Home</button></a></Link>   
        <h1 className="title">{parable.title}</h1>
        { parable.startVerse !== parable.endVerse
          ?
          <h2>{parable.book} {parable.chapter}:{parable.startVerse}-{parable.endVerse}</h2>
          :
          <h2>{parable.book} {parable.chapter}:{parable.startVerse}</h2>
        }
        <div className="grid">
          <p className="description">{parable_content.text}</p>
        </div>
      </main>
      <footer>
        <a
          href="https://github.com/cameron-yee"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/github.svg" alt="GitHub Logo" style={{width: '64px'}} />
        </a>
      </footer>
      <style jsx>{`
        button {
          border: 1px solid black;
          background: black;
          color: white;
          cursor: pointer;
          border-radius: .25rem;
          font-size: 1.1rem;
          margin-bottom: 1rem;
          padding: .5rem;
        }

        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
          text-align: left;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: start;
          flex-wrap: wrap;

          max-width: 1200px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

export const getStaticPaths: any = async () => {
  const parables_path = path.join(process.cwd(), 'parables.json')
  const parables = JSON.parse(fs.readFileSync(parables_path, 'utf8'))
  
  const paths = parables.map((parable) => `/parable/${parable.title.toLowerCase().replace(/\s/g, '-')}`)
  
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const parables_path = path.join(process.cwd(), 'parables.json')
  const parables = JSON.parse(fs.readFileSync(parables_path, 'utf8'))

  let i = 0
  for (; i < parables.length; i++) {
    if (parables[i].title.toLowerCase().replace(/\s/g, '-') == params.title) {
      break 
    }
  }

  const parable = parables[i]
  const is_parable_one_verse = parable.startVerse === parable.endVerse

  let res
  if (is_parable_one_verse) {
    res = await fetch(`https://bible-api.com/${parable.book.toLowerCase()}%20${parable.chapter}:${parable.startVerse}`)
  } else {
    res = await fetch(`https://bible-api.com/${parable.book.toLowerCase()}+${parable.chapter}:${parable.startVerse}-${parable.endVerse}`)
  }
  
  const parable_content = await res.json()

  return {
    props: {
      parable,
      parable_content
    }
  }
}

export default Parable
