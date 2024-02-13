const CouponTypeGrid = ({onClick = undefined, image, title, description, disabled = false }) => {
    return (
        <div className="group relative" onClick={onClick}>
            <div
                className={`aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 aspect-none ${!disabled?"group-hover:opacity-75":""} lg:h-80 sm:h-80`}>
                <img
                    src={`http://localhost:8000/${image.url}`}
                    alt={`${image.id}`}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-md text-gray-700 font-bold">
                        <span aria-hidden="true" className="absolute inset-0"/>
                        {title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{description}</p>
                </div>
            </div>
        </div>
    )
}

export default CouponTypeGrid