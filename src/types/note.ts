export type Note = {
  id: string
  date: string
  title: string
  description: string
  category: 'personal' | 'work' | 'study'
}