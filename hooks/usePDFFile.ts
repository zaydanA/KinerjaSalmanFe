import { useState, ChangeEvent } from 'react';

function usePDFFile(defaultValue: FileList | null): [FileList | null, (e: ChangeEvent<HTMLInputElement> | null) => void] {
  const [file, setFile] = useState(defaultValue);
  function handleValueChange(event: ChangeEvent<HTMLInputElement> | null) {
    const validPDF = ['application/pdf'];

    if(event){
      const tempFile = event.target.files
      if(tempFile && tempFile.length>0) {
        if(validPDF.includes(tempFile[0].type)){
          setFile(tempFile)
        } else {
          setFile(null)
        }
      } 
    } else {
      setFile(null)
    }
    
  }

  return [file, handleValueChange];
}

export default usePDFFile;