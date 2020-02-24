import React, { FC } from 'react'
import { Language, setActiveLanguage } from 'react-localize-redux'
import { connect } from 'react-redux'
import { RootState } from '../../../store/store'

export interface LanguageToggleStateProps {
  languages: Language[]
  activeLanguage: Language
}

export interface LanguageToggleDispatchProps {
  setActiveLanguage: (languageCode: string) => void
}

export interface LanguageToggleProps
  extends LanguageToggleStateProps,
    LanguageToggleDispatchProps {}

export const LanguageToggle: FC<LanguageToggleProps> = ({
  languages,
  activeLanguage,
  setActiveLanguage,
}) => (
  <div>
    {languages.map(lang => (
      <span key={lang.code}>
        <button onClick={() => setActiveLanguage(lang.code)}>
          {lang.code}
        </button>
      </span>
    ))}
  </div>
)

const connectComponent = connect<
  LanguageToggleStateProps,
  LanguageToggleDispatchProps,
  {},
  RootState
>(
  state => ({
    languages: state.user.locale.languages,
    activeLanguage: state.user.locale.languages.find(l => l.active)!,
  }),
  dispatch => ({
    setActiveLanguage: lang => dispatch(setActiveLanguage(lang)),
  }),
)

export default connectComponent(LanguageToggle)