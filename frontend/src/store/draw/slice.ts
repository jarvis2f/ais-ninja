import {create} from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'
import {ImagesInfo, StabilityImageInfo} from '@/types'

export interface DrawState {
	// 历史绘画数据
	historyDrawImages: Array<ImagesInfo>
	// 清除历史绘画数据
	clearhistoryDrawImages: () => void
	// 新增绘画数据
	addDrawImage: (images: Array<ImagesInfo>) => void

	stabilityImages: Array<StabilityImageInfo>
	deleteStabilityImage: (id: string, index?: number) => void
	addStabilityImage: (image: StabilityImageInfo) => void
	updateStabilityImage: (image: StabilityImageInfo) => void
}

const drawStore = create<DrawState>()(
	persist(
		(set, get) => ({
			historyDrawImages: [],
			clearhistoryDrawImages: () => set({historyDrawImages: []}),
			addDrawImage: (images) =>
				set((state: DrawState) => {
					const newData = [...state.historyDrawImages, ...images]
					return {
						historyDrawImages: [...newData]
					}
				}),
			stabilityImages: [],
			deleteStabilityImage: (id, index?: number) =>
				set((state: DrawState) => {
					const newData = state.stabilityImages
						.filter((item) => (index && index >= 0) || item.id !== id)
						.map((item, index) => {
							if (item.id !== id) {
								return item
							} else {
								return {
									...item,
									images: item.images?.filter((_, i) => i !== index)
								}
							}
						});
					return {
						stabilityImages: [...newData]
					}
				}),
			addStabilityImage: (image) =>
				set((state: DrawState) => {
					const newData = [image, ...state.stabilityImages]
					return {
						stabilityImages: [...newData]
					}
				}),
			updateStabilityImage: (image) =>
				set((state: DrawState) => {
					const newData = state.stabilityImages.map((item) => {
						if (item.id === image.id) {
							return image
						}
						return item
					})
					return {
						stabilityImages: [...newData]
					}
				})
		}),
		{
			name: 'draw_storage', // name of item in the storage (must be unique)
			storage: createJSONStorage(() => localStorage) // (optional) by default the 'localStorage' is used
		}
	)
)

export default drawStore
