import { useRouter } from 'next/router'

import Head from 'next/Head'

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from '../../styles/Home.module.css'

const useStyles = makeStyles({
    root: {
        maxWidth: 700,
        fontSize: 40,
        borderRadius: 10,
        padding: "4%",
        boxShadow: "0px 0px 15px 0px rgba(0, 0, 0, 0.64)",
    },
    media: {
      height: 400,
    },
  });

function Flower({flower}) {
    const router = useRouter()
    const { id } = router.query
    const classes = useStyles();

    return (
        <>
        <Head>
        <title>{flower.color} {flower.id}</title> 
        </Head>
        <div className={styles.container}>
        <h1 className={styles.title}>{id.charAt(0).toUpperCase() + id.slice(1)}</h1>
        <div >
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image={flower.image}
                    title={flower.id}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {id.charAt(0).toUpperCase() + id.slice(1)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {flower.description}
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            </div>
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