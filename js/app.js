class game {
      constructor() {
            this.MakeGame();
            this.CreateSlider();
            this.CreteModesOfPlay();
            this.ShowNumbers();
            this.CreateTimer();
            this.CreateCookiesContainer();
            this.CreatePuzzleContainer();
      }
      MakeGame() {
            document.body.innerHTML = `<div id="container"></div>`;
            this.container = document.getElementById("container");
      }

      // ----------------------
      // slider
      // ----------------------

      CreateSlider() {
            var slider = document.createElement("div");
            slider.setAttribute("id", "slider");

            this.SliderImage = document.createElement("div");
            var SlideImageMeter = [-100, 0, 100];
            this.AmountOfPhotos = 9;
            this.ImageArray = [];
            this.AllImageArray = [];
            this.ImageSelectBefore = 1;
            this.ImageSelect = 1;
            this.PermisionToSwipe = true;

            for (let x = 0; x <= this.AmountOfPhotos; x++) {
                  let image = document.createElement("img");
                  image.setAttribute("src", `./images/Image${x}.png`);
                  this.AllImageArray.push(image);
            }

            for (let x = 0; x < 3; x++) {
                  var image = document.createElement("img");
                  image.src = this.AllImageArray[x].src;
                  image.style.left = `${SlideImageMeter[x]}%`;
                  this.ImageArray.push(image);
                  this.SliderImage.appendChild(image);
            }

            function Buttoncreate(el, left) {
                  const button = document.createElement("button");
                  const canvas = document.createElement("canvas");
                  const ctx = canvas.getContext('2d');
                  canvas.width = 100;
                  canvas.height = 100;
                  if (left) {
                        ctx.fillStyle = "rgb(251, 84, 43)";
                        ctx.shadowBlur = 10;
                        ctx.shadowColor = "white";
                        ctx.beginPath();
                        ctx.moveTo(10, 50);
                        ctx.lineTo(60, 10);
                        //! Square
                        ctx.lineTo(60, 40);
                        ctx.lineTo(80, 40);
                        ctx.lineTo(80, 60);
                        ctx.lineTo(60, 60);
                        //! Square
                        ctx.lineTo(60, 90);
                        ctx.closePath()
                        ctx.fill()
                  } else {
                        ctx.fillStyle = "rgb(251, 84, 43)";
                        ctx.shadowBlur = 10;
                        ctx.shadowColor = "white";
                        ctx.beginPath();
                        ctx.moveTo(90, 50);
                        ctx.lineTo(40, 10);
                        //! Square
                        ctx.lineTo(40, 40);
                        ctx.lineTo(20, 40);
                        ctx.lineTo(20, 60);
                        ctx.lineTo(40, 60);
                        //! Square
                        ctx.lineTo(40, 90);
                        ctx.closePath()
                        ctx.fill()
                  }
                  button.appendChild(canvas);
                  button.onclick = function () {
                        click(el, this, left)
                  };

                  function click(el, el1, left) {
                        if (el.PermisionToSwipe) {
                              el.PermisionToSwipe = false;
                              let swipe = (left) ? 1 : -1;
                              let y = 0;
                              let x = 0;
                              let swipearray = [
                                    parseFloat(el.ImageArray[0].style.left.slice(0, -1)),
                                    parseFloat(el.ImageArray[1].style.left.slice(0, -1)),
                                    parseFloat(el.ImageArray[2].style.left.slice(0, -1))
                              ]

                              let Interval = setInterval(() => {
                                    y = 100 * Math.sin((1 / 25) * swipe * Math.pow(x, (3 / 4)));
                                    for (let x = 0; x < 3; x++) {
                                          el.ImageArray[x].style.left = `${swipearray[x] + y}%`;
                                    }
                                    x++;
                                    if (y >= 99 || y <= -99) {
                                          for (let x = 0; x < 3; x++) {
                                                el.ImageArray[x].style.left = `${swipearray[x] + swipe * 100}%`;
                                          }
                                          clearInterval(Interval);
                                          if (left) {
                                                if (el.ImageSelectBefore - 2 >= 0) {
                                                      var ImageEL = el.AllImageArray[el.ImageSelectBefore - 2];
                                                      ImageEL.style.left = "-100%";
                                                      el.ImageArray.unshift(ImageEL)
                                                      el.ImageArray.splice(-1, 1)
                                                      el.SliderImage.removeChild(el.SliderImage.childNodes[2])
                                                      el.SliderImage.insertBefore(ImageEL, el.SliderImage.childNodes[0])
                                                } else {
                                                      var ImageEL = el.AllImageArray[10 + (el.ImageSelectBefore - 2)];
                                                      ImageEL.style.left = "-100%";
                                                      el.ImageArray.unshift(ImageEL)
                                                      el.ImageArray.splice(-1, 1)
                                                      el.SliderImage.removeChild(el.SliderImage.childNodes[2])
                                                      el.SliderImage.insertBefore(ImageEL, el.SliderImage.childNodes[0])
                                                }
                                                if (el.ImageSelectBefore > 0) {
                                                      el.ImageSelectBefore--;
                                                } else {
                                                      el.ImageSelectBefore = el.AmountOfPhotos;
                                                }
                                          } else {
                                                if (el.ImageSelectBefore + 2 <= el.AmountOfPhotos) {
                                                      var ImageEL = el.AllImageArray[el.ImageSelectBefore + 2];
                                                      ImageEL.style.left = "100%";
                                                      el.ImageArray.push(ImageEL)
                                                      el.ImageArray.splice(0, 1)
                                                      el.SliderImage.removeChild(el.SliderImage.childNodes[0])
                                                      el.SliderImage.appendChild(ImageEL)
                                                } else {
                                                      var ImageEL = el.AllImageArray[-8 + el.ImageSelectBefore];
                                                      ImageEL.style.left = "100%";
                                                      el.ImageArray.push(ImageEL)
                                                      el.ImageArray.splice(0, 1)
                                                      el.SliderImage.removeChild(el.SliderImage.childNodes[0])
                                                      el.SliderImage.appendChild(ImageEL)
                                                }
                                                if (el.ImageSelectBefore < el.AmountOfPhotos) {
                                                      el.ImageSelectBefore++;
                                                } else {
                                                      el.ImageSelectBefore = 0;
                                                }
                                          }

                                          el.PermisionToSwipe = true;
                                    }
                              }, 1)
                        }
                  }

                  return button;
            }

            slider.appendChild(Buttoncreate(this, true));
            slider.appendChild(this.SliderImage);
            slider.appendChild(Buttoncreate(this, false));

            this.container.appendChild(slider);
      }

      // ----------------------
      // Modes of Play
      // ----------------------

      CreteModesOfPlay() {
            let ModesDiv = document.createElement('div');
            ModesDiv.setAttribute("id", "ModesDiv")
            this.Choice = null;
            this.dimension;
            this.PermisionToClick = true;
            var Inner = [{
                  text: "3x3",
                  dimension: 3
            },
            {
                  text: "4x4",
                  dimension: 4
            },
            {
                  text: "5x5",
                  dimension: 5
            },
            {
                  text: "6x6",
                  dimension: 6
            }
            ]

            Inner.forEach((element, index, arr) => {
                  var Button = document.createElement('button');
                  Button.innerHTML = element.text;
                  Button.addEventListener("click", () => {
                        ButtonClick(this, element.dimension)
                  })

                  ModesDiv.appendChild(Button);
            });

            function ButtonClick(el, dimen) {
                  if (el.PermisionToClick) {
                        clearInterval(el.timeanimate);
                        el.dimension = dimen
                        while (el.Asynclist.length != 0 && el.stopAsync == false) {
                              // clearInterval(el.Intervallist[0]);
                              el.stopAsync = true;
                              // console.log(el.stopAsync);
                              // el.Asynclist.splice(0, 1);
                        }
                        el.ImageSelect = el.ImageSelectBefore;
                        el.PermisionToClick = false;
                        el.CloseTimerToZero();
                        el.CookiesParse(false);
                        el.CookiesOutclick(el.MainRankingBaner);
                        el.MainRankingBaner.dataset.Permision = true;
                        el.CraftingSquare();
                        el.LetsSetNumbers = true;
                        el.PermisionToSetTimeout = true;
                  }
            }
            this.container.appendChild(ModesDiv)
      }

      // ----------------------
      // timer
      // ----------------------

      CreateTimer() {
            let TimerCookiesContainer = document.createElement('div')
            TimerCookiesContainer.setAttribute('id', 'TimerCookiesContainer');
            let TimerDiv = document.createElement('div');
            TimerDiv.setAttribute("id", "timer");
            this.AllNumbersImages = [];

            this.timerObject = {
                  hours: [],
                  minutes: [],
                  seconds: [],
                  miliseconds: []
            }

            for (let x = 0; x < 10; x++) {
                  let img = document.createElement('img');
                  img.src = `./images/cyferki/C${x}.png`;
                  this.AllNumbersImages.push(img);
            }

            for (const y in this.timerObject) {
                  let long = (y != "miliseconds") ? 2 : 3;

                  for (let x = 0; x < long; x++) {
                        var img = document.createElement('img');
                        img.src = this.AllNumbersImages[0].src;
                        this.timerObject[y].push(img);
                        TimerDiv.appendChild(img);
                  }

                  var img = document.createElement('img');
                  if (y != `seconds` && y != `miliseconds`) {
                        img.src = './images/cyferki/colon.png';
                  } else if (y != `miliseconds`) {
                        img.src = './images/cyferki/dot.png';
                  }
                  TimerDiv.appendChild(img);
            }
            this.TimerDiv = TimerDiv;
            TimerCookiesContainer.appendChild(TimerDiv);
            this.TimerCookiesContainer = TimerCookiesContainer;
            this.container.appendChild(TimerDiv);
      }
      TimerAlgorythm() {
            this.TimerDiv.querySelectorAll('*').forEach((element, index, arr) => {
                  arr[index].style.filter = 'none';
            });
            let time = Date.now();
            this.timestart = time;
            this.timeanimate = setInterval(() => {
                  this.TimerInterval(time);
            }, (1000 / 30))

      }
      TimerInterval(time, timenow = Date.now()) {
            let timediff = timenow - time;
            let hours = Math.floor(timediff / (3600 * 1000)) % 24;
            let minutes = Math.floor(timediff / (60 * 1000)) % 60
            let seconds = Math.floor(timediff / (1000)) % 60
            let miliseconds = timediff % 1000;

            let first = Math.floor(hours / 10)
            hours -= first * 10;
            this.timerObject.hours[0].src = this.AllNumbersImages[first].src;
            this.timerObject.hours[1].src = this.AllNumbersImages[hours].src;

            first = Math.floor(minutes / 10)
            minutes -= first * 10;
            this.timerObject.minutes[0].src = this.AllNumbersImages[first].src;
            this.timerObject.minutes[1].src = this.AllNumbersImages[minutes].src;

            first = Math.floor(seconds / 10)
            seconds -= first * 10;
            this.timerObject.seconds[0].src = this.AllNumbersImages[first].src;
            this.timerObject.seconds[1].src = this.AllNumbersImages[seconds].src;

            for (let x = 0; x < 2; x++) {
                  first = Math.floor(miliseconds / Math.pow(10, 2 - x))
                  miliseconds -= first * Math.pow(10, 2 - x);
                  this.timerObject.miliseconds[x].src = this.AllNumbersImages[first].src;
            }
            this.timerObject.miliseconds[2].src = this.AllNumbersImages[miliseconds].src;

      }
      StopTimerAlgorythm() {
            let timenow = Date.now();
            this.timediff = timenow - this.timestart;
            this.TimerInterval(this.timestart, timenow);
            clearInterval(this.timeanimate);
            this.TimerDiv.querySelectorAll('*').forEach((element, index, arr) => {
                  arr[index].style.filter = 'hue-rotate(150deg)';
            });

      }
      CloseTimerToZero() {
            this.TimerDiv.querySelectorAll('*').forEach((element, index, arr) => {
                  arr[index].style.filter = 'none';
            });
            for (const key in this.timerObject) {
                  this.timerObject[key].forEach((el1, ind1, arr1) => {
                        arr1[ind1].src = this.AllNumbersImages[0].src;
                  })
            }
      }

      // ----------------------
      // Cookies
      // ----------------------

      CreateCookiesContainer() {
            let CookiesContainer = document.createElement('div');
            CookiesContainer.setAttribute('id', 'CookiesContainer');

            let RankingBaner = this.CookieTamplateBaner(CookiesContainer, "Ranking", "0", "380px");

            RankingBaner.dataset.Permision = true;

            RankingBaner.onclick = () => {
                  if (RankingBaner.dataset.Permision == "true") {
                        this.CookiesOnclick(RankingBaner, "150px");
                        RankingBaner.dataset.Permision = false;
                  }
                  else {
                        this.CookiesOutclick(RankingBaner);
                        this.InnerRankingBanerTable.forEach((el, ind, arr) => {
                              this.CookiesOutclick(arr[ind]);
                              arr[ind].dataset.Permision = true;
                        })

                        RankingBaner.dataset.Permision = true;
                  }
            }

            this.MainRankingBaner = RankingBaner;

            this.CookiesOptionsContainer = document.createElement('div');
            this.CookiesOptionsContainer.style.height = "0";
            CookiesContainer.appendChild(this.CookiesOptionsContainer);

            this.container.appendChild(CookiesContainer);

            this.CookiesContainer = CookiesContainer;
            this.CookiesParse(false);
      }

      CookieTamplateBaner(outher, txt, top, width) {

            var Cookies = document.createElement('div');
            Cookies.classList.add("CookieBaner");
            Cookies.style.marginTop = top;
            Cookies.style.width = width;

            var CookiesTitle = document.createElement('div');
            CookiesTitle.innerHTML = txt;

            var Cookiesbutton = document.createElement('button');
            var Cookiescanvas = document.createElement('canvas');
            Cookiescanvas.width = 100;
            Cookiescanvas.height = 100;

            let ctx = Cookiescanvas.getContext('2d');
            ctx.lineWidth = 10;
            ctx.lineCap = "round";
            ctx.fillStyle = 'rgb(0, 0, 0)';
            ctx.beginPath();
            ctx.moveTo(22, 39);
            ctx.lineTo(50, 68);
            ctx.stroke();
            ctx.moveTo((100 - 22), 39);
            ctx.lineTo(50, 68);
            ctx.stroke();

            Cookies.appendChild(CookiesTitle);

            Cookiesbutton.appendChild(Cookiescanvas);
            Cookies.appendChild(Cookiesbutton);

            outher.appendChild(Cookies);
            return Cookies;
      }

      CookiesRankingInput(table = this.CookieTable, CookiesOptionsContainer = this.CookiesOptionsContainer) {
            CookiesOptionsContainer.innerHTML = " ";
            this.InnerRankingBanerTable = [];

            let i = 0;
            for (const x in table[this.ImageSelect]) {
                  let CookieOption = document.createElement('div');
                  CookieOption.classList.add("CookieOption");

                  let top = (i == 0) ? '15px' : '8px';
                  let RankingBaner = this.CookieTamplateBaner(CookieOption, `${x}x${x}`, top, "340px");
                  RankingBaner.dataset.Permision = true;

                  RankingBaner.onclick = () => {
                        if (RankingBaner.dataset.Permision == "true") {
                              this.InnerRankingBanerTable.forEach((el, ind, arr) => {
                                    this.CookiesOutclick(arr[ind], "200px", CookiesOptionsContainer);
                                    arr[ind].dataset.Permision = true;
                              })
                              this.CookiesOnclick(RankingBaner, "200px", CookiesOptionsContainer);
                              RankingBaner.dataset.Permision = false;
                        }
                        else {
                              this.CookiesOutclick(RankingBaner, "200px", CookiesOptionsContainer);
                              RankingBaner.dataset.Permision = true;
                        }
                  }
                  this.InnerRankingBanerTable.push(RankingBaner);

                  let CookieRankingContainer = document.createElement('div');
                  CookieRankingContainer.style.height = "0";
                  let Ranking = new RankingClass(table[this.ImageSelect][x]).element;
                  CookieRankingContainer.appendChild(Ranking);



                  CookieOption.appendChild(CookieRankingContainer);
                  CookiesOptionsContainer.appendChild(CookieOption);
                  i++
            }
      }

      CookiesOnclick(el, height, CookiesOptionsContainer = null) {
            el.querySelector("canvas").style.transform = 'rotate(180deg)';
            let RankingContainer = el.parentNode.lastChild;
            RankingContainer.style.height = height;
            if (CookiesOptionsContainer != null) {
                  let height1 = parseFloat((CookiesOptionsContainer.style.height).slice(0, -2));
                  CookiesOptionsContainer.style.height = `${height1 + parseFloat(height.slice(0, -2))}px`
            }
      }
      CookiesOutclick(el, height = null, CookiesOptionsContainer = null) {
            el.querySelector("canvas").style.transform = 'rotate(0deg)';
            let RankingContainer = el.parentNode.lastChild;
            RankingContainer.style.height = "0";
            if (CookiesOptionsContainer != null) {
                  let height1 = parseFloat((CookiesOptionsContainer.style.height).slice(0, -2));
                  CookiesOptionsContainer.style.height = `${height1 - parseFloat(height.slice(0, -2))}px`
            }
      }

      CookiesParse(AfterSolve = true) {
            let table = this.GetCookie();

            if (AfterSolve) {
                  let Alert = new AlertClass();
                  this.PuzzleContainer.appendChild(Alert.element);
                  setTimeout(() => {
                        Alert.element.style.transform = 'scaleY(1)'
                  }, 20);
                  Alert.button.onclick = () => {
                        AlertOnClick(this);
                  };
                  Alert.input.onkeyup = (e) => {
                        if (e.keyCode == 13) {
                              e.preventDefault();
                              Alert.button.onclick();
                        }
                  }
                  Alert.input.focus();

                  function AlertOnClick(el) {

                        let nick = Alert.input.value;

                        let value = el.timediff;
                        table[el.ImageSelect][el.dimension].push({ n: nick, v: value })

                        if (table[el.ImageSelect][el.dimension].length > 1) {
                              let LetThatSort = true;
                              while (LetThatSort) {
                                    LetThatSort = false;
                                    for (let i = 0; i < (table[el.ImageSelect][el.dimension].length - 1); i++) {
                                          if (table[el.ImageSelect][el.dimension][i].v > table[el.ImageSelect][el.dimension][i + 1].v) {
                                                [table[el.ImageSelect][el.dimension][i], table[el.ImageSelect][el.dimension][i + 1]] = [table[el.ImageSelect][el.dimension][i + 1], table[el.ImageSelect][el.dimension][i]];
                                                LetThatSort = true
                                          }
                                    }
                              }
                        }
                        if (table[el.ImageSelect][el.dimension].length > 10) {
                              while (table[el.ImageSelect][el.dimension].length != 10) {
                                    table[el.ImageSelect][el.dimension].splice(-1, 1);
                              }
                        }
                        Alert.element.style.transform = 'scaleY(0)';
                        setTimeout(() => {
                              Alert.element.remove();
                        }, 1000)
                        el.SendCookie(table);
                        el.CookiesRankingInput();
                  }
            }
            else {
                  this.SendCookie(table);
                  this.CookiesRankingInput();
            };
      }

      GetCookie() {
            let Cookie = document.cookie;
            let Object1 = {};

            if (Cookie != "") {
                  let Table = Cookie.split("; ")
                  Table.forEach((el, ind, arr) => {
                        arr[ind] = arr[ind].split("=");
                  })

                  Table.forEach((el, ind, arr) => {
                        Object1[el[0]] = JSON.parse(decodeURIComponent(el[1]));
                  })
            }
            else {
                  for (let x = 0; x <= this.AmountOfPhotos; x++) {
                        Object1[x] = { "3": [], "4": [], "5": [], "6": [] };
                  }
            }

            return Object1;
      }
      SendCookie(table) {
            for (const x in table) {
                  document.cookie = `${x}=${encodeURIComponent(JSON.stringify(table[x]))}; expires=Sun, 12 Dec 2077 21:44:11 GMT;`;
            }
            this.CookieTable = table;
      }

      // ----------------------
      // Game 
      // ----------------------

      CreatePuzzleContainer() {
            let PuzzleContainer = document.createElement('div');
            PuzzleContainer.setAttribute('id', 'PuzzleContainer');

            this.stopAsync = false;
            this.Asynclist = [];

            this.container.appendChild(PuzzleContainer);

            this.PuzzleContainer = document.getElementById("PuzzleContainer");
      }
      CraftingSquare() {
            this.PuzzleContainer.innerHTML = null;
            this.Squaretab = [];
            for (let y = 0; y < this.dimension; y++) {
                  this.Squaretab.push([])
                  for (let x = 0; x < this.dimension; x++) {
                        var PuzzleElement = document.createElement('canvas');
                        PuzzleElement.style.top = `${(y / this.dimension) * 100}%`
                        PuzzleElement.style.left = `${(x / this.dimension) * 100}%`
                        PuzzleElement.style.width = `${(1 / this.dimension) * 100}%`
                        PuzzleElement.style.height = `${(1 / this.dimension) * 100}%`
                        PuzzleElement.width = 1000;
                        PuzzleElement.height = 1000;
                        if (x < this.dimension - 1 || y < this.dimension - 1) {
                              this.PuzzleContainer.appendChild(PuzzleElement);
                              var temp = new Square(PuzzleElement, this.dimension, {
                                    y: y,
                                    x: x
                              }, this.AllImageArray[this.ImageSelect])
                              this.Squaretab[y][x] = temp;
                        } else {
                              this.Squaretab[y][x] = "blank";
                        }
                  }
            }
            this.MixingSquares();
      }
      MixingSquares() {
            this.blanksquare = {
                  y: null,
                  x: null
            };
            this.RandomMeter = [{
                  y: -1,
                  x: 0
            },
            {
                  y: 0,
                  x: 1
            },
            {
                  y: 1,
                  x: 0
            },
            {
                  y: 0,
                  x: -1
            },
            ];

            this.lastRandom = null;

            let RandomY = this.dimension - 1;
            let RandomX = this.dimension - 1;
            let timer = 0;

            (function f(el) {

                  let promise = new Promise((resolve, reject) => {
                        Swipefunction(resolve, el)
                  })

                  promise.then(() => {

                        // -------------------
                        // Zmienić ilość
                        //--------------------
                        if (timer == (/*1*/ Math.pow(el.dimension, 3)) || el.stopAsync) {
                              el.PermisionToClick = true
                              el.Asynclist = [];
                              el.stopAsync = false;
                              clearInterval(el.timeanimate);
                              el.TimerAlgorythm();
                              el.StartingGame();
                        } else {
                              f(el);
                        }
                  })
            })(this)

            this.Asynclist.push(0);

            function Swipefunction(resolve, el) {
                  let LocalRandom;
                  let randomnumber

                  (function inIntervalle(el) {
                        randomnumber = Math.floor(Math.random() * 3.99);
                        LocalRandom = el.RandomMeter[randomnumber];

                        if (!(inRange(RandomY + LocalRandom.y, 0, el.dimension - 1) && inRange(RandomX + LocalRandom.x, 0, el.dimension - 1)) || (el.lastRandom == randomnumber)) {
                              inIntervalle(el);
                        }

                  })(el)

                  el.lastRandom = (inRange(randomnumber, 0, 1)) ? randomnumber + 2 : randomnumber - 2;


                  el.Squaretab[RandomY + LocalRandom.y][RandomX + LocalRandom.x].SwipeOnClick({
                        y: RandomY,
                        x: RandomX
                  }, resolve, 1);

                  [el.Squaretab[RandomY + LocalRandom.y][RandomX + LocalRandom.x], el.Squaretab[RandomY][RandomX]] = [el.Squaretab[RandomY][RandomX], el.Squaretab[RandomY + LocalRandom.y][RandomX + LocalRandom.x]]
                  RandomY += LocalRandom.y;
                  RandomX += LocalRandom.x;
                  el.blanksquare = {
                        y: RandomY,
                        x: RandomX
                  }
                  timer++;
            }

      }

      StartingGame() {
            this.PermisionToSwipePuzzle = true;
            this.RandomMeter.forEach(el => {
                  if (inRange(this.blanksquare.y + el.y, 0, this.dimension - 1) && inRange(this.blanksquare.x + el.x, 0, this.dimension - 1)) {
                        let promise = new Promise((resolve, reject) => {
                              this.Squaretab[this.blanksquare.y + el.y][this.blanksquare.x + el.x].AddingEvent({
                                    y: this.blanksquare.y,
                                    x: this.blanksquare.x
                              }, resolve, this)
                        });
                        promise.then(() => {
                              this.PermisionToSwipePuzzle = true;
                              this.RandomMeter.forEach(el1 => {
                                    if (inRange(this.blanksquare.y + el1.y, 0, this.dimension - 1) && inRange(this.blanksquare.x + el1.x, 0, this.dimension - 1)) {
                                          this.Squaretab[this.blanksquare.y + el1.y][this.blanksquare.x + el1.x].RemoveEvent();
                                    }
                              });
                              [this.Squaretab[this.blanksquare.y + el.y][this.blanksquare.x + el.x], this.Squaretab[this.blanksquare.y][this.blanksquare.x]] = [this.Squaretab[this.blanksquare.y][this.blanksquare.x], this.Squaretab[this.blanksquare.y + el.y][this.blanksquare.x + el.x]]
                              this.blanksquare = {
                                    y: this.blanksquare.y + el.y,
                                    x: this.blanksquare.x + el.x
                              }

                              let finished = true
                              for (let y = 0; y < this.Squaretab.length; y++) {
                                    for (let x = 0; x < this.Squaretab.length; x++) {
                                          if (this.Squaretab[y][x] != "blank") {
                                                if (this.Squaretab[y][x].truePosition.y != y || this.Squaretab[y][x].truePosition.x != x) {
                                                      finished = false;
                                                }
                                          }
                                    }
                              }
                              if (finished) {
                                    this.StopTimerAlgorythm();
                                    this.CookiesParse();
                                    let image = document.createElement('canvas');
                                    let number = ((this.dimension - 1) / this.dimension) * 100;
                                    let number1 = (1 / this.dimension) * 100;
                                    image.style.top = `${number}%`;
                                    image.style.left = `${number}%`;
                                    image.style.width = `${number1}%`;
                                    image.style.height = `${number1}%`;
                                    image.width = 1000;
                                    image.height = 1000;
                                    this.PuzzleContainer.appendChild(image);
                                    let temp = new Square(image, this.dimension, {
                                          y: this.dimension - 1,
                                          x: this.dimension - 1
                                    }, this.AllImageArray[this.ImageSelect]);
                                    this.Squaretab[this.dimension - 1][this.dimension - 1] = temp;

                                    for (let y = 0; y < this.dimension; y++) {
                                          for (let x = 0; x < this.dimension; x++) {
                                                this.Squaretab[y][x].DrawImage(false);
                                          }
                                    }
                                    this.PermisionToSetTimeout = false;
                              } else {
                                    this.StartingGame();
                              }
                        })
                  }


            })
      }

      ShowNumbers() {
            let Numbersbutton = document.createElement('button');
            Numbersbutton.innerHTML = "Pokaż liczby";
            Numbersbutton.classList.add("Numbersbutton");

            this.LetsSetNumbers = true;
            this.PermisionToSetTimeout = true;

            Numbersbutton.onclick = () => {
                  if (this.PermisionToSetTimeout) {
                        if (this.LetsSetNumbers) {
                              for (const x in this.Squaretab) {
                                    for (const y in this.Squaretab[x]) {
                                          if (this.Squaretab[x][y] != "blank") {
                                                this.Squaretab[x][y].DrawImage(true, true);
                                          }
                                    }
                              }
                              this.LetsSetNumbers = false;
                        }
                        else {
                              for (const x in this.Squaretab) {
                                    for (const y in this.Squaretab[x]) {
                                          if (this.Squaretab[x][y] != "blank") {
                                                this.Squaretab[x][y].DrawImage(true, false);
                                          }
                                    }
                              }
                              this.LetsSetNumbers = true;
                        }
                  }
            }

            this.Numbersbutton = Numbersbutton;

            this.container.appendChild(Numbersbutton);
      }
}

var gameObject;
window.addEventListener("load", () => {
      gameObject = new game();
      console.log("GameObject:")
      console.log(gameObject)
});