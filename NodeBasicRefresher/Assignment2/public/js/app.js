const users = ['Adrian','Adriano','Adryan','Adrienne','Adrien']

const usersList = document.querySelector('.users-list')

users.forEach((user) => {
    let userElement = document.createElement('li')
    let userNameContent = document.createTextNode(user)
    userElement.appendChild(userNameContent)
    usersList.appendChild(userElement)
})