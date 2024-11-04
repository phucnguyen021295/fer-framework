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

  const open_sans: NextFont = localFont({
    src: [
        {
            path: "./open-sans/OpenSans-Light.ttf",
            weight: "100",
            style: "normal",
        },
        {
            path: "./open-sans/OpenSans-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "./open-sans/OpenSans-Semibold.ttf",
            weight: "500",
            style: "normal",
        },
        {
            path: "./open-sans/OpenSans-Bold.ttf",
            weight: "600",
            style: "normal",
        },
        {
            path: "./open-sans/OpenSans-ExtraBold.ttf",
            weight: "700",
            style: "normal",
        },
    ],
});

const inter: NextFont = localFont({
  src: [
      {
          path: "./inter/Inter-Light.ttf",
          weight: "100",
          style: "normal",
      },
      {
          path: "./inter/Inter-Regular.ttf",
          weight: "400",
          style: "normal",
      },
      {
          path: "./inter/Inter-SemiBold.ttf",
          weight: "500",
          style: "normal",
      },
      {
          path: "./inter/Inter-Bold.ttf",
          weight: "600",
          style: "normal",
      },
      {
          path: "./inter/Inter-ExtraBold.ttf",
          weight: "700",
          style: "normal",
      },
  ],
});

  export {saira, tomorrow, inter, open_sans}