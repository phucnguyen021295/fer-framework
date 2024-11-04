import { createPortal } from 'react-dom';
import { useGetElementById } from './hook';
import { GLOBAL_HEADER_MENU_ID } from '@/fe-core/constants';
import Menu from '../components/Menu';

const Horizontal = () => {
  const container = useGetElementById(GLOBAL_HEADER_MENU_ID);

  if (!container) return null;

  return createPortal(<Menu mode="horizontal" />, container);
};

export default Horizontal;
