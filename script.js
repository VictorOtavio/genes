const STYLES = document.head.appendChild(document.createElement("style"))
const PEOPLES = document.getElementById('peoples')
const MATRIX = {
  skin:    [ { type: 'dom', info: '#4f2d2a' }, { type: 'rec', info: '#bf6d4a' }, { type: 'dom', info: '#ef9d7a' } , { type: 'rec', info: '#ffbd9a' } ],
  hair:    [ { type: 'dom', info: '#2f1d0a' }, { type: 'rec', info: '#4f2d1a' }, { type: 'dom', info: '#8f4d2a' } , { type: 'rec', info: '#cf8d4a' } ],
  eyebrow: [ { type: 'dom', info: '#2f1d0a' }, { type: 'rec', info: '#4f2d1a' }, { type: 'dom', info: '#8f4d2a' } , { type: 'rec', info: '#cf8d4a' } ],
  eyes:    [ { type: 'dom', info: '#0f060d' }, { type: 'rec', info: '#90674b' }, { type: 'dom', info: '#32598d' } , { type: 'rec', info: '#70823c' } ],
  mouth:   [ { type: 'dom', info: '#623d2f' }, { type: 'rec', info: '#90674b' }, { type: 'dom', info: '#c98276' } , { type: 'rec', info: '#eec1ad' } ]
}
let COUPLE = []

function makeGamete(DNA) {
  return {
    skin: getRandomGene(DNA.skin),
    hair: getRandomGene(DNA.hair),
    eyebrow: getRandomGene(DNA.eyebrow),
    eyes: getRandomGene(DNA.eyes),
    mouth: getRandomGene(DNA.mouth)
  }
}

function fertilization(fatherGenes, motherGenes) {
  const DNA = { skin: {}, hair: {}, eyebrow: {}, eyes: {}, mouth: {} }

  DNA.skin[fatherGenes.skin.type] = fatherGenes.skin.info
  DNA.skin[motherGenes.skin.type] = motherGenes.skin.info
  DNA.hair[fatherGenes.hair.type] = fatherGenes.hair.info
  DNA.hair[motherGenes.hair.type] = motherGenes.hair.info
  DNA.eyebrow[fatherGenes.eyebrow.type] = fatherGenes.eyebrow.info
  DNA.eyebrow[motherGenes.eyebrow.type] = motherGenes.eyebrow.info
  DNA.eyes[fatherGenes.eyes.type] = fatherGenes.eyes.info
  DNA.eyes[motherGenes.eyes.type] = motherGenes.eyes.info
  DNA.mouth[fatherGenes.mouth.type] = fatherGenes.mouth.info
  DNA.mouth[motherGenes.mouth.type] = motherGenes.mouth.info

  return DNA
}

function getRandomGene(genes) {
  const types = Object.keys(genes)
  const type = types[Math.floor(Math.random() * types.length)]
  const info = genes[type]

  return { type, info }
}

function bornFirstCouple() {
  const male = { skin: {}, hair: {}, eyebrow: {}, eyes: {}, mouth: {} }
  male.skin[MATRIX.skin[0].type] = MATRIX.skin[0].info
  male.skin[MATRIX.skin[1].type] = MATRIX.skin[1].info
  male.hair[MATRIX.hair[0].type] = MATRIX.hair[0].info
  male.hair[MATRIX.hair[1].type] = MATRIX.hair[1].info
  male.eyebrow[MATRIX.eyebrow[0].type] = MATRIX.eyebrow[0].info
  male.eyebrow[MATRIX.eyebrow[1].type] = MATRIX.eyebrow[1].info
  male.eyes[MATRIX.eyes[0].type] = MATRIX.eyes[0].info
  male.eyes[MATRIX.eyes[1].type] = MATRIX.eyes[1].info
  male.mouth[MATRIX.mouth[0].type] = MATRIX.mouth[0].info
  male.mouth[MATRIX.mouth[1].type] = MATRIX.mouth[1].info

  const female = { skin: {}, hair: {}, eyebrow: {}, eyes: {}, mouth: {} }
  female.skin[MATRIX.skin[2].type] = MATRIX.skin[2].info
  female.skin[MATRIX.skin[3].type] = MATRIX.skin[3].info
  female.hair[MATRIX.hair[2].type] = MATRIX.hair[2].info
  female.hair[MATRIX.hair[3].type] = MATRIX.hair[3].info
  female.eyebrow[MATRIX.eyebrow[2].type] = MATRIX.eyebrow[2].info
  female.eyebrow[MATRIX.eyebrow[3].type] = MATRIX.eyebrow[3].info
  female.eyes[MATRIX.eyes[2].type] = MATRIX.eyes[2].info
  female.eyes[MATRIX.eyes[3].type] = MATRIX.eyes[3].info
  female.mouth[MATRIX.mouth[2].type] = MATRIX.mouth[2].info
  female.mouth[MATRIX.mouth[3].type] = MATRIX.mouth[3].info

  born(male)
  born(female)

  COUPLE = document.getElementsByClassName("person");
}

function born(DNA) {
  const head = document.createElement('div')
  head.className = 'head'
  head.style.backgroundColor = DNA.skin.dom !== undefined ? DNA.skin.dom : DNA.skin.rec

  const hair = document.createElement('div')
  hair.className = 'hair'
  hair.style.backgroundColor = DNA.hair.dom !== undefined ? DNA.hair.dom : DNA.hair.rec
  head.appendChild(hair)

  const eyebrow = document.createElement('div')
  eyebrow.className = 'eyebrow'
  eyebrow.style.backgroundColor = DNA.eyebrow.dom !== undefined ? DNA.eyebrow.dom : DNA.eyebrow.rec

  const pupil = document.createElement('div')
  pupil.className = 'pupil'
  pupil.style.backgroundColor = DNA.eyes.dom !== undefined ? DNA.eyes.dom : DNA.eyes.rec

  const eyes = document.createElement('div')
  eyes.appendChild(eyebrow)
  eyes.appendChild(pupil)

  leye = eyes.cloneNode(true)
  leye.className = 'leye'
  head.appendChild(leye)
  reye = eyes.cloneNode(true)
  reye.className = 'reye'
  head.appendChild(reye)

  const mouth = document.createElement('div')
  mouth.className = 'mouth'
  mouth.style.backgroundColor = DNA.mouth.dom !== undefined ? DNA.mouth.dom : DNA.mouth.rec
  head.appendChild(mouth)

  const person = document.createElement('div')
  person.className = 'person'
  person.dataset.dna = JSON.stringify(DNA)
  person.addEventListener('click', function () {
    marry(person)
  })
  person.appendChild(head)

  PEOPLES.appendChild(person)
}

function marry(person) {
  if (COUPLE.length < 2) {
    COUPLE.push(person)
    person.style.backgroundColor = '#00f'
  }
}

function makeChildren() {
  if (COUPLE.length < 2) {
    return
  }

  const fatherGenes = makeGamete(JSON.parse(COUPLE[0].dataset.dna))
  const motherGenes = makeGamete(JSON.parse(COUPLE[1].dataset.dna))
  const DNA = fertilization(fatherGenes, motherGenes)

  born(DNA)
}

function newCouple() {
  COUPLE = []

  let persons = document.getElementsByClassName('person')

  for (let i = 0; i < persons.length; i++) {
    persons[i].style.backgroundColor = 'initial'
  }
}

bornFirstCouple()
