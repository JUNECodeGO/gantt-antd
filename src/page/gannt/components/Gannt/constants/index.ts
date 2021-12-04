export enum ViewMode {
  DAY = 1,
  WEEK = 2,
  MONTH = 3,
}
const common = {
  headerHeight: 50,
  viewModes: [...Object.values(ViewMode)],
  barHeight: 20,
  barCornerRadius: 3,
  padding: 18,
  viewMode: 'Day',
  dateFormat: 'YYYY-MM-DD',
  popupTrigger: 'click',
  customPopupHtml: null,
}

const defaultType = ViewMode.DAY

export const defaultOptions = {
  [ViewMode.DAY]: {
    ...common,
    columnWidth: 40,
    step: 24,
  },
  [ViewMode.WEEK]: {
    ...common,
    columnWidth: 24 * 2,
    step: 140,
  },
  [ViewMode.MONTH]: {
    ...common,
    columnWidth: 24 * 30,
    step: 120,
  },
}[defaultType]
