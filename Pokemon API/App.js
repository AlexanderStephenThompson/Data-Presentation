const fetchPokemon = () => {

    const url = `https://pokeapi.co/api/v2/pokemon/charizard`

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // console.log(data)

            const statLimit = 255
            Stats = data.stats.map(stat => stat.base_stat)
            largestStat = Math.max(...Stats)

            const properCase = (text) => {
                let firstLetter = text.slice(0, 1)
                let capitalStart = firstLetter.toUpperCase()

                let remainingName = text.slice(1).toLowerCase()
                let properName = capitalStart + remainingName

                return properName
            }

            const Charizard = {
                Name: properCase(data.name),
                ID: data.id,
                Height: (data.height) / 10, //Converted decimeters to meters
                Weight: (data.weight) / 10, // Converted hectograms to kilograms
                Type1: properCase(data.types[0].type.name),
                Type2: properCase(data.types[1].type.name),

                // Stats are standardized to 0% - 100% for meter tag
                HP:             parseFloat(((data.stats[0].base_stat) / largestStat).toFixed(2)) * 100,
                Attack:         parseFloat(((data.stats[1].base_stat) / largestStat).toFixed(2)) * 100,
                Defense:        parseFloat(((data.stats[2].base_stat) / largestStat).toFixed(2)) * 100,
                SpecialAttack:  parseFloat(((data.stats[3].base_stat) / largestStat).toFixed(2)) * 100,
                SpecialDefense: parseFloat(((data.stats[4].base_stat) / largestStat).toFixed(2)) * 100,
                Speed:          parseFloat(((data.stats[5].base_stat) / largestStat).toFixed(2)) * 100,
            }

            const CharizardCard = document.getElementById("cardContainer");
            CharizardCard.innerHTML =
                `
                    <div id="top">
                        <div id="header">
                            <h1 id="pokemonName">${Charizard.Name}</h1>
                            <div id="metaData">
                                <p id="pokemonID">#00${Charizard.ID}</p>
                                <div>
                                    <p class="chip" id="flyingType">Flying</p>
                                </div>
                                <div>
                                    <p class="chip" id="fireType">Fire</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="bottom">

                        <div id="description">
                            <h2 id="descriptionHeader">Description</h2>
                            <div class="dividingLine" id="dividingLine1"></div>
                            <p id="descriptionText">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
                        </div>

                        <div id="KPIs">
                            <div class="KPI" id="height">
                                <img class="icon" src="Images/Height Icon.png" alt="" srcset="">
                                <p class="KPINumber">${Charizard.Height}m</p>
                            </div>
                            <div class="KPI" id="weight">
                                <img class="icon" src="Images/Weight Icon.png" alt="">
                                <p class="KPINumber">${Charizard.Weight}kg</p>
                            </div>
                        </div>

                        <div id="data">
                            <h2>Stats</h2>
                            <div class="dividingLine" id="dividingLine2"></div>

                            <div id="statBars">

                                <div class="Stat"><p>HP</p>              <meter min="0" max="100" value="${Charizard.HP}"></meter></div>
                                <div class="Stat"><p>Attack</p>          <meter min="0" max="100" value="${Charizard.Attack}"></meter></div>
                                <div class="Stat"><p>Defense</p>         <meter min="0" max="100" value="${Charizard.Defense}"></meter></div>
                                <div class="Stat"><p>Special Attack</p>  <meter min="0" max="100" value="${Charizard.SpecialAttack}"></meter></div>
                                <div class="Stat"><p>Special Defense</p> <meter min="0" max="100" value="${Charizard.SpecialDefense}"></meter></div>
                                <div class="Stat"><p>Speed</p>           <meter min="0" max="100" value="${Charizard.Speed}"></meter></div>

                            </div>

                        </div>
                    </div>
                `
        })
}

fetchPokemon();