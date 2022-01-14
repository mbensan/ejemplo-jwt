$('.cargarRegiones').on('click', async function () {
  const data = await fetch('/api/regiones')
  const data2 = await data.json()
  const regiones = data2.regiones

  console.log(regiones)

  dibujarGrafico(regiones);
})

function dibujarGrafico(regiones) {
  const dataPoints = []
  for (let region of regiones) {
    dataPoints.push(
      { y: region.comunas.length, label: region.region}
    )
  }
  
  const chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    theme: "light2", // "light1", "light2", "dark1", "dark2"
    title:{
      text: "Comunas"
    },
    axisY: {
      title: "Num. Comunas"
    },
    data: [{        
      type: "column",  
      dataPoints: dataPoints
    }]
  });
  chart.render();
}


$('#form-card').on('submit', function (ev) {
  ev.preventDefault();
  
  const name = $('#name').val()
  const image = $('#image').val()

  $('.bg-perros').append(`
  <div class="col-4">
    <div class="card" style="width: 18rem;">
      <img src="${image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <button class="btn btn-primary btn-saludar" data-name="${name}">Saludar</button>
      </div>
    </div>
  </div>
  `)
})

$(document).on('click', '.btn-saludar', function() {
  const name = $(this).attr('data-name')
  alert(`Veeenga venga venga ${name}`)
})
