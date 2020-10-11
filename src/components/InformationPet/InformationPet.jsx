import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import {
  FaCat,
  FaDog,
  FaUserPlus,
  FaStreetView,
  FaTransgender,
  FaUserAstronaut,
  FaRegCalendarAlt,
} from 'react-icons/fa'
import { GiJumpingDog } from 'react-icons/gi'
import { IoIosHelpBuoy } from 'react-icons/io'
import Pet from 'models/Pet'
import TextCardInformation from 'components/commons/TextCardInformation'
import styles from './informationPet.scss'

const InformationPet = ({ pet }) => {
  const { t } = useTranslation('profilePets')

  const {
    getLost,
    getUrgent,
    getGender,
    getCategory,
    getBirthday,
    getActivityLevel,
    getEmailUserAdopter,
    getEmailUserTransit,
    getEmailUserShelter,
  } = pet

  return (
    <>
      <div className={styles.info}>
        {getEmailUserAdopter && (
          <TextCardInformation
            value={getEmailUserAdopter}
            text={t('common:userAdopter')}
            icon={<FaUserPlus size={20} />}
          />
        )}
        {getEmailUserShelter && (
          <TextCardInformation
            value={getEmailUserShelter}
            text={t('common:userShelter')}
            icon={<FaUserPlus size={20} />}
          />
        )}
        {getEmailUserTransit && (
          <TextCardInformation
            value={getEmailUserTransit}
            text={t('common:userTransit')}
            icon={<FaUserAstronaut size={20} />}
          />
        )}
        <TextCardInformation
          value={pet.getName}
          text={t('common:name')}
          icon={<FaDog size={20} />}
        />
        <TextCardInformation
          text={t('common:birthday')}
          icon={<FaRegCalendarAlt size={20} />}
          value={moment(getBirthday).format('L')}
        />
        <TextCardInformation
          value={t(getCategory)}
          icon={<FaCat size={20} />}
          text={t('common:category')}
        />
        <TextCardInformation
          value={t(getGender)}
          text={t('common:sex')}
          icon={<FaTransgender size={20} />}
        />
        <TextCardInformation
          value={t(`${getActivityLevel}`)}
          text={t('common:activityLevel')}
          icon={<GiJumpingDog size={20} />}
        />
        <TextCardInformation text={t('lost')} value={getLost} icon={<FaStreetView size={25} />} />
        <TextCardInformation
          text={t('urgent')}
          value={getUrgent}
          icon={<IoIosHelpBuoy size={25} />}
        />
      </div>
    </>
  )
}

InformationPet.propTypes = {
  pet: PropTypes.instanceOf(Pet).isRequired,
}

export default InformationPet
