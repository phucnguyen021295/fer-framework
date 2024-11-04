import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// Selectors
import { appSelector } from '@/fe-core/reducers/app';

export function useGetElementById(id: string) {
  const [container, setContainers] = useState<HTMLElement | null>();

  const isMobile = useSelector(appSelector.getIsMobile);

  useEffect(() => {
    const element = document.getElementById(id);

    setContainers(element);
  }, [isMobile]);

  return container;
}
