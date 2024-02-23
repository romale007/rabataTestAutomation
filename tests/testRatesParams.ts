import { TestRatesParameters } from '../framework/widgets/calculator/types';

export const testRatesParams: ({ name: string } & {
  use: TestRatesParameters;
})[] = [
  {
    name: 'Check base tariff: Minimal rates',
    use: {
      dataApiStoredTarget: 1,
      dataDownloadTarget: 1,
      baseRates: {
        rabataMobileApi: 360,
        azureMobileApi: 504,
        amazonMobileApi: 600,
        googleMobileApi: 744,
      },
    },
  },
  {
    name: 'Check base tariff: Max rates',
    use: {
      dataApiStoredTarget: 1000,
      dataDownloadTarget: 1000,
      baseRates: {
        amazonMobileApi: 600000,
        azureMobileApi: 504000,
        googleMobileApi: 744000,
        rabataMobileApi: 360000,
      },
    },
  },
  {
    name: 'Check base tariff: Stored Data = 50%, Downloaded data = 1',
    use: {
      dataApiStoredTarget: 500,
      dataDownloadTarget: 1,
      baseRates: {
        rabataMobileApi: 90180,
        azureMobileApi: 126252,
        amazonMobileApi: 150300,
        googleMobileApi: 186372,
      },
    },
  },
  {
    name: 'Check base tariff: Stored Data = 1000, Downloaded data = 50%',
    use: {
      dataApiStoredTarget: 1000,
      dataDownloadTarget: 500,
      baseRates: {
        rabataMobileApi: 270000,
        azureMobileApi: 378000,
        amazonMobileApi: 450000,
        googleMobileApi: 558000,
      },
    },
  },
  {
    name: 'Check backup tariff: Minimal rates',
    use: {
      dataStoredTarget: 1,
      backupRates: {
        rabataMobile: 708,
        azureMobile: 2496,
        amazonMobile: 3120,
        googleMobile: 2760,
      },
    },
  },

  {
    name: 'Check backup tariff: Max rates',
    use: {
      dataStoredTarget: 1000,
      backupRates: {
        rabataMobile: 70800,
        azureMobile: 249600,
        amazonMobile: 312000,
        googleMobile: 276000,
      },
    },
  },

  {
    name: 'Check backup tariff: 50% rates',
    use: {
      dataStoredTarget: 500,
      backupRates: {
        rabataMobile: 35400,
        azureMobile: 124800,
        amazonMobile: 156000,
        googleMobile: 138000,
      },
    },
  },
];
