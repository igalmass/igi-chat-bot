export type ChatMessageKind = 'Question' | 'Answer' | 'Robin Encouragement';

export interface ChatMessage {
    userId: string,
    text: string,
    messageKind?: ChatMessageKind
}

