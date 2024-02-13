import {Fragment, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {XMarkIcon} from '@heroicons/react/24/outline'
import {createCoupon} from "../../utils/queries";
import CouponTypeGrid from "../listElements/couponTypeGrid";
import Button from "../generalUi/button";

export default function AvailableCoupon({open, setOpen, coupon, onError, onSuccess}) {

    const [selectedSize, setSelectedSize] = useState("");

    async function handleCouponCreation() {
        setOpen(false)
        createCoupon(coupon.id, selectedSize).then(r => {
            onSuccess(r)
        }).catch(err => {
            onError(err)
        })
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-500"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-500"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                                            <button
                                                type="button"
                                                className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                onClick={() => setOpen(false)}
                                            >
                                                <span className="absolute -inset-2.5"/>
                                                <span className="sr-only">Chiudi pannello</span>
                                                <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                        <div className="px-4 sm:px-6">
                                            <CouponTypeGrid description={coupon?.description} image={coupon.Images?coupon.Images[0]:undefined}
                                                            title={coupon?.title} disabled/>
                                        </div>
                                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                            <ul className="divide-y divide-gray-100 gap-6">
                                                {coupon?.CouponSizes?.map(s => <li onClick={() => {
                                                    setSelectedSize(s.id)
                                                }} key={s.id}
                                                                                   className={`flex justify-between rounded-lg my-3 p-5 ${selectedSize === s.id ? "bg-gray-300" : "bg-gray-50"}`}>
                                                    <div className="flex min-w-0 gap-x-4">
                                                        <div className="min-w-0 flex-auto">
                                                            <p className={`text-sm font-semibold leading-6 text-gray-900`}>{s?.title}</p>
                                                        </div>
                                                    </div>
                                                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                        <p className={`text-sm leading-6 text-gray-900`}>{s.value} €</p>
                                                    </div>
                                                </li>)}
                                            </ul>
                                            <Button onClick={handleCouponCreation}>
                                                Acquista
                                            </Button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}