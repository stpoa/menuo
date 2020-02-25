import React, { FC } from 'react'
import { Language, setActiveLanguage } from 'react-localize-redux'
import { connect } from 'react-redux'
import { RootState } from '../../../store/store'
import { Fab } from '@material-ui/core'

export interface LanguageToggleOwnProps {
  className: string
}

export interface LanguageToggleStateProps {
  languages: [Language, Language]
}

export interface LanguageToggleDispatchProps {
  setActiveLanguage: (languageCode: string) => void
}

export interface LanguageToggleProps
  extends LanguageToggleStateProps,
    LanguageToggleDispatchProps,
    LanguageToggleOwnProps {}

export const LanguageToggle: FC<LanguageToggleProps> = ({
  languages,
  setActiveLanguage,
  className,
}) => {
  const [_activeLanguage, otherLanguage] = languages[0].active
    ? languages
    : [...languages].reverse()

  return (
    <Fab
      {...{ onClick: () => setActiveLanguage(otherLanguage.code), className }}
      aria-label="cart"
    >
      {otherLanguage.code}
    </Fab>
  )
}

const connectComponent = connect<
  LanguageToggleStateProps,
  LanguageToggleDispatchProps,
  {},
  RootState
>(
  state => ({
    languages: state.user.locale.languages as [Language, Language],
  }),
  dispatch => ({
    setActiveLanguage: lang => dispatch(setActiveLanguage(lang)),
  }),
)

export default connectComponent(LanguageToggle)
