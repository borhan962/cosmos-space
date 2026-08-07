import {TodayUrl} from "./apiKey.js";
const apod = document.querySelector('#apod-date')
const dateInput = document.querySelector('#apod-date-input');
const spanDate = document.querySelector('.span-date');
const loading = document.querySelector('#apod-loading');
const img = document.querySelector('#apod-image');  
const explanation = document.querySelector('#apod-explanation');
const apodTitle = document.querySelector('#apod-title');
const apodDateDetail = document.querySelector('#apod-date-detail');
const apodDateInfo = document.querySelector('#apod-date-info');
const fullscreen = document.querySelector('.fullscreen');
const todayApodBtn = document.querySelector('#today-apod-btn');
const loadDateBtn = document.querySelector('#load-date-btn');
const apodMediaType = document.querySelector("#apod-media-type");
const apodCopyright = document.querySelector("#apod-copyright");
const today = new Date().toISOString().split('T')[0];

function formatDate(dateStr) {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()} - ${date.getFullYear()}`;
}

const now = new Date();
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const formattedToday = `${months[now.getMonth()]} ${now.getDate()} - ${now.getFullYear()}`;
spanDate.textContent = formattedToday ;




async function getTodayApod(){
  dateInput.value = today;
  getApodByDate(today);
}



async function getApodByDate(date) {
  try {
    img.style.display = "none";
    loading.classList.remove("hidden");
    const response = await fetch(
      `${TodayUrl}&date=${date}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const formatted = formatDate(data.date);
    apod.textContent = `Astronomy Picture of the Day - ${formatted}`;
    img.src = data.url;
    explanation.textContent = data.explanation;
    apodTitle.textContent = data.title;
    apodCopyright.textContent = `© ${data.copyright}`;
    dateInput.max = today;
    spanDate.textContent = formatted;
    apodDateDetail.innerHTML =
      `<i class="far fa-calendar mr-2"></i> ${formatted}`;

    apodDateInfo.textContent = formatted;
    apodMediaType.textContent = data.media_type;

    fullscreen.onclick = () => {
      window.open(data.hdurl || data.url, "_blank");
    };

  } catch (error) {
    console.error("Error fetching APOD:", error);
  } finally {
    loading.classList.add("hidden");
    img.style.display = "block";
  }
}


dateInput.addEventListener('change', () => {
  spanDate.textContent = formatDate(dateInput.value);
  if (!spanDate.textContent) {
    spanDate.textContent = "Select A Date";
  }
});


loadDateBtn.addEventListener('click', () => {
  getApodByDate(dateInput.value);
});

todayApodBtn.addEventListener('click', () => {
  dateInput.value = today;
  getApodByDate(today);
});


export {getTodayApod}
