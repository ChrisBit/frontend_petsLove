import React, { useContext, useCallback, useState } from 'react'
import { AiFillFileAdd } from 'react-icons/ai'
import { FaPeopleCarry } from 'react-icons/fa'
import { observer, useLocalStore } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import DashboardCard from 'components/commons/DashboardCard'
import LayoutContainer from 'components/commons/LayoutContainer'
import Title from 'components/commons/Title/Title'
import ListPets from 'containers/ListPets'
import VeterinaryStore from 'stores/VeterinaryStore'
import UserContext from 'Context/UserContext'
import { LIMIT_LIST } from 'services/config'
import SEO from 'components/SEO'
import { CREATE_PET, SEARCH_PROTECTIONIST } from 'routing/routes'
import styles from './dashboardVeterinary.scss'

const DashboardVeterinary = () => {
  const history = useHistory()
  const [page, setPage] = useState(1)
  const [limit] = useState(LIMIT_LIST)
  const { t } = useTranslation('dashboard')
  const rootStore = useContext(UserContext)
  const { authStore } = rootStore
  const { _id } = authStore.user
  const veterinaryStore = useLocalStore(() => new VeterinaryStore(_id))

  const handleChangePage = useCallback((e, newPage) => {
    veterinaryStore.loadPetsVeterinaryCared(_id, LIMIT_LIST, newPage, '')
    setPage(newPage)
  }, [])

  const handleSearch = useCallback(e => {
    veterinaryStore.loadPetsVeterinaryCared(_id, LIMIT_LIST, page, e.target.value)
  }, [])

  const handleCreatePet = useCallback(() => {
    history.push(CREATE_PET)
  }, [])

  const handleSearchProtecctionist = useCallback(() => {
    history.push(SEARCH_PROTECTIONIST)
  }, [])

  const handleDeletePet = useCallback(idPet => {
    veterinaryStore.removePet(idPet)
  }, [])

  const { petsList, totalPets } = veterinaryStore
  const { totalPetsVeterinaryCared } = veterinaryStore.dashboardStore.dashboard

  return (
    <LayoutContainer>
      <SEO pageTitle={t('dashboard')} />
      <Title mBottom="30px" title={t('dashboard')} />
      <div className={styles.container}>
        <DashboardCard
          titleCard={t('veterinary.totalPets')}
          total={totalPetsVeterinaryCared.value}
        />
        <DashboardCard
          handleClick={handleCreatePet}
          titleCard={t('addPet')}
          icon={<AiFillFileAdd size={25} />}
        />
        <DashboardCard
          icon={<FaPeopleCarry size={22} />}
          titleCard={t('searchShelters')}
          handleClick={handleSearchProtecctionist}
        />
      </div>
      <ListPets
        page={page}
        limit={limit}
        listPets={petsList}
        totalPets={totalPets}
        handleSearch={handleSearch}
        handleDelete={handleDeletePet}
        title={t('veterinary.titlePetsList')}
        handleChangePage={handleChangePage}
      />
    </LayoutContainer>
  )
}

DashboardVeterinary.propTypes = {}

export default observer(DashboardVeterinary)
