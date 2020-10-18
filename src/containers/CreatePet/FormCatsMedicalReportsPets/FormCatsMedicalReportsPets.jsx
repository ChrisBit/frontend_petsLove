import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import CreatePetStore from 'stores/CreatePetStore'
import InputCheckbox from 'components/commons/InputCheckbox'
import { useTranslation } from 'react-i18next'
import LayoutForm from 'components/commons/LayoutForm'
import InputDate from 'components/commons/InputDate'
import Textarea from 'components/commons/Textarea/Textarea'
import InputSelect from 'components/commons/InputSelect'
import styles from './formCatsMedicalReportsPets.scss'

const FormCatsMedicalReportsPets = ({ createPetStore }) => {
  const { t } = useTranslation('createPet')

  const handleDateChange = useCallback(date => {
    createPetStore.pet.medicalInformationCat.setLastVisitVet(date)
  }, [])

  const handleChangeVet = useCallback(selectedOption => {
    createPetStore.pet.setUserVet(selectedOption.value)
  }, [])

  const handleDateIsCastrated = useCallback(() => {
    createPetStore.pet.medicalInformationCat.setIsCastrated()
  }, [])

  const handleChangeDistemperVaccine = useCallback(() => {
    createPetStore.pet.medicalInformationCat.setDistemperVaccine()
  }, [])

  const handleChangeFelineFluVaccine = useCallback(() => {
    createPetStore.pet.medicalInformationCat.setFelineFluVaccine()
  }, [])

  const handleChangeFelineLeukemiaVaccine = useCallback(() => {
    createPetStore.pet.medicalInformationCat.setFelineLeukemiaVaccine()
  }, [])

  const handleChangePeritonitisVaccine = useCallback(() => {
    createPetStore.pet.medicalInformationCat.setFelineInfectiousPeritonitisVaccine()
  }, [])

  const handleChangeRabiesVaccine = useCallback(() => {
    createPetStore.pet.medicalInformationCat.setRabiesVaccine()
  }, [])

  const handleChangeNotes = useCallback(e => {
    createPetStore.pet.medicalInformationCat.setNotes(e.target.value)
  }, [])

  const {
    notes,
    getNotes,
    getIsCastrated,
    getLastVisitVet,
    getRabiesVaccine,
    getDistemperVaccine,
    getFelineFluVaccine,
    getFelineLeukemiaVaccine,
    getFelineInfectiousPeritonitisVaccine,
  } = createPetStore.pet.medicalInformationCat

  const { optionsUserVet } = createPetStore

  return (
    <LayoutForm>
      <div className={styles.title}>{t('medicalInformation')}</div>
      <div className={styles.colums}>
        <InputDate
          label={t('labelVisitVet')}
          handleDateChange={handleDateChange}
          value={getLastVisitVet}
        />
      </div>
      <div className={styles.colums}>
        <InputSelect
          isEdit
          label={t('labelVet')}
          options={optionsUserVet}
          handleChange={handleChangeVet}
          value={createPetStore.pet.getUserVet}
          inputStore={createPetStore.pet.userVet}
          placeholder={t('placeHolderSelectVet')}
        />
      </div>
      <div className={styles.colums}>
        <InputCheckbox
          isEdit
          value={getIsCastrated}
          text={t('isCastrated')}
          handleChange={handleDateIsCastrated}
        />
      </div>
      <div className={styles.colums}>
        <div className={styles.subtitle}>{t('cat.catVaccinationForm')}</div>
      </div>
      <div className={styles.colums}>
        <InputCheckbox
          isEdit
          value={getDistemperVaccine}
          text={t('isDistemperVaccine')}
          handleChange={handleChangeDistemperVaccine}
        />
      </div>
      <div className={styles.colums}>
        <InputCheckbox
          isEdit
          text={t('cat.felineFluVaccine')}
          value={getFelineFluVaccine}
          handleChange={handleChangeFelineFluVaccine}
        />
      </div>
      <div className={styles.colums}>
        <InputCheckbox
          isEdit
          text={t('cat.felineLeukemia')}
          value={getFelineLeukemiaVaccine}
          handleChange={handleChangeFelineLeukemiaVaccine}
        />
      </div>
      <div className={styles.colums}>
        <InputCheckbox
          isEdit
          text={t('cat.felineInfectiousPeritonitis')}
          value={getFelineInfectiousPeritonitisVaccine}
          handleChange={handleChangePeritonitisVaccine}
        />
      </div>
      <div className={styles.colums}>
        <InputCheckbox
          isEdit
          value={getRabiesVaccine}
          text={t('vaccinatedRabies')}
          handleChange={handleChangeRabiesVaccine}
        />
      </div>
      <div className={styles.colums}>
        <Textarea
          isEdit
          rows={5}
          value={getNotes}
          inputStore={notes}
          label={t('common:notes')}
          handleChange={handleChangeNotes}
        />
      </div>
    </LayoutForm>
  )
}

FormCatsMedicalReportsPets.propTypes = {
  createPetStore: PropTypes.instanceOf(CreatePetStore).isRequired,
}

export default observer(FormCatsMedicalReportsPets)
