/* globals fetch */
var update = document.getElementById('update')
var del = document.getElementById('delete')
var texto = document.getElementById('Info')
var n = document.getElementById("name1").value;
var d = document.getElementById("desc").value;
var i = document.getElementById("ing").value;
var m = document.getElementById("masa").value;
var t = document.getElementById("tam").value;
var p = document.getElementById("por").value;
var q = document.getElementById("queso").value;
var ndel;

update.addEventListener('click', function () {
  n=document.getElementById("name1").value;
  d = document.getElementById("desc").value;
  i = document.getElementById("ing").value;
  m = document.getElementById("masa").value;
  t = document.getElementById("tam").value;
  p = document.getElementById("por").value;
  q = document.getElementById("queso").value;
  console.log(n);
  fetch('pizza', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ 'name': n, 'Descripcion': d, 'Ingredientes': i,
    'Masa': m, 'Tamaño': t, 'Porciones': p, 'queso': q
      
    })
  })
  .then(response => {
    if (response.ok) return response.json()
  })
  .then(data => {
    console.log(data)
  })
})

del.addEventListener('click', function () {
  ndel = document.getElementById('tdelete').value;
  fetch('pizza', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': ndel
    })
  }).then(function (response) {
    window.location.reload()
  })
})
