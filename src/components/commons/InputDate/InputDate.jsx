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
import * as moment from 'moment'
import styles from './inputDate.scss'

const InputDate = ({ label, handleDateChange, value, size, inputStore, isEdit }) => {
  const [selectedDate, setSelectedDate] = useState(value || null)
  const { t } = useTranslation()

  useEffect(() => {
    handleDateChange(selectedDate)
  }, [selectedDate])

  const noValueSelected = selectedDate === null
  const formattedValue = noValueSelected && value ? moment(value).format('L') : null
  const showValue = isEdit ? formattedValue : null

  return (
    <>
      {label && <Label text={label} />}
      <div
        className={c(styles.containerDate, styles.myDatePickerWrapper)}
        style={{ width: size ? `${size} px` : '100%' }}
      >
        <DatePicker
          value={showValue}
          showYearDropdown
          dateFormat="dd/MM/yyyy"
          selected={selectedDate}
          className={styles.input}
          onChange={date => setSelectedDate(date)}
        />
        <BiCalendarHeart aria-hidden size={20} className={c(styles.styleIconInputDate)} />
      </div>
      {inputStore && <div className={styles.errorMessage}>{t(`${inputStore.errorMessage}`)}</div>}
    </>
  )
}

InputDate.propTypes = {
  handleDateChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
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
