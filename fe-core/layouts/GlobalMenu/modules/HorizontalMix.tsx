import { createPortal } from 'react-dom';
import { useGetElementById } from './hook';
import { GLOBAL_SIDER_MENU_ID } from '@/fe-core/constants';
import Menu from '../components/Menu';

const HorizontalMix = () => {
  const container = useGetElementById(GLOBAL_SIDER_MENU_ID);

  if (!container) return null;

  return createPortal(<Menu mode="inline" />, container);
};

export default HorizontalMix;
