export interface ComicRoot {
  code: string;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  data: ComicData;
  etag: string;
}

export interface ComicData {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: Result[];
}

export interface Result {
  id: number;
  digitalId: string;
  title: string;
  issueNumber: string;
  variantDescription: string;
  description: string;
  modified: string;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: string;
  textObjects: TextObject[];
  resourceURI: string;
  urls: Url[];
  series: Series;
  variants: Variant[];
  collections: Collection[];
  collectedIssues: CollectedIssue[];
  dates: Date[];
  prices: Price[];
  thumbnail: Thumbnail;
  images: Image[];
  creators: Creators;
  characters: Characters;
  stories: Stories;
  events: Events;
}

export interface TextObject {
  type: string;
  language: string;
  text: string;
}

export interface Url {
  type: string;
  url: string;
}

export interface Series {
  resourceURI: string;
  name: string;
}

export interface Variant {
  resourceURI: string;
  name: string;
}

export interface Collection {
  resourceURI: string;
  name: string;
}

export interface CollectedIssue {
  resourceURI: string;
  name: string;
}

export interface Date {
  type: string;
  date: string;
}

export interface Price {
  type: string;
  price: string;
}

export interface Thumbnail {
  path: string;
  extension: string;
}

export interface Image {
  path: string;
  extension: string;
}

export interface Creators {
  available: string;
  returned: string;
  collectionURI: string;
  items: Item[];
}

export interface Item {
  resourceURI: string;
  name: string;
  role: string;
}

export interface Characters {
  available: string;
  returned: string;
  collectionURI: string;
  items: Item2[];
}

export interface Item2 {
  resourceURI: string;
  name: string;
  role: string;
}

export interface Stories {
  available: string;
  returned: string;
  collectionURI: string;
  items: Item3[];
}

export interface Item3 {
  resourceURI: string;
  name: string;
  type: string;
}

export interface Events {
  available: string;
  returned: string;
  collectionURI: string;
  items: Item4[];
}

export interface Item4 {
  resourceURI: string;
  name: string;
}

export interface CharacterRoot {
  code: string;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  data: CharData;
  etag: string;
}

export interface CharData {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: CharResult[];
}

export interface CharResult {
  id: number;
  name: string;
  description: string;
  modified: string;
  resourceURI: string;
  urls: Url[];
  thumbnail: Thumbnail;
  comics: Comics;
  stories: Stories;
  events: Events;
  series: Series;
}

export interface Comics {
  available: string;
  returned: string;
  collectionURI: string;
  items: CharItem[];
}

export interface CharItem {
  resourceURI: string;
  name: string;
}

export interface CharStories {
  available: string;
  returned: string;
  collectionURI: string;
  items: CharItem2[];
}

export interface CharItem2 {
  resourceURI: string;
  name: string;
  type: string;
}

export interface CharSeries {
  available: string;
  returned: string;
  collectionURI: string;
  items: Item4[];
}
