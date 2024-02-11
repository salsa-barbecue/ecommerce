import {Coupon} from "../coupon";

export class ListCouponResponseDTO{
    userCoupons!:Coupon[];
    count!:number;
}