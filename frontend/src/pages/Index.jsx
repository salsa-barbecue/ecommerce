import {PageWrapperAuthenticated} from "../components/pageWrapper"
import {useEffect, useState} from "react";
import AvailableCoupon from "../components/coupon/availableCoupon";
import {getAvailableCoupons} from "../utils/queries";
import CouponTypeGrid from "../components/listElements/couponTypeGrid";
import PageTitle from "../components/generalUi/pageTitle";
import Alert from "../components/generalUi/alert";

const Index = () => {
    const [availableCoupons, setAvailableCoupons] = useState([]);
    const [sideOpen, setSideOpen] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState({});
    const [alert, setAlert] = useState(undefined)

    function onError(err){
        setAlert({
            type: "error",
            msg: err.response.data.msg
        })
    }
    function onSuccess(msg){
        setAlert({
            type: "success",
            msg: msg
        })
    }

    function openSide(c) {
        setSelectedCoupon(c)
        setSideOpen(true)
    }

    const dismissMsg = () => {
        setAlert(undefined)
    }

    useEffect(() => {
        getAvailableCoupons().then(res => {
            setAvailableCoupons(res.availableCoupons)
        }).catch(err => {
            setAlert({
                type: "error",
                msg: err.response.data.msg
            })
        })
    }, [])


    return <PageWrapperAuthenticated>
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
                {alert && <Alert dismissMsg={dismissMsg} alert={alert}/>}
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