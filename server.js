/********************************************************************************
*  WEB322 – Assignment 01
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Julia Stevenson Student ID: 017184086 Date: June 5, 2026
*
********************************************************************************/

const express = require("express");
const app = express();
const HTTP_PORT = 8080;
 
const solutionData = require("./modules/solutions");

solutionData.Initialize()
    .then(() => {
 
        app.listen(HTTP_PORT, () => {
            console.log(`Server listening on port ${HTTP_PORT}`);
        });
 
        app.get("/", (req, res) => {
            res.send(`
                <p>Assignment 2: Julia Stevenson - Student #017184086, Summer 2026</p>
                <p>WEB322NBBL.03202.2264 Assignment 1</p>
                <h1>Climate Solutions</h1>
                <ul>
                    <li>Get All Solutions:<br><a href="/explorer/solutions">/explorer/solutions</a></li>
                    <li>Get a Single Solution:<br><a href="/explorer/solutions/id-example">/explorer/solutions/id-example</a></li>
                    <li>Get Solutions filtered by a Sector:<br><a href="/explorer/solutions/sector-example">/explorer/solutions/sector-example</a></li>
                </ul>
            `);
        });
 
        app.get("/explorer/solutions", (req, res) => {
            solutionData.getAllSolutions()
                .then(data => res.json(data))
                .catch(err => res.status(500).send(err));
        });
 
        app.get("/explorer/solutions/id-example", (req, res) => {
            solutionData.getSolutionsById(1)
                .then(data => res.json(data))
                .catch(err => res.send(err));
        });
 
        app.get("/explorer/solutions/sector-example", (req, res) => {
            solutionData.getSolutionsBySector("ind")
                .then(data => res.json(data))
                .catch(err => res.send(err));
        });
 
    })
    .catch(err => {
        console.log(`Unable to start server: ${err}`);
    });
