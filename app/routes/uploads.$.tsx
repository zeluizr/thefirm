import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { basename, extname, join } from 'node:path'
import { Readable } from 'node:stream'

import { env } from '@server/lib/env'
import type { Route } from './+types/uploads.$'

// serve a mídia gerada a partir de MEDIA_DIR (o react-router-serve não serve
// arquivos escritos em runtime). path = MEDIA_PUBLIC_PATH (/uploads por padrão).
const MIME: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.mp4': 'video/mp4',
}

// parse de "bytes=start-end" (fim inclusive, semântica HTTP), clampando ao
// tamanho do arquivo. devolve null se o header é ausente/inválido/insatisfatível.
function parseRange(
  header: string | null,
  size: number,
): { start: number; end: number } | null {
  if (!header) return null
  const m = /^bytes=(\d*)-(\d*)$/.exec(header.trim())
  if (!m) return null
  const [, rawStart, rawEnd] = m
  if (rawStart === '' && rawEnd === '') return null

  let start: number
  let end: number
  if (rawStart === '') {
    // sufixo: últimos N bytes (ex.: "bytes=-500")
    const suffix = Number(rawEnd)
    if (suffix <= 0) return null
    start = Math.max(0, size - suffix)
    end = size - 1
  } else {
    start = Number(rawStart)
    end = rawEnd === '' ? size - 1 : Math.min(Number(rawEnd), size - 1)
  }

  if (!Number.isFinite(start) || !Number.isFinite(end)) return null
  if (start > end || start >= size) return null
  return { start, end }
}

function toWebStream(nodeStream: Readable): ReadableStream {
  return Readable.toWeb(nodeStream) as unknown as ReadableStream
}

export async function loader({ request, params }: Route.LoaderArgs) {
  const name = basename(params['*'] ?? '') // basename evita path traversal
  if (!name) throw new Response('not found', { status: 404 })

  const filePath = join(env.MEDIA_DIR, name)
  let size: number
  try {
    const info = await stat(filePath)
    if (!info.isFile()) throw new Error('not a file')
    size = info.size
  } catch {
    throw new Response('not found', { status: 404 })
  }

  const contentType = MIME[extname(name).toLowerCase()] ?? 'application/octet-stream'
  const cacheControl = 'public, max-age=31536000, immutable'
  const rangeHeader = request.headers.get('range')

  // sem Range → arquivo inteiro, mas anuncia `accept-ranges` para que o <video>
  // do Safari/iOS aceite tocar (ele exige resposta parcial 206 para reproduzir/buscar)
  if (!rangeHeader) {
    return new Response(toWebStream(createReadStream(filePath)), {
      headers: {
        'content-type': contentType,
        'content-length': String(size),
        'accept-ranges': 'bytes',
        'cache-control': cacheControl,
      },
    })
  }

  const range = parseRange(rangeHeader, size)
  if (!range) {
    // Range presente mas insatisfatível → 416 com o tamanho total
    return new Response('range not satisfiable', {
      status: 416,
      headers: { 'content-range': `bytes */${size}`, 'accept-ranges': 'bytes' },
    })
  }

  const { start, end } = range
  return new Response(toWebStream(createReadStream(filePath, { start, end })), {
    status: 206,
    headers: {
      'content-type': contentType,
      'content-length': String(end - start + 1),
      'content-range': `bytes ${start}-${end}/${size}`,
      'accept-ranges': 'bytes',
      'cache-control': cacheControl,
    },
  })
}
