import React from 'react'

export default function ProductCard
({id, district_name, name}: Produto) {
   return <div>{name} ({district_name})</div>
}
