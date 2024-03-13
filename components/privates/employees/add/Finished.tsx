import BaseInputButton from '@/components/shares/buttons/BaseInputButton'
import React from 'react'
import { FaCheck } from 'react-icons/fa6'

type FinishedProps = {
  handleBack: () => void,
  handleAddAnother: () => void,
}

const Finished = ({
  handleBack,
  handleAddAnother
} : FinishedProps) => {
  return (
    <div className='w-1/2 mx-auto'>
      <div className='flex flex-col justify-center items-center text-center gap-4'>
        <FaCheck size="8em" className="text-gold01" />
        <h1 className='text-normal font-medium'>
          You have successfully added employee data
        </h1>
        <p className='text-sm leading-6 w-3/4 mb-8 text-gray-500'>
          To continue the process, please instruct your employee to check their email for further instructions.
        </p>

        <div className='w-3/4 flex flex-row justify-between'>
          <BaseInputButton
            text='Back to index'
            type='underlined'
            onClick={handleBack}
          />

          <BaseInputButton
            text='Add another'
            type='submit'
            onClick={handleAddAnother}
          />
        </div>
      </div>
    </div>
  )
}

export default Finished