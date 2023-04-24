const fetchData = async () => {
  const data = await fetch('http://localhost:3000/planets')
  return data.json()
}

// const data = fetchData()
// console.log(data)

const plantesDiv = document.querySelector(".planets ul")

const showPlanets = async () => {
  const data = await fetchData()
  data.forEach(element => {
    let li = document.createElement('li')
    li.append(element.name)
    plantesDiv.appendChild(li)
  });

}

showPlanets()
