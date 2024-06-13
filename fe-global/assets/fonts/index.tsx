import { NextFont } from 'next/dist/compiled/@next/font'
import localFont from 'next/font/local'

const saira: NextFont = localFont({
    src: [
      {
        path: './saira/Saira-Regular.woff',
        weight: '400',
        style: 'normal',
      },
      {
        path: './saira/Saira-SemiBold.woff',
        weight: '500',
        style: 'normal',
      },
      {
        path: './saira/Saira-Medium.woff',
        weight: '600',
        style: 'normal',
      },
      {
        path: './saira/Saira-Bold.woff',
        weight: '700',
        style: 'normal',
      },
    ],
  })

  const tomorrow: NextFont = localFont({
    src: [
      {
        path: './tomorrow/Tomorrow-Regular.ttf',
        weight: '400',
        style: 'normal',
      },
      {
        path: './tomorrow/Tomorrow-SemiBold.ttf',
        weight: '500',
        style: 'normal',
      },
      {
        path: './tomorrow/Tomorrow-Medium.ttf',
        weight: '600',
        style: 'normal',
      },
      {
        path: './tomorrow/Tomorrow-Bold.ttf',
        weight: '700',
        style: 'normal',
      },
    ],
  })

  export {saira, tomorrow}