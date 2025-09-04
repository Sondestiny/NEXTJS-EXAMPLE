'use client';
import { ReactNode, useMemo, useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from '@/_theme/theme';
import EmotionRegistry from './EmotionRegistry';

export default function ThemeRegistry ( {children} : {children: ReactNode}) {
    const [mode, setMode] = useState <'light' | 'dark'> ('light'); // xet state cho mode light vaf dark
    const theme = useMemo(
        () => (mode === 'light' ? lightTheme : darkTheme),
        [mode]
    );
    function toggleTheme(){
        setMode(mode === "light" ? "dark" : 'light' )
    }
    return (
      <EmotionRegistry>
            <ThemeProvider  theme={theme} >
              <CssBaseline />
              <button
                onClick={()=> {toggleTheme}}
                style={{
                  position: 'fixed',
                  top: 16,
                  right: 16,
                  padding: '6px 12px',
                  borderRadius: 4,
                  background: theme.palette.primary.main,
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                }}>
                {mode === 'light' ? 'Dark' : 'Light'}
              </button>
              {children}
        </ThemeProvider>
      </EmotionRegistry>
  );
}