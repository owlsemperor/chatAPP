import React from 'react'

const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
  return (
    <div className='flex'>
      <div className='form-control'>
        <label className={`label gap-2 cursor-pointer`}>
          <span className='label-text'>Male</span>
          <input
            type='checkbox'
            className='checkbox border-slate-900'
            checked={selectedGender === 'male' ? 'selected' : ''}
            onChange={() => onCheckboxChange('male')}></input>
        </label>
      </div>

      <div className='form-control'>
        <label className={`label gap-2 cursor-pointer`}>
          <span className='label-text'>Female</span>
          <input
            type='checkbox'
            className='checkbox border-slate-900'
            checked={selectedGender === 'female' ? 'selected' : ''}
            onChange={() => onCheckboxChange('female')}></input>
        </label>
      </div>
    </div>
  )
}

export default GenderCheckbox
