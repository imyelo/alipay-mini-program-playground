/**
 * fetch from https://mp.weixin.qq.com/debug/wxadoc/dev/api/
 */

export const PATTERN = {
  ASYNC: Symbol('ASYNC'),
  EVENT: Symbol('EVENT'),
  SYNC: Symbol('SYNC'),
  MODULE: Symbol('MODULE'),
  OBJECT: Symbol('OBJECT'),
  VARIABLE: Symbol('VARIABLE'),
}

export const APIS = {
  my: {
    scan: {
      pattern: PATTERN.ASYNC,
    },
    showLoading: {
      pattern: PATTERN.ASYNC,
    },
    hideLoading: {
      pattern: PATTERN.SYNC,
    },
    navigateTo: {
      pattern: PATTERN.ASYNC,
    },
    navigateBack: {
      pattern: PATTERN.SYNC,
    },
  },
}
