'use client';

import { ReactNode } from 'react';

interface SectionTransitionProps {
  children: ReactNode;
}

export default function SectionTransition({ children }: SectionTransitionProps) {
  return <>{children}</>;
}
