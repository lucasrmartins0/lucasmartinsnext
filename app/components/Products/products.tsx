import React from 'react'
import { Product } from '@/app/models/interfaces'

export default function ProductCard
({id, name}: Product) {
   return <div>{name} ({id})</div>
}
