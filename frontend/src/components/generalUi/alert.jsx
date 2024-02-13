const Alert = ({dismissMsg, alert}) => {
    return (<div
        className={`relative isolate rounded flex items-center gap-x-6 overflow-hidden ${alert.type==="error"?"bg-red-600":"bg-green-600"} px-6 py-2.5 sm:px-3.5 mb-5 sm:before:flex-1`}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="text-sm leading-6 text-white">
                <strong className="font-semibold">{alert.msg}</strong>
            </p>
        </div>
        <div className="flex flex-1 justify-end">
            <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]" onClick={dismissMsg}>
                <span className="sr-only">Dismiss</span>
                <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path
                        d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"/>
                </svg>
            </button>
        </div>
    </div>)
}

export default Alert