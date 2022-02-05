import * as types from './types'
import { getPageProperty } from 'notion-utils'

export function getPagePath(
  block: types.Block,
  recordMap: types.ExtendedRecordMap
): string | null {
  return getPageProperty('Path', block, recordMap)
}
