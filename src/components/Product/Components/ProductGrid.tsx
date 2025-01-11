'use client'

import React from 'react'
import Image from 'next/image'
import { ProductType } from '@/type/ProductType'
import { useRouter } from 'next/navigation'

interface ProductProps {
    data: ProductType
}

const ProductGrid: React.FC<ProductProps> = ({ data }) => {
    const router = useRouter()

    const handleDetailProduct = (productId: string) => {
        router.push(`/product/default?id=${productId}`)
    }

    const percentSale = Math.floor(100 - (data.price / data.originPrice) * 100)
    const percentSold = Math.floor((data.sold / data.quantity) * 100)

    return (
        <div className="product-item grid-type">
            <div
                onClick={() => handleDetailProduct(data.id)}
                className="product-main cursor-pointer block"
            >
                <ProductImage images={data.thumbImage} name={data.name} />
                <ProductInfo
                    name={data.name}
                    price={data.price}
                    originPrice={data.originPrice}
                    percentSale={percentSale}
                    sold={data.sold}
                    available={data.quantity - data.sold}
                    percentSold={percentSold}
                />
            </div>
        </div>
    )
}

interface ProductImageProps {
    images: string[]
    name: string
}

const ProductImage: React.FC<ProductImageProps> = ({ images, name }) => (
    <div className="product-thumb bg-white relative overflow-hidden rounded-2xl">
        <div className="product-img w-full h-full aspect-[3/4]">
            {images.map((img, index) => (
                <Image
                    key={index}
                    src={img}
                    width={500}
                    height={500}
                    priority={true}
                    alt={name}
                    className="w-full h-full object-cover duration-700"
                />
            ))}
        </div>
    </div>
)

interface ProductInfoProps {
    name: string
    price: number
    originPrice: number
    percentSale: number
    sold: number
    available: number
    percentSold: number
}

const ProductInfo: React.FC<ProductInfoProps> = ({
    name,
    price,
    originPrice,
    percentSale,
    sold,
    available,
    percentSold,
}) => (
    <div className="product-infor mt-4 lg:mb-7">
        <ProductProgress percentSold={percentSold} sold={sold} available={available} />
        <div className="product-name text-title duration-300">{name}</div>
        <ProductPrice
            price={price}
            originPrice={originPrice}
            percentSale={percentSale}
        />
    </div>
)

interface ProductProgressProps {
    percentSold: number
    sold: number
    available: number
}

const ProductProgress: React.FC<ProductProgressProps> = ({
    percentSold,
    sold,
    available,
}) => (
    <div className="product-sold sm:pb-4 pb-2">
        <div className="progress bg-line h-1.5 w-full rounded-full overflow-hidden relative">
            <div
                className="progress-sold bg-red absolute left-0 top-0 h-full"
                style={{ width: `${percentSold}%` }}
            />
        </div>
        <div className="flex items-center justify-between gap-3 gap-y-1 flex-wrap mt-2">
            <div className="text-button-uppercase">
                <span className="text-secondary2 max-sm:text-xs">Sold: </span>
                <span className="max-sm:text-xs">{sold}</span>
            </div>
            <div className="text-button-uppercase">
                <span className="text-secondary2 max-sm:text-xs">Available: </span>
                <span className="max-sm:text-xs">{available}</span>
            </div>
        </div>
    </div>
)

interface ProductPriceProps {
    price: number
    originPrice: number
    percentSale: number
}

const ProductPrice: React.FC<ProductPriceProps> = ({
    price,
    originPrice,
    percentSale,
}) => (
    <div className="product-price-block flex items-center gap-2 flex-wrap mt-1 duration-300 relative z-[1]">
        <div className="product-price text-title">${price}.00</div>
        {percentSale > 0 && (
            <>
                <div className="product-origin-price caption1 text-secondary2">
                    <del>${originPrice}.00</del>
                </div>
                <div className="product-sale caption1 font-medium bg-green px-3 py-0.5 inline-block rounded-full">
                    -{percentSale}%
                </div>
            </>
        )}
    </div>
)

export default ProductGrid
