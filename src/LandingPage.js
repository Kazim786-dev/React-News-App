

import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from "react";
import Cardcomp from "./Card";
import Navbarcomp from './Navbar'
import './style.css';

export default function LandingPagecomp(props) {

    const [news, setNews] = useState([])
    const [page, setPage] = useState(2)

    const fetchResultFromApi = async () => {

        console.log(page)
        const url = `https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=${props.category}&pageNumber=${page}&pageSize=8&autoCorrect=true&fromPublishedDate=null&toPublishedDate=null`;

        const options = {
        method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'df5207d406msh18612d9fcb9c1bfp164c2ejsn0c841129c196',
                'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
            }
        };

        fetch(url, options)
        .then(res => res.json())
        .then(json => {
            let tmparray=json.value
            setNews(tmparray)
            console.log(tmparray)
        })
        .catch(err => console.error('error:' + err));

    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - ShowMeNews`;
        fetchResultFromApi(); 
    }, [props.category])


    const handleNext = () => {
        setPage(page + 1)
        fetchResultFromApi();
    }
    const handlePrevious = () => {
        if(page>1){
            setPage(page - 1)
            fetchResultFromApi();
        }
    }

    return (
        <>
            <Navbarcomp></Navbarcomp>
            <div className="hero-section">
                <div className="container">
                    <h1 className="hero-title">Get In Touch With The World</h1>
                </div>
            </div>
            <div className="container">
                <Row xs={1} md={4} className="g-4">
                    {news.length > 0 ?
                    
                        news.map((n) => (
                            <Col key={n.url}>
                                { n.title.length+n.description.length>275 ? n.description=n.description.substring(n.title.length,273)+'...' :null}
                                <Cardcomp title={n.title ? n.title : ""} description={n.description ? n.description : ""} imageUrl={n.image.url ? n.image.url : "https://www.shutterstock.com/image-vector/colorful-abstract-banner-template-dummy-260nw-1538384741.jpg"} newsUrl={n.url} date={n.datePublished}/>
                            </Col>
                        ))
                        : <h1>Loading</h1>
                    }
                </Row>
                <div className="ButtonContainer">
                    <Button variant="secondary" type="button" onClick={handlePrevious}> Previous</Button>
                    <Button variant="secondary" type="button" onClick={handleNext} >Next </Button>
                </div>
            </div>
        </>
    )

}