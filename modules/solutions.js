const solutionData = require("../data/solutionData");
const sectorData = require("../data/sectorData");

let solutions = [];

function Initialize() {
    return new Promise((resolve, reject) => {
        try {
            solutionData.forEach(solution => {
            const matchingSector = sectorData.find(sector => sector.id === solution.sector_id);
            const solutionCopy = { ...solution};
            solutionCopy.sector = matchingSector.sector_name;
            solutions.push(solutionCopy);
         });
         resolve();
        } catch (error) {
            reject("Error initializing data");
        }
    });
}

function getAllSolutions () {
    return new Promise((resolve, reject) => {
        try {
            resolve(solutions);
            } catch (error) {
                reject("Error retrieving solutions");
            }
        }

    );
}

function getSolutionsById (solutionId) {
    return new Promise((resolve, reject) => {
            const rsolution = solutions.find(solution => solution.id === solutionId);
            if (rsolution) {
                resolve(rsolution);
            } else {
                reject("Unable to find requested solutions");
            }
        });
}

function getSolutionsBySector(sector) {
    return new Promise((resolve, reject) => {
          const fsolution = solutions.filter(solution => solution.sector.toLowerCase().includes(sector.toLowerCase()));
          if (fsolution.length > 0) {
                resolve(fsolution);
          } else {
            reject("Unable to find requested solutions");
          }
    });
}

module.exports = { Initialize, getAllSolutions, getSolutionsById, getSolutionsBySector };
