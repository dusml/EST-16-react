import './PrintError.css'

interface Props {
  children: string;
}

function PrintError({children}:Props) {
  return (
    <p role="alert" className='printError'>
      {children}
    </p>
  )
}

export default PrintError