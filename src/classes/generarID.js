export function generarId(){
  const id = Math.floor(Math.random() * (10000 - 1000)) + 1000;

  return id
}