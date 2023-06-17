const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: '¿Que encuentra emily en la cueva?',
    options: [
      {
        text: 'Bestia',
        setState: { blueGoo: true },
        nextText: 2
      },
      {
        text: 'Oso',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: '¿Cuantas pilas de rocas forma la bestia?',
    options: [
      {
        text: '4',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, sword: true },
        nextText: 3
      },
      {
        text: '3',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true },
        nextText: 4
      },
      {
        text: '2',
        nextText: 4
      }
    ]
  },
  {
    id: 3,
    text: '¿Donde coloco la tercera pila de rocas?',
    options: [
      {
        text: 'En primavera',
        nextText: 5
      },
      {
        text: 'En otoño',
        nextText: 6
      },
      {
        text: 'En invierno',
        nextText: 5
      }
    ]
  },
  {
    id: 4,
    text: 'Respuesta incorrecta',
    options: [
      {
        text: 'Intentalo de nuevo',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'Respuesta incorrecta',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'Te encuentras en el mundo  de las hadas',
    options: [
      {
        text: 'Vamos a explorar',
        nextText: 7
      }
      
    ]
  },
  {
    id: 7,
    text: '¿Que tipo de hada es emily?',
    options: [
      {
        text: 'Hada del jardin',
        nextText: 8
      },
      {
        text: 'Hada del agua',
        
        nextText: 9
      },
      {
        text: 'Hada del jardin',
        
        nextText: 10
      },
      {
        text: 'Hada de los animales',
        
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Respuesta incorrecta',
    options: [
      {
        text: 'Empezar otra vez',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'Respuesta incorrecta',
    options: [
      {
        text: 'Iniciar otra vez',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'Respuesta incorrecta',
    options: [
      {
        text: 'Intentarlo de nuevo',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: '!Felicidades, haz ganado¡',
    options: [
      {
        text: 'Jugar otra vez',
        nextText: -1
      }
    ]
  }
]

startGame()