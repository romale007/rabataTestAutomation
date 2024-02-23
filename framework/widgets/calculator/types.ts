export type BaseRates = {
  rabataMobileApi: number;
  azureMobileApi: number;
  amazonMobileApi: number;
  googleMobileApi: number;
};

export type BackupRates = {
  rabataMobile: number;
  azureMobile: number;
  amazonMobile: number;
  googleMobile: number;
};

// export type TestRatesParameters = BaseRates &
//   BackupRates & {
//     dataApiStoredTarget: number;
//     dataDownloadTarget: number;
//     dataStoredTarget: number;
//     backupTariff: boolean;
//   };
export type TestRatesParameters = {
  dataApiStoredTarget?: number;
  dataDownloadTarget?: number;
  dataStoredTarget?: number;
  baseRates?: BaseRates;
  backupRates?: BackupRates;
};
