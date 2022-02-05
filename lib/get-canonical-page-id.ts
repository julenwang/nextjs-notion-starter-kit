import { ExtendedRecordMap } from 'notion-types'
import {
  parsePageId,
  getCanonicalPageId as getCanonicalPageIdImpl
} from 'notion-utils'

import { inversePageUrlOverrides } from './config'
import { getPagePath } from './get-page-path'

export function getCanonicalPageId(
  pageId: string,
  recordMap: ExtendedRecordMap,
  { uuid = true }: { uuid?: boolean } = {}
): string | null {
  const cleanPageId = parsePageId(pageId, { uuid: false })
  if (!cleanPageId) {
    return null
  }
  const block = recordMap.block[pageId]
  const path = getPagePath(block.value, recordMap)

  const override = inversePageUrlOverrides[cleanPageId]
  if (path) {
    return path
  } else if (override) {
    return override
  } else {
    return getCanonicalPageIdImpl(pageId, recordMap, {
      uuid
    })
  }
}
