const fullscreenBtn = document.querySelector('.fullscreen');
const input = document.querySelector('.filters')
const btnBlock = document.querySelector('.btn-container')

// fullscreen 
const toggleFullscreenMode = (btn) => {
   btn.classList.contains('pressed') ? document.exitFullscreen() : document.documentElement.requestFullscreen();
}

document.onfullscreenchange = () => {
   fullscreenBtn.classList.toggle('pressed');
}
fullscreenBtn.onclick = () => toggleFullscreenMode(fullscreenBtn);

// inputs
let inputVars ={
   valueName: '',
   value: 0,
   saturateValue: 100,
}

function inputChangeValueObjf(event) {

   if (event.target.name == 'blur') {
      inputVars.value = event.target.value;
      inputVars.valueName = event.target.name;
      //Array of matches
      let matches = Array.prototype.slice.call(document.querySelectorAll("label"));
      let label = matches.filter(filterElements);

      function filterElements(element) {
         let regex = /Blur:/g
         if (element.textContent.match(regex)) return element
      }
      label[0].querySelector("output").innerHTML = inputVars.value
      document.documentElement.style.setProperty(`--${'blur'}`, inputVars.value + 'px')
   }
   if (event.target.name == 'invert') {
      inputVars.value = event.target.value;
      inputVars.name = event.target.name;
      //Array of matches
      let matches = Array.prototype.slice.call(document.querySelectorAll("label"));
      let label = matches.filter(filterElements);

      function filterElements(element) {
         let regex = /Invert:/g
         if (element.textContent.match(regex)) return element
      }
      label[0].querySelector("output").innerHTML = inputVars.value
      document.documentElement.style.setProperty(`--${inputVars.name}`, inputVars.value + '%')
   }
   if (event.target.name == 'sepia') {
      inputVars.value = event.target.value;
      inputVars.name = event.target.name;
      //Array of matches
      let matches = Array.prototype.slice.call(document.querySelectorAll("label"));
      let label = matches.filter(filterElements);

      function filterElements(element) {
         let regex = /Sepia:/g
         if (element.textContent.match(regex)) return element
      }
      label[0].querySelector("output").innerHTML = inputVars.value
      document.documentElement.style.setProperty(`--${'sepia'}`, inputVars.value + '%')
   }
   if (event.target.name == 'saturate') {
      inputVars.value = event.target.value;
      inputVars.valueName = event.target.name;
      //Array of matches
      let matches = Array.prototype.slice.call(document.querySelectorAll("label"));
      let label = matches.filter(filterElements);

      function filterElements(element) {
         let regex = /Saturate:/g
         if (element.textContent.match(regex)) return element
      }
      label[0].querySelector("output").innerHTML = inputVars.value
      document.documentElement.style.setProperty(`--${'saturate'}`, inputVars.value + '%')
   }
   if (event.target.name == 'hue') {
      inputVars.value = event.target.value;
      inputVars.name = event.target.name;
      //Array of matches
      let matches = Array.prototype.slice.call(document.querySelectorAll("label"));
      let label = matches.filter(filterElements);

      function filterElements(element) {
         let regex = /Hue rotate:/g
         if (element.textContent.match(regex)) return element
      }
      label[0].querySelector("output").innerHTML = inputVars.value
      document.documentElement.style.setProperty(`--${'hue'}`, inputVars.value + 'deg')
   }
}

input.addEventListener('input', inputChangeValueObjf)

const time = new Date();
const timeOfDay = (time) => {
   if (time.getHours() >= 6 && time.getHours() < 12) timeDay = 'morning'
   if (time.getHours() >= 12 && time.getHours() < 18) timeDay = 'day'
   if (time.getHours() >= 18 && time.getHours() < 24) timeDay = 'evening'
   if (time.getHours() >= 0 && time.getHours() < 6) timeDay = 'night'
}
let timeDay ='';
timeOfDay(time);

const base = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeDay}/`;
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let i = 0;

const imgDoc = document.querySelector('img');


function viewBgImage(src) {
   imgDoc.src = src;
   imgDoc.setAttribute('crossOrigin', 'anonymous');

   imgDoc.onload = () => {
      imgDoc.width = imgDoc.naturalWidth;
      imgDoc.height = imgDoc.naturalHeight;
   };
}

function getImage() {
   const index = i % images.length;
   const imageSrc = base + images[index];
   const btn = 0;
   viewBgImage(imageSrc);

   i++;
   btn.disabled = true;
   setTimeout(function () { btn.disabled = false }, 1000);
}

function saveImage(img) {
   const canv = document.createElement('canvas');
   canv.width = img.naturalWidth
   canv.height = img.naturalHeight

   let ctx = canv.getContext("2d");
   ctx.filter = getComputedStyle(img).filter
   ctx.drawImage(img, 0, 0, canv.width, canv.width )

   let link = document.createElement('a')
   link.download = `image.png`
   link.href = canv.toDataURL();
   
   link.click();
   link.delete;
}
function loadImage(){
   const fileInput = document.querySelector('.btn-load--input')
   fileInput.addEventListener('change', el =>{
      const reader = new FileReader();
      const file = fileInput.files[0]

      reader.onload = () => {
         const img = new Image();
         console.log(file);
         img.src = reader.result;
         imgDoc.src = img.src;
      }
      reader.readAsDataURL(file);
   })
  
}

function btnBlockFunc (event){
   if (event.target.className.match('btn-reset')) {
      inputVars.saturateValue = 100
      inputVars.value = 0;
      let matches = Array.prototype.slice.call(document.querySelectorAll("label"));
      matches.forEach((el, i) => {
         if (i == 3) {
            el.querySelector('input').value = inputVars.saturateValue
            el.querySelector("output").innerHTML = inputVars.saturateValue
            document.documentElement.style.setProperty(`--${'saturate'}`, inputVars.saturateValue + '%')
         } 
         if (el.textContent.match(/Blur:/g)) { 
            el.querySelector("output").innerHTML = inputVars.value
            el.querySelector('input').value = inputVars.value
            document.documentElement.style.setProperty(`--${'blur'}`, inputVars.value + 'px')
         } else if (el.textContent.match(/Invert:/g)){
            el.querySelector("output").innerHTML = inputVars.value
            el.querySelector('input').value = inputVars.value
            document.documentElement.style.setProperty(`--${'invert'}`, inputVars.value + '%')
         } else if (el.textContent.match(/Sepia:/g)) {
            el.querySelector("output").innerHTML = inputVars.value
            el.querySelector('input').value = inputVars.value
            document.documentElement.style.setProperty(`--${'sepia'}`, inputVars.value + '%')
         } else if (el.textContent.match(/Hue rotate:/g)) {
            el.querySelector("output").innerHTML = inputVars.value
            el.querySelector('input').value = inputVars.value
            document.documentElement.style.setProperty(`--${'hue'}`, inputVars.value + 'deg')
         }
      })

   } else if (event.target.className.match('btn-save')){
      saveImage(imgDoc)
   }
   else if (event.target.className.match('btn-next')) {
      getImage()
   } else if (event.target.className.match('btn-load')){
      loadImage()
   }
}

btnBlock.addEventListener('click', btnBlockFunc)