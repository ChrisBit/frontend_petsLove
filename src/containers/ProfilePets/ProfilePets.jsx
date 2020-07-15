import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useLocalStore, observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import PetIdStore from 'stores/PetIdStore'
import LayoutContainer from 'components/commons/LayoutContainer'
import GaleryImages from 'components/commons/GaleryImages'
import ErrorMessage from 'components/commons/ErrorMessage'
import LayoutProfilePets from 'components/LayoutProfilePets'

const ProfilePets = () => {
  const petIdStore = useLocalStore(() => new PetIdStore())
  const { t } = useTranslation('profilePets')
  const { id } = useParams()

  useEffect(() => {
    petIdStore.getPetId(id)
  }, [])
  
  return (
    <LayoutContainer>
      <Link
        to={`/profile-user/${petIdStore.pet.userCreator.value && petIdStore.pet.getUserCreatorId}`}
      >
        {t('linkBack')}
      </Link>
      <LayoutProfilePets store={petIdStore} />
      {petIdStore.filenames.value !== [] ? (
        <GaleryImages isLoading={petIdStore.isLoading} store={petIdStore} />
      ) : (
        <ErrorMessage text={t('notImage')} typeMessage="warning" />
      )}
    </LayoutContainer>
  )
}

export default observer(ProfilePets)
