import map from 'map-obj'
import globals from '@/libraries/globals'
import promisify from './promisify'
import { APIS, PATTERN } from './officals'

function mapPatterns (original, rules) {
  return map(rules, (name, { pattern, moduleName }) => {
    switch (pattern) {
      case PATTERN.VARIABLE:
      case PATTERN.SYNC:
      case PATTERN.EVENT:
        return [name, original[name]]

      case PATTERN.ASYNC:
        return [name, promisify(original[name])]

      case PATTERN.MODULE:
        return [name, function () {
          const instance = original[name].apply(this, arguments)
          return mapPatterns(instance, APIS[moduleName])
        }]

      case PATTERN.OBJECT:
        return [name, function () {
          const instance = original[name]
          return mapPatterns(instance, APIS[moduleName])
        }()]

      default:
        throw new Error('Invalid pattern.')
    }
  })
}

const io = mapPatterns(globals.my, APIS.my)

export default io
