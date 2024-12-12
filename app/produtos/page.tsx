'use client'
import React from 'react';
import useSWR from 'swr';
import { Product } from 'app/produtos';

export default function Product() {

    const fetcher = (url: string) => fetch(url).then(res => res.json())
    const { data: product, error, isLoading } = useSWR<Product[], Error>('/api/product');
    
    if (error) return <div>Failed to load</div>;
    if (isLoading) return <div>Loading...</div>;
    if (!product) return <div>No data available</div>;

    return <>
        {product.map((municipality) => (
            <MunicipalityCard 
                key={municipality.id} 
                id={municipality.id}
                name={municipality.name}
                district_name={municipality.district_name}
            />
        ))}
    </>
}

