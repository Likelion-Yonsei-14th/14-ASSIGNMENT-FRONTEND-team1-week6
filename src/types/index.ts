export type PostMode = 'regular' | 'irregular'
export type VehicleType = '자동차' | '경운기' | '트럭' | '오토바이' | '자전거'
export type JobCategory = '농사도우미' | '강아지산책' | '심부름' | '청소' | '돌봄' | '배달' | '카페/서빙' | '기타'

export interface Author {
  id: string
  name: string
  avatar: string
  rating: number
  reviewCount: number
  neighborhood: string
}

export interface RidePost {
  id: string
  type: 'ride'
  mode: PostMode
  title: string
  from: string
  to: string
  date: string
  time: string
  seats: number
  seatsLeft: number
  vehicle: VehicleType
  isDriver: boolean
  price: number
  tags: string[]
  description: string
  author: Author
  createdAt: string
  thumbColor: string
  thumbEmoji: string
}

export interface JobPost {
  id: string
  type: 'job'
  mode: PostMode
  title: string
  location: string
  date: string
  time: string
  duration: string
  pay: number
  payUnit: '시간' | '일' | '건' | '월'
  category: JobCategory
  tags: string[]
  description: string
  author: Author
  createdAt: string
  thumbColor: string
  thumbEmoji: string
  applicants: Author[]
}

export type Post = RidePost | JobPost
