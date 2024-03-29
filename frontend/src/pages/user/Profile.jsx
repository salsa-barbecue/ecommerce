import {useEffect, useState} from "react";
import {PageWrapperAuthenticated} from "../../components/pageWrapper";
import {getUserCoupons} from "../../utils/queries";
import GeneratedCouponList from "../../components/listElements/generatedCouponList";
import PageTitle from "../../components/generalUi/pageTitle";
import Alert from "../../components/generalUi/alert";

const Profile = () => {
    const [userCoupons, setUserCoupons] = useState([]);
    const [couponCount, setCouponCount] = useState(0);
    const [alert, setAlert] = useState(undefined)

    useEffect(() => {
        let username = localStorage.getItem("username")
        getUserCoupons(username).then(r => {
            setUserCoupons(r.userCoupons)
            setCouponCount(r.count)
        }).catch(err => {
            setAlert({
                type: "error",
                msg: err.response.data.msg
            })
        })
    }, [])

    const dismissMsg = () => {
        setAlert(undefined)
    }


    return <PageWrapperAuthenticated>
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
                {alert && <Alert dismissMsg={dismissMsg} alert={alert}/>}
                <PageTitle text={`Hai generato ${couponCount} buoni`}/>
                <ul className="divide-y divide-gray-100">
                    {userCoupons.map((c) => (
                        <GeneratedCouponList key={c.id} id={c.id} type={c.CouponType.title} size={c.CouponSize}
                                             createdAt={c.createdAt} image={c.CouponType.Images?c.CouponType.Images[0]:undefined}/>
                    ))}
                </ul>
            </div>
        </div>
    </PageWrapperAuthenticated>
};

export default Profile;