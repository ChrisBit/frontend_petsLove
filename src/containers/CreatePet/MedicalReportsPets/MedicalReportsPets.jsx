import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import CreatePetStore from 'stores/CreatePetStore'
import FormCatsMedicalReportsPets from '../FormCatsMedicalReportsPets'
import FormDogsMedicalReportsPets from '../FormDogsMedicalReportsPets'
import FormExoticMedicalReportsPets from '../FormExoticMedicalReportsPets'

const MedicalReportsPets = ({ createPetStore }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (createPetStore.pet.category.value === 'cat') {
    return <FormCatsMedicalReportsPets createPetStore={createPetStore} />
  }
  if (createPetStore.pet.category.value === 'dog') {
    return <FormDogsMedicalReportsPets createPetStore={createPetStore} />
  }

  return <FormExoticMedicalReportsPets createPetStore={createPetStore} />
}

MedicalReportsPets.propTypes = {
  createPetStore: PropTypes.instanceOf(CreatePetStore).isRequired,
}

export default observer(MedicalReportsPets)
