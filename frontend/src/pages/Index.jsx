import {PageWrapperAuthenticated} from "../components/pageWrapper"
import {useEffect, useState} from "react";
import axios from "axios";
import {setDefaultHeader} from "../provider/authProvider";
import AvailableCoupon from "../components/coupon/availableCoupon";

const Index = () => {
    const [availableCoupons, setAvailableCoupons] = useState([]);
    const [sideOpen, setSideOpen] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    function openSide(){
        setSideOpen(true)
    }

    useEffect(() => {
        setDefaultHeader(localStorage.getItem('token'))
        axios.get("http://localhost:8000/coupon/available").then(r => {
            console.log(r)
            if(r.data?.data?.availableCoupons) setAvailableCoupons(r.data?.data?.availableCoupons)
        }).catch(err => {
            console.error(err)
        })
    }, [])


    return <PageWrapperAuthenticated>
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Coupon disponibili</h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8">
                    {availableCoupons.map((c) => (
                        <div key={c.id} className="group relative" onClick={openSide}>
                            <div
                                className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                    src={`http://localhost:8000/${c.Images[0]?.url}`}
                                    alt={`image-${c.id}`}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                            <span aria-hidden="true" className="absolute inset-0"/>
                                            {c.title}
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">{c.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <AvailableCoupon open={sideOpen} setOpen={setSideOpen}/>
    </PageWrapperAuthenticated>;
};

export default Index;