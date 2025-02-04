const Planet = require('../models/planet')
const Explorer = require('../models/explorer')

const newPlanet = (req, res) => {
  res.render('planets/new')
}

async function show(req, res) {
  const planet = await Planet.findById(req.params.id).populate('explorers');
  const explorers = await Explorer.find({});
  const planetExplorers = planet.explorers;
  
  const explorersNames = planetExplorers.map((explorerMember) => explorerMember.name);
  const availableExplorers = explorers.filter((explorer)=> {
    if(!explorersNames.includes(explorer.name)) {
      return explorer;
    }
  })
  res.render('planets/show', { planet, availableExplorers });
}

const create = async (req, res) => {
  for(let key in req.body){
    if (req.body[key] === ''){
      delete req.body[key]
    }
  }
  try {
    await Planet.create(req.body)
    res.redirect('/planets/new')
    console.log(req.body)

  } catch (error) {
    console.log(error)
    res.redirect('/planets/new')
  }
}

const index = async(req, res) => {
  try {
    const planets = await Planet.find({});
    res.render('planets/index.ejs', { planets })
  } catch(error){
    console.log(error)
    res.redirect('/')
  }
}
module.exports = {newPlanet, create, index, show}