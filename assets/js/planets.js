import { planetUrl } from "./apiKey.js"
const planetsUrl = planetUrl;
const planetsGrid = document.querySelector('#planets-grid')
const namePlanet = document.querySelector('#planet-detail-name')
const descriptionPlanet = document.querySelector('#planet-detail-description')
const planetDistance = document.querySelector('#planet-distance')
const planetRadius = document.querySelector('#planet-radius')
const planetMass = document.querySelector('#planet-mass')
const planetDensity = document.querySelector('#planet-density')
const planetOrbitalPeriod = document.querySelector('#planet-orbital-period')
const planetRotation = document.querySelector('#planet-rotation')
const planetMoons = document.querySelector('#planet-moons')
const planetGravity = document.querySelector('#planet-gravity')
const planetDiscoverer = document.querySelector('#planet-discoverer')
const discoveryDate = document.querySelector("#planet-discovery-date");
const perihelion = document.querySelector("#planet-perihelion");
const aphelion = document.querySelector("#planet-aphelion");
const eccentricity = document.querySelector("#planet-eccentricity");
const inclination = document.querySelector("#planet-inclination");
const axialTilt = document.querySelector("#planet-axial-tilt");
const temp = document.querySelector("#planet-temp");
const escape = document.querySelector("#planet-escape");
const factsList = document.querySelector("#planet-facts");
const planetTbody = document.querySelector("#planet-comparison-tbody")
const bodyType = document.querySelector("#planet-body-type");
const volume = document.querySelector("#planet-volume");
const detailImg = document.querySelector("#planet-detail-image");



    async function getPlanets(){
  try {
    const respone = await fetch(planetsUrl)
    if(!respone.ok){
      throw new Error()
    }
    const data = await respone.json()
    planetsGrid.innerHTML = "";
    planetTbody.innerHTML = "";

     for(let i = 0; i < data.bodies.length; i++){
      planetsCompare(data.bodies[i])
      const pId = data.bodies[i].id.toLowerCase();

      let planetColor = '#eab308'; // Default fallback

      if (pId === 'mercury' || pId === 'mercure') {
        planetColor = '#eab308';
      } else if (pId === 'venus') {
        planetColor = '#f97316';
      } else if (pId === 'earth' || pId === 'terre') {
        planetColor = '#3b82f6';
      } else if (pId === 'mars') {
        planetColor = '#ef4444';
      } else if (pId === 'jupiter') {
        planetColor = '#fb923c';
      } else if (pId === 'saturn' || pId === 'saturne') {
        planetColor = '#facc15';
      } else if (pId === 'uranus') {
        planetColor = '#06b6d4';
      } else if (pId === 'neptune') {
        planetColor = '#2563eb';
      }



      const planet = `
            <div
              class="planet-card bg-slate-800/50 border border-slate-700 rounded-2xl p-4 transition-all cursor-pointer group"
              data-planet-id="${data.bodies[i].id}"
              style="--planet-color: ${planetColor}"
              onmouseover="this.style.borderColor='${planetColor}'"
              onmouseout="this.style.borderColor='#334155'"
            >
              <div class="relative mb-3 h-24 flex items-center justify-center">
                <img
                  class="w-20 h-20 object-contain group-hover:scale-110 transition-transform"
                  src="${data.bodies[i].image}"
                  alt="${data.bodies[i].name}"
                />
              </div>
              <h4 class="font-semibold text-center text-sm">${data.bodies[i].englishName}</h4>
              <p class="text-xs text-slate-400 text-center">${(data.bodies[i].semimajorAxis / 149597870.7).toFixed(2)} AU</p>
            </div>
     `
     planetsGrid.innerHTML += planet;
          }

          // Show details for the first planet automatically once data is fetched (200 OK)
          if (data.bodies.length > 0) {
            detailsPlanet(data.bodies[6]);
          }

          const planetCard = document.querySelectorAll('.planet-card')
          planetCard.forEach(card => {
            card.addEventListener('click' , () => {
              const pId = card.getAttribute('data-planet-id')
              const body = data.bodies.find(b => b.id === pId);
              if (body) {
            detailsPlanet(body);
          }
        
            })
          })
     

  } catch (error) {
    console.error("Error fetching planets:", error);
  }


  
  function detailsPlanet(body) {
    
 if (!body) return;
  
  // Elements updating

  if (detailImg) {
    detailImg.src = body.image || `./assets/images/${body.id.toLowerCase()}.png`;
    detailImg.alt = body.name;
  }
  if(namePlanet){
    namePlanet.textContent = body.englishName
  }
  if(descriptionPlanet){
    descriptionPlanet.textContent = body.description
  }
  if(planetDistance){
    planetDistance.textContent = (body.semimajorAxis/1000000).toFixed(1) + 'M km'
  }
  if(planetRadius){
    planetRadius.textContent = (body.meanRadius/1000).toFixed(3) + ' km'
  }
  if (planetMass) {
     planetMass.innerHTML = (body.mass.massValue).toFixed(2) + ' × 10<sup>' + body.mass.massExponent + '</sup> kg'
  }
  if(planetDensity){
    planetDensity.textContent = (body.density).toFixed(2) + ' g/cm³'
  }
  if (planetOrbitalPeriod) {
    planetOrbitalPeriod.textContent = body.sideralOrbit.toFixed(2) + ' days'
  }
  if (planetRotation) {
    planetRotation.textContent = body.sideralRotation.toFixed(2) + ' hours'
  }
  if (planetMoons) {
    planetMoons.textContent = body.moons?.length
  }
  if(planetGravity)
    planetGravity.textContent = body.gravity
  if(planetDiscoverer){
    planetDiscoverer.textContent = body.discoveredBy || "Known since antiquity"
  }
  if (discoveryDate)
     discoveryDate.textContent = body.discoveryDate || "Ancient";


  if (bodyType) bodyType.textContent = body.bodyType || "Planet";

  if (volume) {
    if (body.vol && body.vol.volValue) {
      volume.textContent = `${body.vol.volValue} × 10^${body.vol.volExponent} km³`;
    } else {
      volume.textContent = "N/A";
    }
  }

  // Orbital Details

  if (perihelion) perihelion.textContent =  (body.perihelion/1000000000).toFixed(2) + 'M km'

  if (aphelion) aphelion.textContent = (body.aphelion/1000000000).toFixed(2) + 'M km'

  if (eccentricity) eccentricity.textContent = body.eccentricity || "N/A";

  if (inclination) inclination.textContent = body.inclination + "°" || "N/A";

  if (axialTilt) axialTilt.textContent = body.axialTilt + "°" || "N/A";

  if (temp) {
     temp.textContent = body.avgTemp + "°C"
  }

  if (escape) escape.textContent = body.escape ? `${(body.escape / 1000).toFixed(2)} km/s` : "N/A";

  // Facts
  if (factsList) {
    factsList.innerHTML = "";
     const facts = [];
     if (body.mass && body.mass.massValue) {
       facts.push(`Mass: ${(body.mass.massValue).toFixed(2)} × 10<sup>${body.mass.massExponent}</sup> kg`);
     } else {
       facts.push(`Mass: N/A`);
     }
     facts.push(`Surface Gravity: ${body.gravity ? body.gravity + ' m/s²' : 'N/A'}`);
     facts.push(`Density: ${body.density ? body.density.toFixed(2) + ' g/cm³' : 'N/A'}`);
     facts.push(`Axial Tilt: ${body.axialTilt ? body.axialTilt + '°' : 'N/A'}`);

    facts.forEach(fact => {
      factsList.insertAdjacentHTML("beforeend", `
        <li class="flex items-start">
          <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
          <span class="text-slate-300">${fact}</span>
        </li>
      `);
    });
  }
  }


  function planetsCompare(body) {
    const pId = body.id.toLowerCase();
    let planetColor = '#eab308'; // Default fallback

    if (pId === 'mercury' || pId === 'mercure') {
      planetColor = '#eab308';
    } else if (pId === 'venus') {
      planetColor = '#f97316';
    } else if (pId === 'earth' || pId === 'terre') {
      planetColor = '#3b82f6';
    } else if (pId === 'mars') {
      planetColor = '#ef4444';
    } else if (pId === 'jupiter') {
      planetColor = '#fb923c';
    } else if (pId === 'saturn' || pId === 'saturne') {
      planetColor = '#facc15';
    } else if (pId === 'uranus') {
      planetColor = '#06b6d4';
    } else if (pId === 'neptune') {
      planetColor = '#2563eb';
    }

    const distanceAU = (body.semimajorAxis / 149597870.7).toFixed(2);
    const diameterKm = body.meanRadius ? (body.meanRadius * 2).toLocaleString() : 'N/A';

    // Calculate relative mass to Earth (Earth mass is 5.972e24 kg)
    const bodyMassVal = body.mass ? body.mass.massValue * Math.pow(10, body.mass.massExponent) : 0;
    const earthMass = 5.972e24;
    const relativeMass = bodyMassVal ? (bodyMassVal / earthMass).toFixed(3) : 'N/A';

    // Orbital period formatting
    const orbitPeriod = body.sideralOrbit ? (body.sideralOrbit >= 365.25 ? (body.sideralOrbit / 365.25).toFixed(1) + ' years' : Math.round(body.sideralOrbit) + ' days') : 'N/A';
    const moonsCount = body.moons ? body.moons.length : 0;

    // Determine Planet Type
    let type = 'Terrestrial';
    let badgeClass = 'bg-orange-500/50 text-orange-200';
    if (pId === 'jupiter' || pId === 'saturn' || pId === 'saturne') {
      type = 'Gas Giant';
      badgeClass = 'bg-purple-500/50 text-purple-200';
    } else if (pId === 'uranus' || pId === 'neptune') {
      type = 'Ice Giant';
      badgeClass = 'bg-cyan-500/50 text-cyan-200';
    } else if (pId === 'earth' || pId === 'terre') {
      badgeClass = 'bg-blue-500/50 text-blue-200';
    }

    let compare = `
                    <tr class="hover:bg-slate-800/30 transition-colors">
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 sticky left-0 bg-slate-800 z-10"
                      >
                        <div class="flex items-center space-x-2 md:space-x-3">
                          <div
                            class="w-6 h-6 md:w-8 md:h-8 rounded-full flex-shrink-0"
                            style="background-color: ${planetColor}"
                          ></div>
                          <span
                            class="font-semibold text-sm md:text-base whitespace-nowrap"
                            >${body.englishName}</span
                          >
                        </div>
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        ${distanceAU}
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        ${diameterKm}
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        ${relativeMass}
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        ${orbitPeriod}
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        ${moonsCount}
                      </td>
                      <td class="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                        <span
                          class="px-2 py-1 rounded text-xs ${badgeClass}"
                          >${type}</span
                        >
                      </td>
                    </tr>
      `;
      planetTbody.innerHTML +=  compare
  }
  }
  
  export {getPlanets}