import useTheme from 'hooks/useTheme'
import React from 'react'
import Toggle from 'ui-kit/components/Toggle'
const ThemeToggle = (props) => {
    const { theme, isDark, toggleTheme } = useTheme()


    return (
        <Toggle checked={isDark} onChange={toggleTheme} >

        </Toggle>
    )
}

export default ThemeToggle
