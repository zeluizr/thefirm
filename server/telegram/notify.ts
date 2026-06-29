import { existsSync } from 'node:fs'

import { InputFile } from 'grammy'

import { runtimeConfig } from '../lib/config'
import { db } from '../lib/db'
import { localMediaPath } from '../lib/storage'
import { getBot } from './bot'
import { buildCaption, mainKeyboard } from './format'

// envia o arquivo local (bytes) se existir; senão cai pra URL
function mediaSource(url: string): InputFile | string {
  const path = localMediaPath(url)
  return existsSync(path) ? new InputFile(path) : url
}

// envia o preview ao chat do admin com os botões de aprovação (CLAUDE.md §5.5)
export async function notifyPost(postId: string): Promise<void> {
  const post = await db.post.findUnique({
    where: { id: postId },
    include: { category: true },
  })
  if (!post) throw new Error(`notifyPost: post ${postId} não existe`)

  const bot = await getBot()
  const { telegramChatId: chatId } = await runtimeConfig()
  if (!chatId) throw new Error('TELEGRAM_CHAT_ID não configurado — defina em /admin/settings')

  const caption = buildCaption(post, post.category.name)
  const reply_markup = mainKeyboard(post.id)

  let messageId: number
  if (post.videoUrl) {
    const sent = await bot.api.sendVideo(chatId, mediaSource(post.videoUrl), {
      caption,
      reply_markup,
    })
    messageId = sent.message_id
  } else if (post.imageUrl) {
    const sent = await bot.api.sendPhoto(chatId, mediaSource(post.imageUrl), {
      caption,
      reply_markup,
    })
    messageId = sent.message_id
  } else {
    const sent = await bot.api.sendMessage(chatId, caption, { reply_markup })
    messageId = sent.message_id
  }

  await db.post.update({
    where: { id: post.id },
    data: { telegramMessageId: String(messageId) },
  })
}
