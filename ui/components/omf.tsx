import React from 'react'
import { useSettingsQuery } from '../graphql/query/settings.query'
import scss from './omf.module.scss'

export const Omf: React.FC = () => {
  const { data, loading } = useSettingsQuery()

  if (loading || (data && data.hideContrib.value)) {
    return null
  }

  return (
    <a className={scss.badge} href="https://mlrit.ac.in" target={'_blank'} rel={'noreferrer'}>
      <span>MLRIT</span>
      <span>MLR Forms</span>
    </a>
  )
}
