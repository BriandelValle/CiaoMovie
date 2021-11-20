import Display from "./display.js";
import Checker from "./checker.js";

/* http://www.omdbapi.com/?i=tt3896198&apikey=9177a8fa */

export default class Request {
  constructor() {
    this.template = document.querySelector(".card-template").content;
  }

  async getInfo(inputValue) {
    try {
      const url = `https://www.omdbapi.com/?s=${inputValue}&apikey=9177a8fa`;
      const response = await fetch(url);
      const json = await response.json();

      const container = document.querySelector(".new-row");

      const display = new Display(json.Search, this.template, container);
      display.displayUserCards();
    } catch (error) {
      const checker = new Checker();
      checker.getErrorContainer("Pelicula no encontrada!");
    }
  }

//datos que traigo de la api
  getMultipleInfo(moviesName) {
    const moviesInfo = [[], [], [], [], []];
    const result = moviesName.map((item) => {
      return new Promise(async (resolve) => {
        try {
          const url = `https://www.omdbapi.com/?t=${item}&apikey=9177a8fa`;
          const response = await fetch(url);
          const json = await response.json();

          moviesInfo[0].push(json.Poster);
          moviesInfo[1].push(json.Title);
          moviesInfo[2].push(json.Year); 
          moviesInfo[3].push(json.Type); 
          moviesInfo[4].push(json.Plot);

          console.log(moviesInfo);

          resolve();
        } catch (error) {
          console.log(error);
        }
      });
    });

    Promise.all(result).then(() => {
      const container = document.querySelectorAll(".default-row");
      const display = new Display(moviesInfo, this.template, container);
      display.displayDefaultCards();
    });
  }
}
