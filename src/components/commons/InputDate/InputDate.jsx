import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import c from 'classnames'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Label from 'components/commons/Label'
import { BiCalendarHeart } from 'react-icons/bi'
import InputStore from 'stores/InputStore'
import { useTranslation } from 'react-i18next'
import styles from './inputDate.scss'

const InputDate = ({ label, handleDateChange, value, size, inputStore }) => {
  const [selectedDate, handleDate] = useState(null)
  const { t } = useTranslation()

  useEffect(() => {
    handleDateChange(selectedDate)
  }, [selectedDate])

  return (
    <>
      {label && <Label text={label} />}
      <div
        className={c(styles.containerDate, styles.myDatePickerWrapper)}
        style={{ width: size ? `${size} px` : '100%' }}
      >
        <DatePicker
          showYearDropdown
          isClearable
          dateFormat="dd/MM/yyyy"
          selected={value}
          className={styles.input}
          onChange={date => handleDate(date)}
        />
        <BiCalendarHeart aria-hidden size={20} className={c(styles.styleIconInputDate)} />
      </div>
      {inputStore && <div className={styles.errorMessage}>{t(`${inputStore.errorMessage}`)}</div>}
    </>
  )
}

InputDate.propTypes = {
  handleDateChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  size: PropTypes.number,
  inputStore: PropTypes.instanceOf(InputStore),
}

InputDate.defaultProps = {
  value: null,
  label: '',
  size: 0,
  inputStore: null,
}

export default observer(InputDate)
