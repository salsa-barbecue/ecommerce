const GeneratedCouponList = ({image, id, type, size, createdAt}) => {
    return (
        <li className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
                <img className="h-12 w-12 flex-none rounded-full bg-gray-50"
                     src={image?.url?`${process.env.REACT_APP_BACKEND_URL}/${image.url}`:`${process.env.REACT_APP_BACKEND_URL}/img/test.png`}
                     alt=""/>
                <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{id}</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">Buono {type}</p>
                </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm font-bold leading-6 text-gray-900">{size?.title} - {size?.value} €</p>
                <p className="mt-1 text-xs leading-5 text-gray-500">Creato il <time
                    dateTime={createdAt}>{createdAt}</time></p>
            </div>
        </li>
    )
}

export default GeneratedCouponList