var jwt = require('jwt-simple');
var jason = { foo: 'bar' };
var secreto = 'palabra codigo';
 
// codificar 
var token = jwt.encode(jason, secreto);
 console.log(token);
 
// decodificar 
var decod = jwt.decode(token, secreto);
console.log(decod);