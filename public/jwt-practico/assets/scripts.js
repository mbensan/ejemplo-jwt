// Acá parte la Magia!
let token;

$('#js-form').on('submit', async function (ev) {
  // primero evitamos que se recargue la pagina
  ev.preventDefault();
  // obtenemos el email y el password
  const email = $('#js-input-email').val()
  const password = $('#js-input-password').val()

  // ahora vamos a solicitar el Token
  const data = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  })
  const jwt = await data.json()

  // guardamos el token en una variable
  token = jwt.token
  
  // Ahora vamos a buscar los Posteos
  const data2 = await fetch('/api/posts', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const respuesta = await data2.json()
  const posts = respuesta.data

  console.log(posts)
  llenarTabla(posts)
})

function llenarTabla(posts) {
  // primero llenamos la tabla con la info de los POSTS
  
  for (let post of posts) {
    $('#posts-table').append(`
      <tr><td>${post.id}</td><td>${post.title}</td><td>${post.body}</td><td></td></tr>
    `)
  }
  /* FORMA mas PRO de llenar la tabla
  $('#post-table').html(
    posts.map(
      post => `<tr><td>${post.id}</td><td>${post.title}</td><td>${post.body}</td><td></td></tr>`)
    .join('')
  ) */

  // Escondemos el formulario
  $('#div-form').removeClass('d-block').addClass('d-none')
  // Mostramos la tabla
  $('#div-tabla').removeClass('d-none').addClass('d-block')
}
