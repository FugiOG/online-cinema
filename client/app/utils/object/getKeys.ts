export const getKeys = <T>(obj: T) =>
	Object.keys(obj as object) as Array<keyof T>
