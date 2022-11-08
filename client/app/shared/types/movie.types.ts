import { TypeMaterialIconName } from './icon.type'

export interface IGenre {
	_id: string
	name: string
	slug: string
	description: string
	icon: TypeMaterialIconName
}

export interface Parameters {
	year: number
	duration: number
	country: string
}

export interface IActor {
	_id: string
	name: string
	slug: string
	photo: string
	countMovies: number
}

export interface IMovie {
	_id: string
	poster: string
	bigPoster: string
	title: string
	slug: string
	parameters: Parameters
	rating: number
	countOpened: number
	videoUrl: string
	genres: IGenre[]
	actors: IActor[]
}
