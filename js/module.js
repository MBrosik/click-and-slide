"use strict";

function inRange(number, beginning, end) {
      if (number >= beginning && number <= end) return true;
      else return false
}

class RankingClass {
      constructor(tableEl) {
            let element = document.createElement('div');

            let singular = document.createElement('div');
            singular.innerHTML = `Miejsce`;
            singular.classList.add("heading")

            let name = document.createElement('div');
            name.innerHTML = "Imię";
            name.classList.add("heading");

            let time = document.createElement('div');
            time.innerHTML = "Czas";
            time.classList.add("heading");

            element.appendChild(singular);
            element.appendChild(name);
            element.appendChild(time);

            for (let x = 0; x < 10; x++) {
                  let singular = document.createElement('div');
                  singular.innerHTML = `${x + 1}.`

                  let name = document.createElement('div');
                  if (tableEl[x] != null) name.innerHTML = tableEl[x]["n"];
                  else name.innerHTML = "___________";

                  let time = document.createElement('div');
                  if (tableEl[x] != null) {
                        let hours = Math.floor(tableEl[x]["v"] / (3600 * 1000)) % 24;
                        let minutes = Math.floor(tableEl[x]["v"] / (60 * 1000)) % 60;
                        let seconds = Math.floor(tableEl[x]["v"] / (1000)) % 60;
                        let miliseconds = Math.floor(tableEl[x]["v"]) % 1000;
                        time.innerHTML = `${Math.floor(hours / 10)}${hours % 10}:${Math.floor(minutes / 10)}${minutes % 10}:${Math.floor(seconds / 10)}${seconds % 10}.${Math.floor(miliseconds / 100)}${Math.floor(miliseconds / 10) % 10}${miliseconds % 10}`;
                  }
                  else time.innerHTML = " __:__:__.___";

                  element.appendChild(singular);
                  element.appendChild(name);
                  element.appendChild(time);
            }

            this.element = element;
      }
}

class AlertClass {
      constructor() {
            let AlertContainer = document.createElement('div');
            AlertContainer.classList.add("AlertContainer");

            let Alert = document.createElement('div');

            // Topbar
            let Topbar = document.createElement('div');
            Alert.appendChild(Topbar);

            //parahraph
            let paragraph = document.createElement('div');
            paragraph.innerHTML = "Wpisz nick:";
            Alert.appendChild(paragraph);

            //input
            let input = document.createElement('input');
            input.type = "text";
            // input.focus();
            input.maxLength = 20;
            Alert.appendChild(input);

            //button
            let button = document.createElement('button');
            button.innerHTML = "Potwierdź"
            Alert.appendChild(button);

            AlertContainer.appendChild(Alert)

            this.input = input;
            this.button = button;
            this.element = AlertContainer;
      }
      Listener() {

      }
}

class Square {
      constructor(element, dimension, position, Image) {
            this.element = element;
            this.dimension = dimension;
            this.position = position;
            this.truePosition = position;
            this.Image = Image;
            this.ypercent = (position.y / dimension) * 1000;
            this.xpercent = (position.x / dimension) * 1000;
            this.ctx;
            this.DrawImage();
      }
      DrawImage(bolean = true, shownumber = false, position = this.position) {
            this.currentPosition = position;
            this.ctx = this.element.getContext("2d");
            this.p = false;
            var x = -this.xpercent * (this.dimension);
            var y = -this.ypercent * (this.dimension);
            var width = (this.dimension) * 1000;
            var height = (this.dimension) * 1000
            this.ctx.drawImage(this.Image, x, y, width, height);
            if (bolean) {
                  this.ctx.clearRect(0, 0, 10, 1000);
                  this.ctx.clearRect(0, 0, 1000, 10);
                  this.ctx.clearRect(990, 0, 10, 1000);
                  this.ctx.clearRect(0, 990, 1000, 10);
            }
            if (shownumber) {
                  let number = this.truePosition.y * (this.dimension) + this.truePosition.x;
                  let fontsize = 125 * (this.dimension / 3);
                  this.ctx.font = `${fontsize}px Comic Sans MS`;
                  this.ctx.fillStyle = "white";
                  this.ctx.strokeStyle = "black";
                  this.ctx.lineWidth = 20 * (this.dimension / 3);
                  this.ctx.textBaseline = 'top';
                  this.ctx.textAlign = "start";

                  this.ctx.strokeText(number, 100, 100);
                  this.ctx.fillText(number, 100, 100);
            }
            this.p = true;
      }
      SwipeOnClick(end, resolvee = null, time = 19, beginning = this.position) {
            var diff = {
                  y: ((end.y - beginning.y) / this.dimension) * 100,
                  x: ((end.x - beginning.x) / this.dimension) * 100
            };
            var v = { y: diff.y / time, x: diff.x / time }

            var timer = 0;
            var pianissimo = setInterval(() => {
                  this.element.style.top = `${(this.position.y / this.dimension) * 100 + timer * v.y}%`
                  this.element.style.left = `${(this.position.x / this.dimension) * 100 + timer * v.x}%`

                  if (timer == time) {
                        clearInterval(pianissimo);
                        this.position = end;
                        if (resolvee != null) resolvee("Dzieńdobry")
                  };
                  timer++;
            }, 1)
      }
      AddingEvent(end, resolvee, el) {
            this.element.onclick = () => {
                  if (el.PermisionToSwipePuzzle) {
                        el.PermisionToSwipePuzzle = false;
                        this.SwipeOnClick(end, resolvee);
                        this.element.onclick = () => { };
                  }
            }
      }
      RemoveEvent() {
            this.element.onclick = () => { };
      }
}