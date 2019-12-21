import React, { Component } from 'react'

import firebaseapp from '../firebase'

import logo from '../logo.png'
import './home.css'

export class Home extends Component {

    getSubmissionData = () => {
        const database = firebaseapp.database()

        database.ref("/results").on('value', (data) => {
            this.fillTable(data.val())
        })
    }

    fillTable = (data) => {
        // Clear inner html
        document.getElementById("severity1_cards").innerHTML = ""
        document.getElementById("severity2_cards").innerHTML = ""
        document.getElementById("severity3_cards").innerHTML = ""

        // fill column according to severity
        Object.keys(data).forEach((uid) => {
            let result = data[uid]
            let severity = result["severity"]

            if(severity === 1) {
                this.addToSeverity2Table(result)
            } else if (severity === 2) {
                this.addToSeverity2Table(result)
            } else if (severity === 3) {
                this.addToSeverity3Table(result)
            } else {
                //console.log("-1 severity")
                this.addToSeverity1Table(result)
            }
        })
    }

    addToSeverity1Table = (data) => {
        let html_data = this.getCardHTML(
            data["gps_coordinates"],
            Math.floor(data["validity"]),
            data["img_link"], "Low")
        
        document.getElementById("severity1_cards").innerHTML += html_data
    }
    
    addToSeverity2Table = (data) => {
        let html_data = this.getCardHTML(
            data["gps_coordinates"], 
            Math.floor(data["validity"]),
            data["img_link"], "Medium to High")

        document.getElementById("severity2_cards").innerHTML += html_data
    }

    addToSeverity3Table = (data) => {
        let html_data = this.getCardHTML(
            data["gps_coordinates"],
            Math.floor(data["validity"]),
            data["img_link"], "Extremely High")
        
            document.getElementById("severity3_cards").innerHTML += html_data
    }

    // Card Template HTML
    getCardHTML = (gps_coordinates, validity, image_link, priority) => {
        let card_html = `
            <div class="card" style="width: 100%">
                <iframe
                    frameborder="0" style="border:0"
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyArr8VXow5emvehdROfhZ7YcItqSBBNYbQ&q=${gps_coordinates}&zoom=18" allowfullscreen>
                </iframe>

                <img src=${image_link} style="width: 10rem; padding: 1rem">

                <div class="card-body" style="text-align: left;">
                    <h5 class="card-title">Validity: ${validity}%</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${priority} Priority</h6>
                    <br>
                    <a target="_blank" href="${image_link}" class="card-link">Image Link</a>
                </div>
            </div>
            <br>
        `

        return card_html
    }


    render() {
        this.getSubmissionData()

        return (
            <div>                  
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="https://www.google.com" style={{fontFamily: 'Rubik, sans-serif', fontSize: '1.5rem'}}>
                        Plothole by Team Bitflip
                    </a>
                </nav>
                <br></br>
                <div>
                    <img src={logo} alt="logo" style={{width: '10rem', float: 'left', padding: '0.5rem', paddingLeft: '2rem'}}></img>
                    <br></br>
                    <h1 style={headerStyle}>Plothole - Admin Dashboard</h1>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <div className='column-container'>
                    <div id="severityGrid_1" style={{padding: '3rem'}}>
                        <h3 style={severityGridHeader}>Severity 1</h3>
                        <br></br>
                        <div id="severity1_cards"></div>
                    </div>

                    <div id="severityGrid_2" style={{padding: '3rem'}}>
                        <h3 style={severityGridHeader}>Severity 2</h3>
                        <br></br>
                        <div id="severity2_cards"></div>
                    </div>
                    
                    <div id="severityGrid_3" style={{padding: '3rem'}}>
                        <h3 style={severityGridHeader}>Severity 3</h3>
                        <br></br>
                        <div id="severity3_cards"></div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Home

const severityGridHeader = {
    fontFamily: 'Rubik, sans-serif',
    fontWeight : '300'
}

const headerStyle = {
    fontFamily: 'Rubik, sans-serif',
    fontWeight: '300'
}