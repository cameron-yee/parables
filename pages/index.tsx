import Head from 'next/head'
import Link from 'next/link'

import { GetStaticProps } from 'next'

import fs from 'fs'
import path from 'path'

export const getStaticProps: GetStaticProps = async (context) => {
  const parables_path = path.join(process.cwd(), 'parables.json')
  const parables = JSON.parse(fs.readFileSync(parables_path, 'utf8'))  

  return {
    props: {
      parables
    }
  }
}

const IndexPage = ({ parables }) => {
  return (
    <div className="container">
      <Head>
        <title>Parables</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Parables
        </h1>

        <div className="grid">
          { parables.map((parable, index) => {
              return (
                <Link href={`/parable/${parable.title.toLowerCase().replace(/\s/g, '-')}`} key={`parable-${index}`}>
                  <a className="card">
                    <h3>{ parable.title }</h3>
                    { parable.startVerse !== parable.endVerse
                      ?
                      <p className="verse">{parable.book} {parable.chapter}:{parable.startVerse}-{parable.endVerse}</p>
                      :
                      <p className="verse">{parable.book} {parable.chapter}:{parable.startVerse}</p>
                    }
                  </a>
                </Link>
              )
            })
          }
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

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
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
          align-items: stretch;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 1200px;
          margin-top: 3rem;
        }

        .verse {
          position: absolute;
          bottom: 10%;
        }

        .card {
          margin: 1rem;
          flex-basis: 20%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          position: relative;
          transition: color 0.15s ease, border-color 0.15s ease;
          width: 90%;
        }

        .card:hover,
        .card:focus,
        .card:active {
          border-color: black;
        }

        .card h3 {
          margin: 0 0 2rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: .5rem 0 0 0;
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

export default IndexPage
