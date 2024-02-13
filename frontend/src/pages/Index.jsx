import {PageWrapperAuthenticated} from "../components/pageWrapper"
import {useEffect, useState} from "react";
import AvailableCoupon from "../components/coupon/availableCoupon";
import {getAvailableCoupons} from "../utils/queries";
import CouponTypeGrid from "../components/listElements/couponTypeGrid";
import PageTitle from "../components/generalUi/pageTitle";

const Index = () => {
    const [availableCoupons, setAvailableCoupons] = useState([]);
    const [sideOpen, setSideOpen] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState({});

    function onError(msg){
        console.log(msg)
    }
    function onSuccess({msg}){
        console.log(msg)
    }

    function openSide(c) {
        setSelectedCoupon(c)
        setSideOpen(true)
    }

    useEffect(() => {
        getAvailableCoupons().then(res => {
            setAvailableCoupons(res.availableCoupons)
        }).catch(err => {
            console.error(err)
        })
    }, [])


    return <PageWrapperAuthenticated>
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
                <PageTitle text={"Buoni disponibili"}/>
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8">
                    {availableCoupons.map((c) => <CouponTypeGrid key={c.id} onClick={() => {
                        openSide(c)
                    }} description={c.description} title={c.title} image={c.Images[0]}/>)}
                </div>
            </div>
            <AvailableCoupon open={sideOpen} setOpen={setSideOpen} coupon={selectedCoupon} onError={onError} onSuccess={onSuccess}/>
        </div>
    </PageWrapperAuthenticated>;
};

export default Index;