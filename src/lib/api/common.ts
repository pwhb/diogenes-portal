import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { Collections } from '$lib/consts/db';

export const getMany = async (collectionName: string, query?: string) =>
{
	try
	{
		const url = `${PUBLIC_BACKEND_URL}/api/v1/${collectionName}${query}`;
		const res = await fetch(url);
		const data = await res.json();
		return data;
	} catch (e)
	{
		console.error(e);
		return null;
	}

};

export const getOne = async (collectionName: string, id: string) =>
{
	try
	{
		const url = `${PUBLIC_BACKEND_URL}/api/v1/${collectionName}/${id}`;
		const res = await fetch(url);
		const data = await res.json();
		return data;
	} catch (e)
	{
		console.error(e);
		return null;
	}

};

export const getOneByKey = async (collectionName: string, key: string, keyName: string = "getOneByName") =>
{
	try
	{
		const url = `${PUBLIC_BACKEND_URL}/api/v1/${collectionName}/${keyName}/${key}`;
		const res = await fetch(url);

		const data = await res.json();
		return data;
	} catch (e)
	{
		console.error(e);
		return null;
	}

};

export const createOne = async (collectionName: string, token: string, payload: any) =>
{
	try
	{
		const url = `${PUBLIC_BACKEND_URL}/api/v1/${collectionName}`;
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(payload)
		});
		const data = await res.json();
		return data;
	} catch (e)
	{
		console.error(e);
		return null;
	}

};

export const updateOne = async (
	collectionName: string,
	token: string,
	id: string,
	payload: any
) =>
{
	try
	{
		const url = `${PUBLIC_BACKEND_URL}/api/v1/${collectionName}/${id}`;
		const res = await fetch(url, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(payload)
		});
		const data = await res.json();
		return data;
	} catch (e)
	{
		console.error(e);
		return null;
	}

};

export const replaceOne = async (
	collectionName: string,
	token: string,
	id: string,
	payload: any
) =>
{
	try
	{
		const url = `${PUBLIC_BACKEND_URL}/api/v1/${collectionName}/${id}`;
		const res = await fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(payload)
		});
		const data = await res.json();
		return data;
	} catch (e)
	{
		console.error(e);
		return null;
	}

};


export const deleteOne = async (collectionName: string, id: string, token: string) =>
{
	try
	{
		const url = `${PUBLIC_BACKEND_URL}/api/v1/${collectionName}/${id}`;
		const res = await fetch(url, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		const data = await res.json();
		return data;
	} catch (e)
	{
		console.error(e);
		return null;
	}

};

export const getPermissions = async (token: string) =>
{
	try
	{
		const url = `${PUBLIC_BACKEND_URL}/api/v1/permissions?active=true&sort_by=_id`;
		const res = await fetch(url, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		const data = await res.json();
		return data;
	} catch (e)
	{
		console.error(e);
		return null;
	}

};

export const uploadBulk = async (files: FileList, token: string) =>
{
	try
	{
		const formData = new FormData();
		for (let i = 0; i < files.length; i++)
		{
			const file = files.item(i);
			formData.append('files', file!);
			formData.append('types', file!.type);
		}

		const url = `${PUBLIC_BACKEND_URL}/api/v1/${Collections.uploads}/multiple`;
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`
			},
			body: formData
		});
		const data = await res.json();
		return data;
	} catch (e)
	{
		console.error(e);
		return null;
	}

};
