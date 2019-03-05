(function () {
  // new variable
  const BASE_URL = 'https://lighthouse-user-api.herokuapp.com'
  const INDEX_URL = BASE_URL + '/api/v1/users/'
  const SHOW_URL = INDEX_URL + ':id'
  const data = []
  const dataPanel = document.getElementById('data-panel')

  axios
    .get(INDEX_URL)
    .then(response => {
      data.push(...response.data.results)
      displayDataList(data)
    })
    .catch(err => console.log(err))
  // listen to data panel
  dataPanel.addEventListener('click', (event) => {
    if (event.target.matches('.btn-show-user')) {
      showUser(event.target.dataset.id)
    }
  })

  function displayDataList(data) {
    let htmlContent = ''
    data.forEach(function (item) {
      htmlContent += `
      <div class="card col-sm-3" data-id="${item.id}">
        <div class="card mb-2" >
          <img class="card-img-top" src="${item.avatar}" alt="Card image cap">
          <div class="card-body user-item-body">
            <h6>${item.surname} ${item.name}</h6>
          </div>
          <div class="card-footer">
            <button class="btn btn-primary btn-show-user" data-toggle="modal"  data-target="#show-user-modal" data-id="${item.id}">More</button> 
          </div>
        </div>
      </div>
    `
    })
    dataPanel.innerHTML = htmlContent
  }

  function showUser(id) {
    // get Element
    const modalTitle = document.getElementById('show-user-title')
    const modalAvatar = document.getElementById('show-user-avatar')
    const modalDescription = document.getElementById('show-user-description')

    // set request url
    const url = INDEX_URL + id
    console.log(url)

    // send request to show api
    axios
      .get(url)
      .then(response => {
        const data = response.data
        console.log(data)

        // insert data into modal ui
        modalTitle.textContent = data.name
        modalAvatar.innerHTML = `<img src="${data.avatar}" class="img-fluid" alt="Responsive image">`
        modalDescription.innerHTML = `
      <p>Gender : ${data.gender}</p>
      <p>Age : ${data.age}</p>
      <p>Birthday : ${data.birthday}</p>
      <p>Region : ${data.region}</p>
      <p>Email : ${data.email}</p>
      <p>updated at : ${data.updated_at}</p> 
    `
      })
  }
})()