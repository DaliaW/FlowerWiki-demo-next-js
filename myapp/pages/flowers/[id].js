import { useRouter } from 'next/router'

import React from 'react'
import Head from 'next/Head'

function Flower({flower}) {
    const router = useRouter()
    const { id } = router.query

    return (
        <>
        <Head>
        <title>{flower.color} {flower.id}</title> 
        </Head>

        <div>
            <h1>Hello {id}</h1>
            <img src = {flower.image} />
        </div>
        </>
    )
}

export default Flower

export async function getStaticProps({ params }){
    const req = await fetch(`http://localhost:3000/${params.id}.json`);
    const data = await req.json();

    return { 
       props: { flower: data },
    }
}

export async function getStaticPaths() {
    const req = await fetch('http://localhost:3000/flowers.json');
    const data = await req.json();
    const flowers = data.flowers;

    const paths = flowers.map(flower =>{
        return { params: {id: flower.id}}
    })

    return { paths, fallback: false}
}