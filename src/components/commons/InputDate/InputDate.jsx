import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import c from 'classnames'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Label from 'components/commons/Label'
import { BiCalendarHeart } from 'react-icons/bi'
import moment from 'moment'
import styles from './inputDate.scss'

const InputDate = ({ label, handleDateChange, value, size }) => {
  const [selectedDate, handleDate] = useState(null)

  const CustomInput = React.forwardRef((props, ref) => (
    <button ref={ref} type="button" className={styles.input} onClick={props.onClick}>
      {props.value}
    </button>
  ))

  useEffect(() => {
    // If no Date is selected null, use value. If the result is empty string use null.
    handleDateChange(selectedDate || value || null)
  }, [selectedDate])

  return (
    <>
      {label && <Label text={label} />}
      <div
        className={c(styles.containerDate, styles.myDatePickerWrapper)}
        style={{ width: size ? `${size} px` : '100%' }}
      >
        <DatePicker
          value={value ? moment(value).format('L') : ''}
          showYearDropdown
          dateFormat="dd/MM/yyyy"
          selected={selectedDate}
          customInput={React.cloneElement(<CustomInput />)}
          onChange={date => handleDate(date)}
        />
        <BiCalendarHeart size={20} className={c(styles.styleIconInputDate)} />
      </div>
    </>
  )
}

InputDate.propTypes = {
  label: PropTypes.string,
  size: PropTypes.number,
  handleDateChange: PropTypes.func.isRequired,
}

InputDate.defaultProps = {
  label: '',
  size: 0,
}

export default observer(InputDate)
