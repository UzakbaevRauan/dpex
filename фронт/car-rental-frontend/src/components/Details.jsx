import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
        textAlign: 'center',
    },
    card: {
        display: 'flex',
        flexDirection: 'row',
        margin: theme.spacing(4, 0),
        maxWidth: 900,
        margin: 'auto',
        padding: theme.spacing(2),
        color: theme.palette.text.primary, // Установка цвета шрифта на черный
    },
    cardContent: {
        textAlign: 'left',
        flex: 1,
    },
    backButton: {
        margin: theme.spacing(2, 0),
    },
    imageContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        maxWidth: '100%',
        height: 'auto',
    },
}));

function Details() {
    const classes = useStyles();
    const [carDetail, setCarDetail] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/transport_list/${id}`)
            .then(response => {
                setCarDetail(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [id]);

    const redirectToWhatsApp = () => {
        // Формируем ссылку с номером телефона и сообщением для WhatsApp
        const whatsappLink = `https://api.whatsapp.com/send?phone=НОМЕР_ТЕЛЕФОНА&text=ЗДЕСЬ_ВАШЕ_СООБЩЕНИЕ`;
        // Открываем WhatsApp
        window.open(whatsappLink, '_blank');
    };

    return (
        <div>
            <div className={classes.heroContent}>
                <Typography variant="h3" color="textPrimary" gutterBottom>
                    {carDetail.brand} {carDetail.model} {carDetail.year}
                </Typography>
            </div>
            <Container maxWidth="lg">
                <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                        <Typography variant="h4" component="h2" gutterBottom>
                            {carDetail.brand} {carDetail.model}
                        </Typography>
                        <Typography variant="h6" color="textPrimary" gutterBottom>
                            Price: {carDetail.price}
                        </Typography>
                        <Typography variant="body1" color="textPrimary" gutterBottom>
                            Year: {carDetail.year}
                        </Typography>
                        {/* Ссылка на WhatsApp */}
                        <Typography>
                            Contact owner
                        </Typography>
                        <Button
                            // variant="contained"
                            // color="green"
                            onClick={redirectToWhatsApp}
                            style={{ padding: '4px' }} // Уменьшение размера кнопки
                        >
                            <img src='/WhatsApp_icon.png' alt="WhatsApp" style={{ width: '50px', height: '50px' }} />
                        </Button>
                    </CardContent>
                    <div className={classes.imageContainer}>
                        {carDetail.image && <img src={decodeURI(carDetail.image)} alt="Transport" className={classes.image} />}
                    </div>
                </Card>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ArrowBackIcon />}
                    className={classes.backButton}
                    onClick={() => window.history.back()}
                >
                    Back
                </Button>
            </Container>
        </div>
    );
}

export default Details;
