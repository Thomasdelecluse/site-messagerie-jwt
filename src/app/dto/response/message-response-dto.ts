export default interface MessageResponseDto {
  messages: {
    id: number,
    author: string,
    destination: string,
    date: string,
    message: string
  }[]
}
