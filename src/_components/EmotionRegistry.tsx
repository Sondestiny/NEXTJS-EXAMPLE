'use client';

import { CacheProvider } from '@emotion/react';
import { ReactNode } from 'react';
import createEmotionCache from '@/_utils/createEmotionCache';
const clientSideEmotionCache = createEmotionCache();

export default function EmotionRegistry({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      {children}
    </CacheProvider>
  );
}
