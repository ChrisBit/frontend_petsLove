import React from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import c from 'classnames'
import { useTranslation } from 'react-i18next'
import Switch from 'react-input-switch'
import useMediaQuery from 'utils/Hooks'
import styles from './inputCheckbox.scss'

const InputCheckbox = ({ isEdit, text, handleChange, value }) => {
  const { t } = useTranslation()
  const mediaQuery = useMediaQuery('(max-width: 500px)')

  return (
    <>
      {isEdit && (
        <div onClick={handleChange} className={styles.container}>
          <div>
            <label className={styles.labelSwitch}>{text}</label>
          </div>
          <div className={styles.containerSwitch}>
            <div className={styles.switch}>
              <Switch
                styles={{
                  track: {
                    borderRadius: '50px',
                    width: mediaQuery ? '35px' : '40px',
                    height: mediaQuery ? '18.5px' : '22px',
                    backgroundColor: 'rgba(146, 154, 230, 0.30)',
                  },
                  trackChecked: {
                    backgroundColor: 'rgba(146, 154, 230, 0.30)',
                  },
                  button: {
                    width: mediaQuery ? '13px' : '16px',
                    height: mediaQuery ? '13px' : '16px',
                    backgroundColor: '#5E92F3',
                    top: '3px',
                  },
                  buttonChecked: {
                    left: mediaQuery ? '20px' : '22px',
                    backgroundColor: '#EE6293',
                  },
                }}
                on="yes"
                off="no"
                value={value ? 'yes' : 'no'}
              />
            </div>
            <div className={styles.containerAnswer}>
              <div className={c(styles.answer, value && styles.isYes)}>
                {value ? t('yes') : t('no')}
              </div>
            </div>
          </div>
        </div>
      )}
      {isEdit === false && (
        <>
          {value ? (
            <div className={styles.valueAndLabel}>
              <label className={styles.label}>{text}</label>
              <div className={styles.value}>{t('yes')}</div>
            </div>
          ) : (
            <div className={styles.valueAndLabel}>
              <div>
                <label className={styles.label}>{text}</label>
              </div>
              <div>
                <div className={styles.value}>{t('no')}</div>
              </div>
              <div className={styles.lineLabel} />
            </div>
          )}
        </>
      )}
    </>
  )
}

InputCheckbox.propTypes = {
  value: PropTypes.bool,
  isEdit: PropTypes.bool,
  text: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
}

InputCheckbox.defaultProps = {
  text: '',
  value: false,
  isEdit: false,
}

export default observer(InputCheckbox)
