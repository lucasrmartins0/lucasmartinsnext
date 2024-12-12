import React from 'react';
import { City } from '../models/interfaces';
import useSWR from 'swr';

'use client'

export default function City() {

    const fetcher = (url: string) => fetch(url).then(res => res.json())
    const { data: city, error, isLoading } = useSWR<City[], Error>('/api/city');
    
    if (error) return <div>Failed to load</div>;
    if (isLoading) return <div>Loading...</div>;
    if (!city) return <div>No data available</div>;

    return <>
        {city.map((city) => (
            <cityCard 
                key={city.id} 
                id={city.id}
                name={city.name}
                district_name={city.district_name}
            />
        ))}
    </>
}
