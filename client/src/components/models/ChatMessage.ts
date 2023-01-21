export type ChatMessageKind = 'Question' | 'Answer';

export interface ChatMessage {
    fromUserId: string,
    text: string,
    messageKind: ChatMessageKind
}

export const ALL_THE_MESSAGES: ChatMessage[] = [
    { fromUserId: '11111', messageKind: "Question", text: 'What is your name ?'},
    { fromUserId: '22222', messageKind: "Answer", text: 'My name is Dambo'}
]
