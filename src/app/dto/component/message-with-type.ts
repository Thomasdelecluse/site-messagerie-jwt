export default interface MessageWithType {
  id: number,
  author: string,
  destination: string,
  date: string,
  message: string,
  type: 'received' | 'sent'
}
