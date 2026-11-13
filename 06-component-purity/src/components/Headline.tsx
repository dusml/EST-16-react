let count = 0;

function Headline() {

  console.log('안녕 난 헤드라인이야🐯');
  console.log(++count);
  
  return (
    <div>Headline {count}</div>
  )
}
export default Headline