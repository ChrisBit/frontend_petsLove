import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import { FaRegCalendarAlt, FaUserMd } from 'react-icons/fa'
import { GiLoveInjection } from 'react-icons/gi'
import moment from 'moment'
import Pet from 'models/Pet'
import TextCardInformation from 'components/commons/TextCardInformation'
import styles from './medicalInformationCat.scss'

const MedicalInformationCat = ({ pet }) => {
  const { t } = useTranslation('medicalInformationCat')

  const {
    isCastrated,
    rabiesVaccine,
    getLastVisitVet,
    distemperVaccine,
    felineFluVaccine,
    felineLeukemiaVaccine,
    felineInfectiousPeritonitisVaccine,
  } = pet.medicalInformationCat

  return (
    <div className={styles.info}>
      <TextCardInformation
        text={t('lastVisitVet')}
        icon={<FaRegCalendarAlt size={20} />}
        value={getLastVisitVet ? moment(getLastVisitVet).format('L') : 'N/A'}
      />
      {pet.getEmailUserVet && (
        <TextCardInformation
          value={pet.getEmailUserVet}
          icon={<FaUserMd size={18} />}
          text={t('common:userVeterinary')}
        />
      )}
      <TextCardInformation
        value={isCastrated}
        text={t('isCastrated')}
        icon={<GiLoveInjection size={20} />}
      />
      <TextCardInformation
        value={distemperVaccine}
        text={t('distemperVaccine')}
        icon={<GiLoveInjection size={20} />}
      />
      <TextCardInformation
        value={rabiesVaccine}
        text={t('rabiesVaccine')}
        icon={<GiLoveInjection size={20} />}
      />
      <TextCardInformation
        value={felineFluVaccine}
        text={t('felineFluVaccine')}
        icon={<GiLoveInjection size={20} />}
      />
      <TextCardInformation
        value={felineLeukemiaVaccine}
        text={t('felineLeukemiaVaccine')}
        icon={<GiLoveInjection size={20} />}
      />
      <TextCardInformation
        icon={<GiLoveInjection size={20} />}
        value={felineInfectiousPeritonitisVaccine}
        text={t('felineInfectiousPeritonitisVaccine')}
      />
    </div>
  )
}

MedicalInformationCat.propTypes = {
  pet: PropTypes.instanceOf(Pet).isRequired,
}

export default observer(MedicalInformationCat)
