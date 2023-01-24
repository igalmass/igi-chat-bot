export type ChatMessageKind = 'Question' | 'Answer' | '"Robin Encouragement"';

export interface ChatMessage {
    userId: string,
    text: string,
    messageKind?: ChatMessageKind
}
//
// export const ALL_THE_MESSAGES: ChatMessage[] = [
//     { userId: '11111', messageKind: "Question", text: 'What is your name ?'},
//     { userId: '22222', messageKind: "Answer", text: 'My name is Dambo'}
// ]
