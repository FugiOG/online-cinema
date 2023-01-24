import axios, { axiosClassic } from 'api/interceptors'

import { IGenreEditInput } from '@/components/screens/admin/genre/genre-edit.interface'
import { ICollection } from '@/components/screens/collections/Collections.interface'

import { IGenre } from '@/shared/types/movie.types'

import { getGenresUrl } from '@/config/api.config'

export const GenreService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IGenre[]>(getGenresUrl(''), {
			params: searchTerm
				? {
						searchTerm,
				  }
				: {},
		})
	},
	async create() {
		return axios.post<string>(getGenresUrl(`/`))
	},
	async getById(_id?: string) {
		return axios.get<IGenreEditInput>(getGenresUrl(`/${_id}`))
	},
	async getCollections() {
		return axiosClassic.get<ICollection[]>(getGenresUrl(`/collections`))
	},
	async getBySlug(slug: string) {
		return axiosClassic.get<IGenre>(getGenresUrl(`/by-slug/${slug}`))
	},
	async update(_id: string, data: IGenreEditInput) {
		return axios.put<string>(getGenresUrl(`/${_id}`), data)
	},
	async deleteGenre(_id: string) {
		return axios.delete<string>(getGenresUrl(`/${_id}`))
	},
}
