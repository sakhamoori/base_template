import Head from 'next/head'

import { Container } from '../components/Container'

interface IndexProps {

}

const Index: React.FC<IndexProps> = ({}) => {
    return (
        <>
            <Head>
                <title>Welcome - </title>
                <meta name="description" content="Welcome to Witq"/>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container>
                <div>
                    <h1 className="text-6xl">Hello world</h1>
                </div>
            </Container>
        </>
    )
}

export default Index